import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import pool from "../db/index.js";
import chunkText from "../utils/chunkText.js";
import { getEmbeddings } from "../services/embeddingServices.js";

const uploadPDF = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // 1. Text Extraction
    const uint8Array = new Uint8Array(req.file.buffer);
    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdf = await loadingTask.promise;
    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      // Added a filter to remove empty/whitespace items
      const strings = content.items
        .map(item => item.str)
        .filter(str => str.trim() !== "");
      text += strings.join(" ") + "\n";
    }

    // 2. Chunking
    const chunks = chunkText(text);
    if (!chunks.length) return res.status(400).json({ error: "PDF contains no readable text" });

    // 3. Embedding Generation
    const embeddings = await getEmbeddings(chunks);
    if (embeddings.length !== chunks.length) {
      throw new Error("Mismatch between chunks and embeddings");
    }

    const userId = req.userId; 

    const insertPromises = chunks.map((chunk, i) => {
      const embedding = embeddings[i];
      return pool.query(
        "INSERT INTO documents (content, document_name, embedding, user_id) VALUES ($1, $2, $3, $4)",
        [
          chunk,
          req.file.originalname,
          `[${embedding.join(",")}]`,
          userId
        ]
      );
    });

    await Promise.all(insertPromises);

    return res.json({
      message: "PDF processed & stored successfully",
      chunksStored: chunks.length,
    });

  } catch (error) {
    console.error("Upload error detail:", error.message);
    res.status(500).json({ error: "Failed to process PDF. Check server logs." });
  }
};

export default uploadPDF;
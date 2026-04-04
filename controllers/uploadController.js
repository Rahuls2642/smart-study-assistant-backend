import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import pool from "../db/index.js";
import chunkText from "../utils/chunkText.js";

const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uint8Array = new Uint8Array(req.file.buffer);
    const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
    const pdf = await loadingTask.promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const strings = content.items.map(item => item.str);
      text += strings.join(" ") + "\n";
    }

    
    const chunks = chunkText(text);

   
    for (const chunk of chunks) {
      await pool.query(
        "INSERT INTO documents (content, document_name) VALUES ($1, $2)",
        [chunk, req.file.originalname]
      );
    }

    return res.json({
      message: "PDF processed & stored successfully",
      chunksStored: chunks.length,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to process PDF" });
  }
};

export default uploadPDF;
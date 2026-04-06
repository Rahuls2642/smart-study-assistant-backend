import pool from "../db/index.js"; 
import { getEmbeddings } from "../services/embeddingServices.js";
import { getAnswer } from "../services/llmServies.js";

const queryDocuments = async (req, res) => {
  try {
    const {question}=req.body;
    const useId=req.userId;
    if(!question){
        return res.status(400).json({error:"Question is required"});
    }
    const [questionEmbedding]=await getEmbeddings([question]);
   const result = await pool.query(
  `SELECT content
   FROM documents
   ORDER BY embedding <-> $1
   LIMIT 5`,
  [`[${questionEmbedding.join(",")}]`,useId]
);
    const context=result.rows.map(row=>row.content);
    const answer=await getAnswer(question,context);
    return res.json({
        answer,
        sources:result.rows
    });
} catch (error) {
    console.error("Error querying documents:", error);
    return res.status(500).json({ error: "Internal server error" });
} 
};
export default queryDocuments;
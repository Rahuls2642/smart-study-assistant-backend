import axios from "axios";

const API_KEY = process.env.VOYAGE_API_KEY;

export const getEmbeddings = async (texts) => {
  const response = await axios.post(
    "https://api.voyageai.com/v1/embeddings",
    {
      model: "voyage-2",
      input: texts,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.VOYAGE_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data.map(item => item.embedding);
};
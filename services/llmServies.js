import axios from "axios";

const API_KEY = process.env.GROQ_API_KEY;

export const getAnswer = async (question, context) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content:
              "Answer ONLY using the provided context. If answer is not found, say 'Not in document'."
          },
          {
            role: "user",
            content: `Context:\n${context}\n\nQuestion:\n${question}`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Groq LLM error:", error.response?.data || error.message);
    throw error;
  }
};
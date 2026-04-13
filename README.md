# 📄 Smart Study Assistant - AI Document Chat

A full-stack AI application that enables users to upload PDF documents and ask intelligent questions about their content using semantic search and large language models.

---

## 🚀 Features

- 📤 **PDF Upload** - Upload and process PDF documents seamlessly
- 🧠 **AI-Powered Q&A** - Get accurate answers about your documents
- 🔍 **Semantic Search** - Find relevant content using vector embeddings
- 🔐 **Secure Authentication** - JWT-based user authentication
- 📊 **Vector Database** - PostgreSQL with pgvector extension
- ⚡ **Fast Inference** - Powered by Groq LLM for rapid responses

---

## 🧠 How It Works

This application implements a **RAG (Retrieval-Augmented Generation)** pipeline:

```
┌─────────────┬───────────────┬──────────────┬──────────────┐
│ Upload PDF  │  Text Extract │  Embedding   │   Storage    │
└─────────────┴───────────────┴──────────────┴──────────────┘
                                    ↓
                          ┌──────────────────┐
                          │  Query Pipeline  │
                          └──────────────────┘
                                    ↓
                    ┌───────────────────────────────┐
                    │  LLM Response Generation      │
                    └───────────────────────────────┘
```

### Pipeline Stages

| Stage | Description | Tool |
|-------|-------------|------|
| **Upload** | User uploads PDF document | Web Interface |
| **Parse** | Extract text from PDF | PDF Parser |
| **Chunk** | Split text into semantic chunks | Text Splitter |
| **Embed** | Convert chunks to vector embeddings | Voyage AI |
| **Store** | Save vectors in database | PostgreSQL + pgvector |
| **Query** | Convert user question to embedding | Voyage AI |
| **Retrieve** | Find most relevant chunks via similarity | pgvector |
| **Generate** | Create answer using LLM + context | Groq |

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Build Tool**: Vite

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon)
- **Vector Extension**: pgvector
- **Authentication**: JWT

### AI & APIs
- **Embeddings**: Voyage AI
- **LLM**: Groq
- **PDF Processing**: PDF Parser

---

## 🔐 Authentication & Security

- **JWT-based authentication** for secure API access
- **User isolation** - Each user can only access their own documents
- **Data privacy** - Document queries filtered by `user_id`
- **Environment variables** - Sensitive credentials stored securely

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- PostgreSQL database (Neon recommended)
- API keys for Voyage AI and Groq

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/smart-study-assistant.git
cd smart-study-assistant
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

**Create `.env` file:**

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# API Keys
VOYAGE_API_KEY=your_voyage_ai_key_here
GROQ_API_KEY=your_groq_api_key_here

# JWT
JWT_SECRET=your_super_secret_key_change_this

# Server
PORT=5000
NODE_ENV=development
```

**Run backend server:**

```bash
npm start
# or for development with auto-reload
npm run dev
```

Server will start on `http://localhost:5000`

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`

---

## 🧪 API Endpoints

### Authentication

```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}
```

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure_password"
}
```

### Documents

```
POST /api/documents/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

File: document.pdf
```

### Query

```
POST /api/query
Authorization: Bearer {token}
Content-Type: application/json

{
  "question": "What skills are mentioned in this document?"
}
```

**Response:**

```json
{
  "answer": "The document mentions the following skills...",
  "sources": [
    {
      "page": 1,
      "excerpt": "Relevant text excerpt..."
    }
  ],
  "confidence": 0.95
}
```

---

## 📸 Demo Flow

1. **Register/Login** - Create account with email and password
2. **Upload PDF** - Select and upload your document
3. **Ask Questions** - Type your questions about the document
4. **Get Answers** - Receive AI-generated responses with source citations
5. **Track History** - View previous questions and answers

---

## ⚠️ Known Limitations

- ❌ Document-level filtering not yet implemented (all user documents searched together)
- ❌ No response streaming (full answer waits for completion)
- ❌ Basic UI (improvements planned)
- ❌ Limited document format support (PDF only)
- ❌ No conversation context between queries

---

## 🔮 Future Enhancements

- [ ] Per-document query filtering
- [ ] Chat history and session management
- [ ] Streaming LLM responses
- [ ] Advanced UI (ChatGPT-style interface)
- [ ] Document metadata and tagging
- [ ] Support for multiple file formats (DOCX, TXT, Images)
- [ ] Rate limiting and usage analytics
- [ ] Conversation context retention
- [ ] Advanced search filters
- [ ] Export capabilities

---

## 🚀 Deployment

### Vercel (Frontend)

```bash
# Push to GitHub, connect Vercel
# Set environment variables in Vercel dashboard
npm run build
```

### Render (Backend)

```bash
# Create new Web Service
# Connect GitHub repository
# Set environment variables
# Deploy
```

---

## 📊 Project Structure

```
smart-study-assistant/
├── backend/
│   ├── routes/
│   │   ├── authController.js
│   │   ├── queryController.js
│   │   └── uploadController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── db/
│   │   ├── index.js
│   ├── services/
│   │   ├── embeddingServices.js
│   │   ├── llmServices.js
│   ├── .env
│   ├── app.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.jsx
│   │   │   ├── Upload.jsx
│   │   ├── pages/
│   │   │   ├── Register.jsx
│   │   │   └── Login.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 💡 Key Concepts Demonstrated

This project showcases advanced concepts and technologies:

- ✅ **Vector Databases** - Understanding pgvector and semantic search
- ✅ **RAG Architecture** - Retrieval-Augmented Generation pattern
- ✅ **Semantic Search** - Finding relevant content by meaning, not keywords
- ✅ **LLM Integration** - Real-world AI API usage
- ✅ **Full-Stack Development** - Complete frontend-to-backend system
- ✅ **Authentication** - Secure user management with JWT
- ✅ **Database Design** - Relational + vector database integration

---

## 🐛 Troubleshooting

### Database Connection Issues

```bash
# Test PostgreSQL connection
psql $DATABASE_URL -c "SELECT version();"

# Verify pgvector installation
psql $DATABASE_URL -c "CREATE EXTENSION IF NOT EXISTS vector;"
```

### API Key Errors

- Verify all API keys are correctly set in `.env`
- Check that keys have appropriate permissions
- Ensure keys haven't expired

### CORS Issues

Add to backend `.env`:
```env
FRONTEND_URL=http://localhost:5173
```

---

## 📝 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📧 Support & Contact

- **Email**: rahuls6408@gmail.com

---

## 🧑‍💻 Author

**Rahul Singh**

- GitHub: [@rahulsingh](https://github.com/Rahuls2642)
- Email: rahuls6408@gmai.com

---

## 🙏 Acknowledgments

- [Voyage AI](https://www.voyageai.com/) - Vector embeddings
- [Groq](https://groq.com/) - Fast LLM inference
- [pgvector](https://github.com/pgvector/pgvector) - Vector database extension
- [Neon](https://neon.tech/) - Serverless PostgreSQL

---

<div align="center">

**Made with ❤️ by Rahul Singh**

⭐ If you find this project helpful, please consider giving it a star!

</div>

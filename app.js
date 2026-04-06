import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import uploadRoutes from './routes/uploadRoutes.js';
import pool from './db/index.js';
import queryRoutes from './routes/queryRoutes.js';
import authRoutes from "./routes/authRoutes.js"
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use('/api/auth',authRoutes)
app.use('/api', uploadRoutes);
app.use('/api', queryRoutes);

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
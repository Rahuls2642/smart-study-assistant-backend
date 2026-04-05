import express from 'express';
import queryDocs from '../controllers/queryController.js';
const router=express.Router();
router.post('/query',queryDocs);
export default router;
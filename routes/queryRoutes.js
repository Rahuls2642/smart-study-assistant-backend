import express from 'express';
import queryDocs from '../controllers/queryController.js';
import authMiddleware from '../middleware/auth.js';
const router=express.Router();
router.post('/query',authMiddleware,queryDocs);
export default router;
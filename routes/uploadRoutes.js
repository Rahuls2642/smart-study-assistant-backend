import express from 'express';
import uploadPDF from '../controllers/uploadController.js';
import multer from 'multer';
import authMiddleware from '../middleware/auth.js';
const router=express.Router();
const storage=multer.memoryStorage();
const upload=multer({storage});
router.post('/upload',upload.single('file'),authMiddleware,uploadPDF);
export default router;
import express from 'express';
import uploadPDF from '../controllers/uploadController.js';
import multer from 'multer';
const router=express.Router();
const storage=multer.memoryStorage();
const upload=multer({storage});
router.post('/upload',upload.single('file'),uploadPDF);
export default router;
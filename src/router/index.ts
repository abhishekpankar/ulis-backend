import { Router } from "express";
import fileController from "../controllers/file.controller";
import { uploadFile } from "../utils/upload-file";

const router = Router();

router.post('/files/upload', uploadFile, fileController);

router.get('/health', (req, res, next) => {
    res.send({ message: 'Looks Good' })
})

export default router;
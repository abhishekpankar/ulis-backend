import { Router } from "express";
import { uploadFile } from "./upload-file";

const router = Router();

router.post('/files/upload', uploadFile, (req, res, next) => {
    try {
        const { file } = req.body;
        if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.mimetype)) {
            return res.status(400).send({
                message: 'Only jpg and png format are supported',
                data: null,
            });
        }
        return res.send({
            message: 'File Uploaded',
            data: {
                file,
            }
        });
    } catch (error) {
        return next(error);
    }
})

router.get('/health', (req, res, next) => {
    res.send({ message: 'Looks Good' })
})

export default router;
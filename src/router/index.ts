import { Router } from "express";
import fileController from "../controllers/file.controller";
import generateDataController from "../controllers/generate-data.controller";
import generateLinkController from "../controllers/generate-link.controller";
import submitController from "../controllers/submit.controller";
import { uploadFile } from "../utils/upload-file";

const router = Router();

router.post('/files/upload', uploadFile, fileController);
router.post('/qr/generate/link', generateLinkController);
router.get('/qr/generate/data', generateDataController);
router.post('/qr/data', submitController);

router.get('/health', (req, res, next) => {
    res.send({ message: 'Looks Good' })
})

export default router;
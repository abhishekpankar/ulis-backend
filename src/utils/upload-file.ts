import { NextFunction, Request, Response } from "express";
import multer from 'multer';
import mime from 'mime';

const maxFileSizeInMb = 1;

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        try {
            const ext = mime.getExtension(file.mimetype);
            const fileName = `${Date.now()}.${ext}`;
            req.body['file'] = {
                name: fileName,
                path: `http://localhost:4000/${fileName}`,
                mimetype: file.mimetype,
            }
            return cb(null, fileName);
        } catch (error) {
            return cb(error as any, 'trash');
        }
    }
});

const upload = multer({
    limits: {
        fileSize: maxFileSizeInMb * 1024 * 1024,
    },
    storage,
});

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            let message = err.message;
            if (err.code == 'LIMIT_FILE_SIZE') {
                message = 'File size should not be greater than 1 MB'
            }
            return res.status(400).send({
                message,
                data: null,
            })
        }
        next();
    });
}
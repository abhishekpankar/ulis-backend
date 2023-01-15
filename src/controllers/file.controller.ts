import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const { file } = req.body;
        if (!file) {
            res.status(400).send({
                message: 'File is required'
            })
        }
        const supportedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        if (!supportedMimeTypes.includes(file.mimetype)) {
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
}
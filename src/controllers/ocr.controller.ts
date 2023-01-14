import { NextFunction, Request, Response } from "express";
import Tesseract from "tesseract.js";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const text = await Tesseract.recognize(req.body.url, 'eng', {
            logger: console.log,
        });
        return res.send({
            message: 'Pattern saved in text file',
            data: {
                text: text.data.text.replace(/\n/g, ' '),
            }
        });
    } catch (error) {
        return next(error);
    }
}

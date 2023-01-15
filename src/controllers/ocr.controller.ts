import { NextFunction, Request, Response } from "express";
import Tesseract from "tesseract.js";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Tesseract.recognize(req.body.url, 'eng');
        return res.send({
            message: 'Data extracted',
            data: data.data.text.replace(/\n/g, ' ')
        });
    } catch (error) {
        return next(JSON.stringify(error));
    }
}

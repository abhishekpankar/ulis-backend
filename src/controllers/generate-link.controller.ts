import { NextFunction, Request, Response } from "express";
import qrcode from 'qrcode';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const link = `http://www.google.com/search=${req.body.search}`;

        const qrBuffer = await qrcode.toBuffer(link);
        return res.send('data:image/png;base64,' + qrBuffer.toString('base64'));
    } catch (error) {
        return next(error);
    }
}
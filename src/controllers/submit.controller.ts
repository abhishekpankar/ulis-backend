import { NextFunction, Request, Response } from "express";
import qrcode from 'qrcode';
import { decrypt } from "./generate-data.controller";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const decryptedData = decrypt(req.body);

        return res.send(decryptedData)
    } catch (error) {
        return res.status(400).send({
            message: 'Invalid Code'
        });
    }
}

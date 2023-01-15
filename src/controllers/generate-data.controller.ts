import { NextFunction, Request, Response } from "express";
import qrcode from 'qrcode';
import crypto from 'crypto';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const algorithm = 'aes-256-cbc';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = {
            accountNumber: '45668382',
            ifscCode: 'HJEV99397',
            branch: 'Nagpur',
            accountHolderName: 'Mahatma Gandhi',
        };

        const encryptedData = encrypt(data);

        const qrBuffer = await qrcode.toBuffer(encryptedData);
        return res.send('data:image/png;base64,' + qrBuffer.toString('base64'));
    } catch (error) {
        return next(error);
    }
}

export function encrypt(data: Record<string, string>) {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    const buffer = Buffer.from(JSON.stringify(data));
    const encrypted = Buffer.concat([
        cipher.update(buffer),
        cipher.final()
    ]).toString('hex');
    return JSON.stringify({
        encryptedString: encrypted,
    });
}

export function decrypt(data: Record<'encryptedString', string>) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const buffer = Buffer.from(data.encryptedString, 'hex');
    const decrypted = Buffer.concat([
        decipher.update(buffer),
        decipher.final(),
    ]);
    return JSON.parse(decrypted.toString());
}

import { NextFunction, Request, Response } from "express";
import { readFile } from "fs/promises";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const english = await readFile('src/languages/english.json', 'utf-8');
        const hindi = await readFile('src/languages/hindi.json', 'utf-8');
        return res.send({
            message: 'Data extracted',
            data: {
                english: JSON.parse(english),
                hindi: JSON.parse(hindi),
            }
        });
    } catch (error) {
        return next(JSON.stringify(error));
    }
}

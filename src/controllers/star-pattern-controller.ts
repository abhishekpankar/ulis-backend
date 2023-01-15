import { NextFunction, Request, Response } from "express";
import { writeFileSync } from "fs";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const length = parseInt(req.params.length || '5');
        let pattern = '';
        for (let i = 0; i < length/2; i++) {
            const noOfStar = ((i + 1) * 2) - 1;
            for (let j = length; j > 0; j--) {
                if (noOfStar >= j) {
                    pattern = pattern + '*'
                } else {
                    pattern = pattern + ' '
                }
                pattern = pattern + ' '
            }
            pattern = pattern + '\n';
        }

        writeFileSync('pattern.txt', pattern);
        return res.send({
            message: 'Pattern saved in text file'
        });
    } catch (error) {
        return next(JSON.stringify(error));
    }
}

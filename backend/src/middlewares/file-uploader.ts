import { Upload } from "@aws-sdk/lib-storage";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import s3Client from "../aws/aws";
import config from 'config'
import path from "path";
import { v4 } from "uuid";
import { ObjectSchema } from "joi";

declare global {
    namespace Express {
        interface Request {
            imageUrl?: string
        }
    }
}
export default function fileUploader(validator: ObjectSchema) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.files) return next()

            const image = req.files.image as UploadedFile

            const upload = new Upload({
                client: s3Client,
                params: {
                    Bucket: config.get<string>('s3.bucket'),
                    Key: `${v4()}${path.extname(image.name)}`,
                    Body: image.data,
                    ContentType: image.mimetype
                }
            })

            const response = await upload.done()

            req.imageUrl = response.Location
            next()
        }
        catch (error) {
            next(error)
        }
    }
}
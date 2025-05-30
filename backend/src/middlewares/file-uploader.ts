import { Upload } from "@aws-sdk/lib-storage";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import s3Client from "../aws/aws";
import config from 'config'
import path from "path";
import { v4 } from "uuid";


declare global {
    namespace Express {
        interface Request {
            imageUrl?: string
        }
    }
}


export default async function fileUploader(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.files.image) return next()

        const image = req.files.image as UploadedFile

        const upload = new Upload({
            client: s3Client,
            params: {
                Bucket: config.get<string>('s3.bucket'),
                Key: `${v4()}${path.extname(image.name)}`,
                Body: image.data,
                ContentType: image.mimetype,
                ACL: 'public-read' // Make sure images are publicly accessible
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
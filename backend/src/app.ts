import express, { json } from "express"
import config from "config"
import sequelize from "./db/sequelize"
import errorLogger from "./middlewares/error/error-logger"
import errorResponder from "./middlewares/error/error-responder"
import notFound from "./middlewares/not-found"
import cors from 'cors'
import authRouter from "./routers/auth"
import vacationsRouter from "./routers/vacations"
import { createAppBucketIfNotExists } from "./aws/aws"
import fileUpload from "express-fileupload"
import followersRouter from "./routers/followers"


const db = config.get<string>('db.database')

const app = express();

export async function start() {
    try {
        console.log(`Trying to Connect to Database: ${db}`)
        await sequelize.sync();
        console.log('Database logged in successfully')

        await createAppBucketIfNotExists();
        console.log('S3 bucket initialized successfully');
        
        app.use(cors())
        app.use(json())
        app.use(fileUpload())

        app.use('/auth', authRouter)
        app.use('/vacations', vacationsRouter)
        app.use('/followers', followersRouter)

        app.use(notFound)
        app.use(errorLogger)
        app.use(errorResponder)

    } catch (error) {
        console.log('Error resetting database', error)
    }
}

export default app

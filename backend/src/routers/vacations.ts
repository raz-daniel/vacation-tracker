import { Router } from "express"
import enforceAuth from "../middlewares/enforce-auth";
import { getAllVacations } from "../controllers/vacation/controller";

const vacationsRouter = Router()

vacationsRouter.use(enforceAuth);
vacationsRouter.get('/', getAllVacations)
vacationsRouter.get('/:id')
vacationsRouter.post('/')
vacationsRouter.delete('/:id')
vacationsRouter.patch('/:id')

export default vacationsRouter
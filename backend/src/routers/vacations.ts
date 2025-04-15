import { Router } from "express"
import enforceAuth from "../middlewares/enforce-auth";
import {
    createVacation,
    deleteVacation,
    exportVacationsToCSV,
    getAllVacations,
    getCurrentVacations,
    getUpcomingVacations,
    getVacationById,
    getVacationsPerFollower,
    updateVacation
} from "../controllers/vacation/controller";
import {
    deleteVacationParamsValidator,
    newVacationFileValidator,
    newVacationValidator,
    paginationQueryValidator,
    updatedVacationParamsValidator,
    updateVacationFileValidator,
    updateVacationValidator
} from "../controllers/vacation/validator";
import paramsValidation from "../middlewares/param-validation";
import validation from "../middlewares/validation";
import filesValidation from "../middlewares/files-validation";
import fileUploader from "../middlewares/file-uploader";
import queryValidation from "../middlewares/query-validation";


const vacationsRouter = Router()

vacationsRouter.use(enforceAuth);
vacationsRouter.get('/', queryValidation(paginationQueryValidator), getAllVacations)
vacationsRouter.get('/follower', queryValidation(paginationQueryValidator), getVacationsPerFollower);
vacationsRouter.get('/upcoming', queryValidation(paginationQueryValidator), getUpcomingVacations);
vacationsRouter.get('/current', queryValidation(paginationQueryValidator), getCurrentVacations);
vacationsRouter.get('/export', exportVacationsToCSV);
vacationsRouter.get('/:id', paramsValidation(updatedVacationParamsValidator), getVacationById);

vacationsRouter.post('/',
    validation(newVacationValidator),
    filesValidation(newVacationFileValidator),
    fileUploader,
    createVacation)
vacationsRouter.delete('/:id', paramsValidation(deleteVacationParamsValidator), deleteVacation)
vacationsRouter.put('/:id',
    paramsValidation(updatedVacationParamsValidator),
    validation(updateVacationValidator),
    filesValidation(updateVacationFileValidator),
    fileUploader,
    updateVacation)

export default vacationsRouter
import { Router } from "express"
import enforceAuth from "../middlewares/enforce-auth";
import {
    createVacation,
    deleteVacation,
    exportVacationsToCSV,
    getAllVacations,
    getCurrentVacations,
    getUpcomingVacations,
    getVacationsPerFollower,
    updateVacation
} from "../controllers/vacation/controller";
import {
    deleteVacationParamsValidator,
    newVacationFileValidator,
    newVacationValidator,
    updatedVacationParamsValidator,
    updateVacationFileValidator,
    updateVacationValidator
} from "../controllers/vacation/validator";
import paramsValidation from "../middlewares/param-validation";
import validation from "../middlewares/validation";
import filesValidation from "../middlewares/files-validation";
import fileUploader from "../middlewares/file-uploader";


const vacationsRouter = Router()

vacationsRouter.use(enforceAuth);
vacationsRouter.get('/', getAllVacations)
vacationsRouter.get('/follower', getVacationsPerFollower);
vacationsRouter.get('/upcoming', getUpcomingVacations);
vacationsRouter.get('/current', getCurrentVacations);
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
vacationsRouter.get('/export', exportVacationsToCSV);

export default vacationsRouter
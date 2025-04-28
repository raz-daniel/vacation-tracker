import { Router } from "express";
import enforceAuth from "../middlewares/enforce-auth";
import paramsValidation from "../middlewares/param-validation";
import { followParamValidator, unFollowParamValidator } from "../controllers/followers/validator";
import { follow, unFollow } from "../controllers/followers/controller";

const followersRouter = Router()

followersRouter.use(enforceAuth);

followersRouter.post('/follow/:id', paramsValidation(followParamValidator), follow)
followersRouter.delete('/unfollow/:id', paramsValidation(unFollowParamValidator), unFollow)

export default followersRouter
import { Router } from "express";

import { CreateUserControllers } from './controllers/UsersController';
import { SessionsController  } from './controllers/SessionsController';
import { UserRefreshToken } from './controllers/UserRefreshToken';
import { BloodTypeController } from './controllers/BloodTypeController'
import { QuestionController } from './controllers/QuestionController';
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router()

const createUserControllers = new CreateUserControllers();
const sessionsController = new SessionsController();
const questionController = new QuestionController();
const bloodTypeController = new BloodTypeController()

const refreshToken = new UserRefreshToken();


router.post('/auth/register', createUserControllers.create)
router.post('/auth/register', createUserControllers.update)
router.post('/auth/authenticate', sessionsController.authenticate)
router.post('/auth/refresh-token', refreshToken.execute)

router.get('/question', questionController.execute)
router.get('/blood-type/:id', bloodTypeController.select)
router.get('/blood-type', bloodTypeController.execute)

router.get('/user/:id', ensureAuthenticated, createUserControllers.select)


export { router }


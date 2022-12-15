import { Router } from "express";

import { UserController } from '../controllers/UsersController';
import { ResetPasswordController } from '../controllers/ResetPasswordController';
import { SessionsController  } from '../controllers/SessionsController';
import { UserRefreshToken } from '../controllers/UserRefreshToken';
import { BloodTypeController } from '../controllers/BloodTypeController'
import { QuestionController } from '../controllers/QuestionController';
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const router = Router()

const userController = new UserController();
const sessionsController = new SessionsController();
const resetPasswordController = new ResetPasswordController();
const questionController = new QuestionController();
const bloodTypeController = new BloodTypeController()

const refreshToken = new UserRefreshToken();


router.post('/register', userController.create)
router.post('/authenticate', sessionsController.authenticate)
router.post('/refresh-token', refreshToken.execute)

router.post('/forgot-password', resetPasswordController.forgotPassword)
router.get('/reset-password/:id/:token',ensureAuthenticated, resetPasswordController.resetPasswordRender)
router.post('/reset-password/:id/:token',ensureAuthenticated, resetPasswordController.resetPassword)

router.get('/question', questionController.execute)
router.get('/blood-type/:id', bloodTypeController.select)
router.get('/blood-type', bloodTypeController.execute)

router.get('/user/:id', ensureAuthenticated, userController.select)


export { router }

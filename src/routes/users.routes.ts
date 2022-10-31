import { Router } from "express";
import { createUserController, deleteUserController, listUsersController, updateUserController } from "../controllers/users.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";
import verifyBodyContentMiddleware from "../middlewares/verifyBodyContent.middleware";
import verifyIsActiveMiddleware from "../middlewares/verifyIsActive.middleware";
import verifyIsAdmMiddleware from "../middlewares/verifyIsAdm.middleware";

const userRoutes = Router();

userRoutes.post('', createUserController);
userRoutes.get('', verifyAuthMiddleware, verifyIsAdmMiddleware, listUsersController);
userRoutes.patch('/:id', verifyAuthMiddleware, verifyBodyContentMiddleware, updateUserController);
userRoutes.delete('/:id', verifyAuthMiddleware, verifyIsAdmMiddleware, verifyIsActiveMiddleware, deleteUserController);

export default userRoutes;
import {Router} from "express" // Importando o Router para criar rotas
import { makeUserController } from "../factories/user.factory.js";

const userRoutes = Router(); // Referencia o Router dentro da variável

const userController = makeUserController();

userRoutes.get('/', userController.getUsers.bind(userController));

userRoutes.get('/:id', userController.getUserById.bind(userController))

userRoutes.post('/', userController.userRegister.bind(userController))

userRoutes.delete('/:id', userController.deleteUserRegister.bind(userController))

// Libera para a exportação porque precisa registrar no app.ts
export {userRoutes} 
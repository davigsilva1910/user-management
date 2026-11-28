import { Request, Response, NextFunction } from "express"; // Para lidar com requisições e respostas
import { UserService } from "../services/user.service.js"

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.getUsers(); // User agora tem uma Promise

            return res.status(200).json(users);
        } catch (err) {
            return next(err)
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params

        if (typeof id !== 'string' || !/^[1-9]\d*$/.test(id)) {
            return res.status(400).json({
                mensagem: "ID inválido. Use apenas números inteiros positivos."
            });
        }

        const userId = Number(id)

        try {
            const userReturned = await this.userService.getUserById(userId);

            return res.status(200).json(userReturned);

        } catch (err) {
            return next(err);
        }
    }

    async userRegister(req: Request, res: Response, next: NextFunction) {
        const dados = req.body

        const name = dados.name
        try {

            const novoUsuario = await this.userService.userRegister(name)
            return res.status(201).json({
                mensagem: "Usuário registrado com sucesso",
                user: novoUsuario
            })
        } catch (err) {
            return next(err);
        }

    }

    async deleteUserRegister(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const userID = Number(id)

        try {
            const deleteUser = await this.userService.deleteRegister(userID)
            return res.status(200).json({
                mensagem: "Usuário deletado com sucesso",
                user: deleteUser
            })
        } catch (err) {
            return next(err)
        }
    }
}
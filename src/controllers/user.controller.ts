import { Request, Response } from "express"; // Para lidar com requisições e respostas
import { UserService } from "../services/user.service.js"

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async getUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getUsers(); // User agora tem uma Promise

            return res.status(200).json(users);
        } catch (err) {
            console.error("Erro capturado na Controller:", err);

            // Se o repositório falhar, responde com status 500 (Erro Interno do Servidor) em JSON
            res.status(500).json({
                error: "Internal Server Error",
                message: "Não foi possível listar os usuários no momento."
            });
        }
    }

    async getUserById(req: Request, res: Response) {
        const { id } = req.params

        if (typeof id !== 'string' || !/^[1-9]\d*$/.test(id)) {
            return res.status(400).json({
                mensagem: "ID inválido. Use apenas números inteiros positivos."
            });
        }

        const userId = Number(id)

        try {
            const userReturned = await this.userService.getUserById(userId);

            if (userReturned === null) {
                return res.status(404).json({
                    mensagem: "Usuário não encontrado."
                });
            }

            return res.status(200).json(userReturned);

        } catch (err) {
            console.error("Erro ao buscar usuário:", err);

            return res.status(500).json({
                error: "Internal Server Error",
                mensagem: "Não foi possível buscar o usuário no momento."
            });
        }
    }

    async userRegister(req: Request, res: Response) {
        const dados = req.body

        const name = dados.name
        try {

            const novoUsuario = await this.userService.userRegister(name)
            return res.status(201).json({
                mensagem: "Usuário registrado com sucesso",
                user: novoUsuario
            })
        } catch (err: any) {
            return res.status(400).json({
                mensagem: err.message
            })

        }

    }

    async deleteUserRegister(req: Request, res: Response) {
        // const dados = req.body
        // console.log(dados)
        // const userId = dados.id
        // console.log(userId)
        const { id } = req.params
        const userID = Number(id)

        try {
            const deleteUser = await this.userService.deleteRegister(userID)
            return res.status(201).json({
                mensagem: "Usuário deletado com sucesso",
                user: deleteUser
            })
        } catch (err: any) {
            return res.status(400).json({
                mensagem: err.message
            })
        }
    }
}
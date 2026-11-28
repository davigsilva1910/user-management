import { UserDTO } from "../dtos/user.dto.js";

export interface IUserRepository {
    getUsers(): Promise<UserDTO[]>; // Promise faz virar assíncrono

    getUserById(id: string): Promise<UserDTO | null>; 

    userRegister(name: string) : Promise<UserDTO>;

    deleteRegister(id: string) : Promise<UserDTO | null>; // Pode retornar null quando nenhum usuário corresponde ao ID informado
}
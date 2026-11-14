import { UserDTO } from "../dtos/user.dto.js";

export interface IUserRepository {
    getUsers(): Promise<UserDTO[]>; // Promise faz virar assíncrono

    getUserById(id: number): Promise<UserDTO | null>; 

    userRegister(name: string) : Promise<UserDTO>;

    deleteRegister(id: number) : Promise<UserDTO>;
}
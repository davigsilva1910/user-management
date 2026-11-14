import { UserDTO } from "../dtos/user.dto.js";
import { IUserRepository } from "../protocols/user.repository.protocols.js";

export class UserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    // Promise<UserDTO[]>: indica que o resultado será uma Promise que fornecerá um array de usuários.
    // Não é necessário async/await aqui pois o repository já faz isso 
    getUsers(): Promise<UserDTO[]> {
        return this.userRepository.getUsers();
    }

    getUserById(id: number): Promise<UserDTO | null> {
        return this.userRepository.getUserById(id);
    }

    userRegister(name: string): Promise<UserDTO> {

        // 1. Limpa os espaços em branco
        const nomeTratado = name ? name.trim() : "";

        // 2. Valida se o nome está vazio
        if (nomeTratado === "") {
            // Lança um erro com uma mensagem clara
            throw new Error("O nome do usuário não pode estar vazio.");
        }

        // const apenasLetras = /^[a-zA-Z]+$/;
        const apenasLetras = /^[\p{L} ]+$/u;

        if(!apenasLetras.test(nomeTratado)) {
            throw new Error("O nome não pode conter números ou caracteres especiais")
        }

        return this.userRepository.userRegister(nomeTratado);
    }

    deleteRegister(id: number) : Promise<UserDTO> {
        if(id === null) {
            throw new Error("O campo ID deve ser informado");
        }

        return this.userRepository.deleteRegister(id)
    }
}
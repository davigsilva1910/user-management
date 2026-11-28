import { UserDTO } from "../dtos/user.dto.js"
import { IUserRepository } from "../protocols/user.repository.protocols.js"
import { pool } from "../database/connection.js"
import {DatabaseError} from "../errors/DatabaseError.js"

// implements assume que UserRepository irá cumprir o contrato de Protocols
export class UserRepository implements IUserRepository {
    // Aqui diz que getUsers retorna um array de DTO
    // Uso do async para representar operação assincrona
    // Promise pois o UserDTO vai receber uma Promise
    async getUsers(): Promise<UserDTO[]> {
        try {
            const sql = "SELECT id, name FROM users" // Query SQL
            const resultado = await pool.query<UserDTO>(sql) // Já informa o tipo esperado aqui na consulta
            
            return resultado.rows;
        } catch (err) {
            throw new DatabaseError("Erro ao executar a consulta.", err)
        }
    }

    async getUserById(id: string): Promise<UserDTO | null> {
        try {
            const sql = `SELECT id, name FROM users WHERE id = $1`
            const resultado = await pool.query<UserDTO>(sql, [id]) // Passando id de forma posicional para evitar SQL Injection

            const user = resultado.rows[0] // Pega o resultado retornado, pois ele ainda vem dentro de um array

            return user ?? null;
        } catch (err) {
            throw new DatabaseError("Erro ao executar a consulta.", err)
        }
    }

    async userRegister(name: string): Promise<UserDTO> {
        try {
            const sql = "INSERT INTO users(name) VALUES($1) RETURNING id, name" // Evitar uso de 'RETURNING *' para não retornar dados sensíveis 
            const resultado = await pool.query<UserDTO>(sql, [name])

            return resultado.rows[0];
        } catch (err) {
            // console.error("Erro ao registrar usuário:", err);
            throw new DatabaseError("Erro ao registrar usuário.", err);
        }
    }

    async deleteRegister(id: string) : Promise<UserDTO | null> {
        try {
            const sql = "DELETE FROM users WHERE id = $1 RETURNING id, name"
            const resultado = await pool.query<UserDTO>(sql, [id])
            return resultado.rows[0] ?? null;
        } catch (err) {
            // console.error("Erro ao apagar usuário: ", err);
            throw new DatabaseError("Erro ao apagar usuário.", err);
        }
    }
}
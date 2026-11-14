import "dotenv/config"
import {Pool} from 'pg';

const connectionString = process.env.DATABASE_URL;

if(!connectionString) {
    throw new Error("A variável DATABASE_URL não foi configurada")
}

// Mantém um conjunto de conexões PostgreSQL que o backend pode usar
export const pool = new Pool ({
    connectionString,
    ssl: {
        rejectUnauthorized:false
    }
})
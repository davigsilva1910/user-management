import { pool } from "./connection.js";

async function testConnection() {
  try {
    const result = await pool.query("SELECT NOW() AS current_time");

    console.log("Conexão com Supabase realizada!");
    console.log(result.rows[0]);
  } catch (error) {
    console.error("Erro ao conectar ao Supabase:", error);
  } finally {
    await pool.end();
  }
}

testConnection();
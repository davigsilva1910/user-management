import express from "express"; // Importação do frame express
import {userRoutes} from "./routes/user.routes.js"
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express(); // Chamada do express

app.use(express.json())

// Registro da rota criada
// Toda requisição que começar com /users será encaminhada para userRoutes
app.use("/users", userRoutes) 

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Rota não encontrada"
    })
})

app.use(errorHandler)

export {app}; // Liberando o app para que os outros modulos consigam usar
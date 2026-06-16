import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import parqueoRoutes from "./routes/parqueo.routes.js";


dotenv.config();


const NAME = process.env.APP_NAME;
const VERSION = process.env.APP_VERSION;
const DESCRIPTION = process.env.APP_DESCRIPTION;
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

//const PORT = 7777;

app.get("/", (req, res) => {
    res.send("<h1>Hola Mundo</h1>");
});

app.use("/api/parqueo", parqueoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose http://localhost:${PORT}`);
    console.log(`Nombre: ${NAME}`);
    console.log(`Versión: ${VERSION}`);
    console.log(`Descripción: ${DESCRIPTION}`);
});
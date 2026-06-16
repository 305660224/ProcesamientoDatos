import express from "express";
import dotenv from "dotenv";
import cors from "cors";
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

app.post("/api/parqueo/calcular", (req, res) => {
    const { placa, tipo, horas, minutos } = req.body;
    if (!placa || !tipo || !horas || !minutos) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    if (!placa || placa.trim() === "") {
        return res.status(400).json({ error: "La placa es requerida" });
    } else if (!tipo || tipo.trim() === "" || (tipo !== "carro" && tipo !== "moto")) {
        return res.status(400).json({ error: "El tipo de vehículo es requerido" });
    } else if (isNaN(horas) || horas < 0) {
        return res.status(400).json({ error: "Las horas deben ser un número positivo" });
    } else if (isNaN(minutos) || minutos < 0 || minutos >= 60) {
        return res.status(400).json({ error: "Los minutos deben ser un número entre 0 y 59" });
    }

    const tarifa = tipo === "carro" ? 1200 : 500;

    let h = Number(horas);
    let m = Number(minutos);

    if (m > 5) h++;
    const total = h * tarifa;
    res.json({ placa:placa,
               tipo:tipo,
               tarifa:tarifa,
               tiempo: horas + ":" + minutos,
               total: total
            });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose http://localhost:${PORT}`);
    console.log(`Nombre: ${NAME}`);
    console.log(`Versión: ${VERSION}`);
    console.log(`Descripción: ${DESCRIPTION}`);
});
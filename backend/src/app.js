import express from "express";

const app = express();
const PORT = 7777;

app.get("/", (req, res) => {
    res.send("<h1>Hola Mundo</h1>");
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose http://localhost:${PORT}`);
});
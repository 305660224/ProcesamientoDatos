export const calcularCobro = (req, res) => {
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
};
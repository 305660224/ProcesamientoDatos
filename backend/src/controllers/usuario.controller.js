import pool from "../../config/db.js";
import bcrypt from "bcryptjs";

// crear
export const agregarUsuario = async (req, res) => {
    const { nombre, correo, contrasena, confirmacion } = req.body;
    
    // Validaciones
    if (!nombre || !correo || !contrasena || !confirmacion) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    
    if (!nombre || nombre.trim() === "") {
        return res.status(400).json({ error: "El nombre es obligatorio" });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        return res.status(400).json({ error: "El correo debe tener un formato válido" });
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(contrasena)) {
        return res.status(400).json({ 
            error: "La contraseña debe tener mínimo 8 caracteres, incluir mayúsculas, minúsculas y números" 
        });
    }
    
    if (contrasena !== confirmacion) {
        return res.status(400).json({ error: "La contraseña y la confirmación deben ser iguales" });
    }
    
    try {
        // 🔐 Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);

        const [result] = await pool.execute(
            `INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)`,
            [nombre, correo, contrasenaEncriptada]  // ← Guardamos la contraseña encriptada
        );
        
        res.status(201).json({ 
            mensaje: "Usuario registrado correctamente",
            usuario: {
                id: result.insertId,
                nombre: nombre,
                correo: correo
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
};

export const obtenerUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            `SELECT id, nombre, correo FROM usuarios`
        );
        
        res.status(200).json({
            mensaje: "Usuarios obtenidos correctamente",
            usuarios: rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
};

export const obtenerUsuarioPorId = async (req, res) => {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }
    
    try {
        const [rows] = await pool.execute(
            `SELECT id, nombre, correo FROM usuarios WHERE id = ?`,
            [id]
        );
        
        if (rows.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        
        res.status(200).json({
            mensaje: "Usuario encontrado",
            usuario: rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
};

export const actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, contrasena } = req.body;
    
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }
    
    if (!nombre || !correo || !contrasena) {
        return res.status(400).json({ error: "Todos los campos son requeridos para actualizar" });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        return res.status(400).json({ error: "El correo debe tener un formato válido" });
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(contrasena)) {
        return res.status(400).json({ 
            error: "La contraseña debe tener mínimo 8 caracteres, incluir mayúsculas, minúsculas y números" 
        });
    }
    
    try {
        // 🔐 Encriptar la nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);

        const [result] = await pool.execute(
            `UPDATE usuarios SET nombre = ?, correo = ?, contrasena = ? WHERE id = ?`,
            [nombre, correo, contrasenaEncriptada, id]  // ← Guardamos la contraseña encriptada
        );
        
        res.status(200).json({
            mensaje: "Usuario actualizado correctamente",
            usuario: {
                id: parseInt(id),
                nombre: nombre,
                correo: correo
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
};

export const eliminarUsuario = async (req, res) => {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }
    
    try {
        const [result] = await pool.execute(
            `DELETE FROM usuarios WHERE id = ?`,
            [id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        
        res.status(200).json({
            mensaje: "Usuario eliminado correctamente"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};
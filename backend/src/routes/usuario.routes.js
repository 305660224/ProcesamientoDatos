import express from 'express';
import { 
    agregarUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
} from '../controllers/usuario.controller.js';

const router = express.Router();

// CRUD
router.post("/agregar", agregarUsuario);
router.get("/", obtenerUsuarios);
router.get("/:id", obtenerUsuarioPorId);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;
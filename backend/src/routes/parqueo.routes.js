import express from 'express';
import { calcularCobro } from '../controllers/parqueo.controller.js';

const router = express.Router();

router.post("/calcular", calcularCobro);

export default router;
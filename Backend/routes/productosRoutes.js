import express from 'express'
import { registrarProducto, obtenerProductosUsuario } from '../controllers/productosController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

// Registrar Producto
router.post('/', checkAuth, registrarProducto)
router.get('/obtener-proyectos-usuario', checkAuth, obtenerProductosUsuario)

export default router
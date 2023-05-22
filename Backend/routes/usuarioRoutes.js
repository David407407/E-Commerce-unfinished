import express from 'express'
import { 
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    cambiarContraseña,
    perfil
} from '../controllers/usuarioController.js'
import checkAuth from '../middleware/checkAuth.js'
const router = express.Router()

// Registro
router.post('/', registrar) // Creacion de usuarios
// Confirmar Usuarios
router.get('/confirmar/:token', confirmar)
// Autenticacion
router.post('/login', autenticar)
// Solicitar Cambio Contraseña
router.post('/olvide-password', olvidePassword)
// Cambiar Contraseña
router.route('/olvide-password/:token')
    .get(comprobarToken)
    .post(cambiarContraseña)

router.get('/perfil', checkAuth, perfil)
export default router
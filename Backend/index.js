import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import conectarDB from './config/db.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import productosRoutes from './routes/productosRoutes.js'
// import citasRoutes from './routes/citasRoutes.js'

const app = express()
app.use(express.json())
// Dotenv para variables de entorno
dotenv.config()
// ConectarDB para la base de Datos
conectarDB()

// Configurar Cors
const whiteList = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: process.env.FRONTEND_URL
    // origin: function(origin, callback) {
    //     console.log(origin)
    //     if (whiteList.includes(origin)) {
    //         // Puede consultar la API
    //         callback(null, true)
    //     } else {
    //         // No esta permitido
    //         callback(new Error('Error de Cors'))
    //     }
}

app.use(cors(corsOptions))
// Routing de Usuarios
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/productos', productosRoutes)
// app.use('/api/citas', cors(corsOptions), citasRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log('Iniciando App')
})
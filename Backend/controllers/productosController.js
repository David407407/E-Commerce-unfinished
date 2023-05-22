import Usuario from "../models/Usuario.js"
import Producto from "../models/Productos.js"

const registrarProducto = async (req, res) => {
    // Evitar registros duplicados
    const { _id } = req.usuario
    const existeUsuario = await Usuario.findById({_id}) // Encuentra el primer registro que coincide con el dato que le pasamos
    console.log(req.body)
    
    if(!existeUsuario) {
        const error = new Error('Usuario no registrado')
        return res.status(400).json({msg: error.message})
    }
    try {
        const producto = new Producto(req.body)
        producto.creador = _id
        existeUsuario.productos.push(producto)
        await producto.save()
        await existeUsuario.save()
        res.json({msg: 'Producto Creado Exitosamente'})
    } catch (error) {
        console.log(error)
    }
}

const obtenerProductosUsuario = async (req, res) => {
    // Evitar registros duplicados
    const { _id } = req.usuario
    const existeUsuario = await Usuario.findById({_id}).populate('productos', '-_v -creador').select('proyectos') // Encuentra el primer registro que coincide con el dato que le pasamos
    
    if(!existeUsuario) {
        const error = new Error('Usuario no registrado')
        return res.status(400).json({msg: error.message})
    }
    try {
        const productos = 
        res.json(existeUsuario)
    } catch (error) {
        console.log(error)
    }
}

export {
    registrarProducto,
    obtenerProductosUsuario
}
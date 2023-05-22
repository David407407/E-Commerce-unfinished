import Usuario from "../models/Usuario.js"
import generarID from "../helpers/generarID.js"
import generarJWT from "../helpers/generarJWT.js"
import { emailRegistro, emailOlvidePassword } from "../helpers/email.js"

const registrar = async (req, res) => {
    // Evitar registros duplicados
    const { email } = req.body
    const existeUsuario = await Usuario.findOne({email}) // Encuentra el primer registro que coincide con el dato que le pasamos

    if(existeUsuario) {
        const error = new Error('Usuario ya registrado')
        return res.status(400).json({msg: error.message})
    }
    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarID()
        await usuario.save()
        emailRegistro({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })
        res.json({msg: 'Revisa tu email para confirmar tu cuenta'})
    } catch (error) {
        console.log(error)
    }
}

const autenticar = async (req, res) => {
    const { email, password } = req.body
    const usuario = await Usuario.findOne({email}) // Encuentra el primer registro que coincide con el dato que le pasamos

    // Confirmar que el usuario que tratamos de autenticar existe
    if(!usuario) {
        const error = new Error('El usuario no existe')
        return res.status(400).json({msg: error.message})
    }

    // Confirmar que este autenticado
    if(usuario.confirmado === false) {
        const error = new Error('Usuario sin confirmar')
        return res.status(400).json({msg: error.message})
    }

    // Comprobar su password
    if(await usuario.comprobarPassword(password)) {
        try {
            res.json({
                _id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                token: generarJWT(usuario._id)
            })
        } catch (error) {
            console.log(error)
        }
    } else {
        const error = new Error('Contraseña Incorrecta')
        return res.status(400).json({msg: error.message})
    }
}

const confirmar = async (req, res) => {
    const { token } = req.params
    const usuario = await Usuario.findOne({token}) // Encuentra el primer registro que coincide con el dato que le pasamos

    // Confirmar que el usuario que tratamos de autenticar existe
    if(!usuario) {
        const error = new Error('Token Inválido')
        return res.status(400).json({msg: error.message})
    }
 
    try {
        usuario.confirmado = true
        usuario.token = ''
        await usuario.save()
        res.json({msg: 'Usuario Confirmado'})
    } catch (error) {
        console.log(error)
    }
}

const olvidePassword = async (req, res) => {
    const { email } = req.body
    const usuario = await Usuario.findOne({email}) // Encuentra el primer registro que coincide con el dato que le pasamos

    // Confirmar que el usuario que tratamos de autenticar existe
    if(!usuario) {
        const error = new Error('Usuario no encontrado')
        return res.status(400).json({msg: error.message})
    }

    // Evaluar que este confirmado
    if(!usuario.confirmado) {
        const error = new Error('Usuario no Confirmado')
        return res.status(400).json({msg: error.message})
    }
 
    try {
        usuario.token = generarID()
        await usuario.save()
        // Enviar el email
        emailOlvidePassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })
        res.json({msg: 'Hemos Enviado las Instrucciones a tu correo'})
    } catch (error) {
        console.log(error)
    }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params
    const usuario = await Usuario.findOne({token})

    if(!usuario) {
        const error = new Error('Token Inválido')
        return res.status(400).json({msg: error.message})
    }

    return res.json({msg: 'Token Válido'})
}

const cambiarContraseña = async (req, res) => {
    const { password } = req.body
    const { token } = req.params
    const usuario = await Usuario.findOne({token}) // Encuentra el primer registro que coincide con el dato que le pasamos

    // Confirmar que el usuario que tratamos de autenticar existe
    if(!usuario) {
        const error = new Error('Usuario no encontrado')
        return res.status(400).json({msg: error.message})
    }

    // Evaluar que este confirmado
    if(!usuario.confirmado) {
        const error = new Error('Usuario no Confirmado')
        return res.status(400).json({msg: error.message})
    }
 
    try {
        usuario.password = password
        usuario.token = ''
        await usuario.save()
        res.json({msg: 'Contraseña Cambiada Correctamente'})
    } catch (error) {
        console.log(error)
    }
}

const perfil = async (req, res) => {
    const { usuario } = req

    res.json(usuario)
}

export {
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    cambiarContraseña,
    comprobarToken,
    perfil
}
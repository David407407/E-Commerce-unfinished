import mongoose from "mongoose";

const productosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    imagen: {
        type: Array,
        of: String,
        required: true
    },
    descripcion: { 
        type: String, 
        required: true 
    },
    precio: {
        type: Number,
        required: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
    },
}, {
    timestamps: true
});

const Producto = mongoose.model("Producto", productosSchema)
export default Producto
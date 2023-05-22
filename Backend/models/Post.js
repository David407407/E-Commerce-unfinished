import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    fecha: { 
        type: Date,
        default: Date.now(), 
        required: true 
    },
    descripcion: { 
        type: String, 
        required: true 
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
    },
}, {
    timestamps: true
});

const Post = mongoose.model("Post", postSchema)
export default Post
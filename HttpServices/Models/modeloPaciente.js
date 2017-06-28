/**
 * Created by xaipo on 4/4/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({



    cedula: String,
    puesto_trabajo: mongoose.Schema.ObjectId,
    primer_nombre: String,
    segundo_nombre: String,
    primer_apellido: String,
    segundo_apellido: String,
    sexo : String,
    fecha_nacimiento: String,
    ciudad:  mongoose.Schema.ObjectId,
    edad: Number,
    telefono:String,
    estado_civil:  mongoose.Schema.ObjectId,
    nivel_estudio: mongoose.Schema.ObjectId,
    historias_clinicas: Array,




});


module.exports= restful.model('pacientes',categoriaSchema);
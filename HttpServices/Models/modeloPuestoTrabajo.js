/**
 * Created by xaipo on 4/4/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({


    nombre_puesto : String,
    dependencia:  mongoose.Schema.ObjectId,
    cargo:  mongoose.Schema.ObjectId,
    fecha: String,
    estado: String,
    jornada:  mongoose.Schema.ObjectId,
    descripcion_funciones: String,
    maquinaria: Array,
    herramienta: Array,
    materia_prima: Array,
    proteccion: Array,
    protocolos: Array,


});


module.exports= restful.model('puestoTrabajos',categoriaSchema);

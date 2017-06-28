/**
 * Created by xaipo on 12/8/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;
var categoriaSchema = new mongoose.Schema({


    antescedentes_personales : Array,
    motivo_consulta: String,
    enfermedad_actual: String,
    examen_fisico: mongoose.Schema.ObjectId,
    organos_sistemas:Array,
    examenes:Array,
    diagnostico: Array,
    paciente: mongoose.Schema.ObjectId,
    fecha:String,
    receta:String,
    indicaciones:String


});


module.exports= restful.model('morbilidad',categoriaSchema);

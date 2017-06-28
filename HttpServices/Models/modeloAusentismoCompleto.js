/**
 * Created by xaipo on 10/4/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({


    mes : String,
    paciente:  mongoose.Schema.ObjectId,
    desde:String,
    hasta: String,
    dias:Number,
    horas:Number,
    minutos:Number,
    laboral_nolaboral:String,

    diagnostico:Array,
    medico: mongoose.Schema.ObjectId,
    tipo_certificado:String,
    observaciones:String,
    regimen:String,





});


module.exports= restful.model('ausentismoCompleto',categoriaSchema);
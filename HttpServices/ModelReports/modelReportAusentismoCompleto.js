/**
 * Created by xaipo on 8/7/2017.
 */

var restful= require('node-restful');
var mongoose= restful.mongoose;


//User schema
var AusentismoSchema = mongoose.Schema({
    paciente: {type:mongoose.Schema.Types.ObjectId, ref: 'pacientes'},
    dias:Number,
    fechas:String,
    horas:Number,
    minutos:Number,
    laboral_nolaboral:String,
    estado: String,
    diagnostico:Array,
    medico: {type:mongoose.Schema.Types.ObjectId, ref: 'medico'},
    tipo_certificado:String,
    observaciones:String,
    regimen:String,
    fechaRegistro: {type: Date, default: Date.now}
});

 module.exports = mongoose.model('AusentismoCompleto', AusentismoSchema);


/**
 * Created by xaipo on 7/4/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({


    tipo_examen:mongoose.Schema.Types.ObjectId,
    fecha_examen:String,
    riesgos_ocupacionales:Array,
    accidentesTrabajo:Array,
    gineco_obstetra:Array,
    ausentismo:Array,
    enfermedades_actuales_historicas:Array,
    antescedentes_familiares:Array,
    antescedentes_personales:Array,
    inmunizacion:Array,
    habitos_toxicos:Array,
    organos_sistemas:Array,
    examenes_laboratorio:Array,
    examenes_paraclinicos:Array,
    examen_fisico:Array,
    diagnostico_ocupacional:Array,
    diagnostico_noOcupacioanl:Array,
    concepto:String,
    restricciones_limitaciones:String,
    recomendaciones:String,
    remision_especialista:String,
    nombre_especialista:String,
    reubicacion:String,
    estado:Number,




});


module.exports= restful.model('historia_clinica',categoriaSchema);
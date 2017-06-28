/**
 * Created by xaipo on 4/8/2016.
 */

var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({

    normal_anormal:String,
    fecha_ultima_regla: String,
    gestaciones: String,
    partos:String,
    aborto: String,
    hijos_vivos:String,
    embarazos:String,
    fecha_ultima_citologia:String,
    resultados_citologia:String,
    planificacion_familiar:String,
    metodos_planifiacion_familiar: Array,
    observaciones: String


});


module.exports= restful.model('ginecologia_obstetra',categoriaSchema);
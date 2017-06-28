/**
 * Created by xaipo on 4/4/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({


    nombre_empresa : String,
    cargo_empresa:  String,
    actividades:  String,
    tipo_actividad: mongoose.Schema.ObjectId,
    tiempo_anios_exposicion: Number,
    factores_riesgo:  Array,
    cualificacion: Array,
    alimentos: Array,
    sintomatologia_individual: String,
    sintomatologia_grupal: String,
    epp: String,


});


module.exports= restful.model('riesgos_ocupacionales',categoriaSchema);

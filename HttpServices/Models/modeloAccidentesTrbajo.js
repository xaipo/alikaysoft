/**
 * Created by xaipo on 4/5/2016.
 */
/**
 * Created by xaipo on 4/4/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({


    fecha_ocurrencia : String,
    nombre_empresa:  String,
    naturaleza_lesion:  String,
    parte_cuerpo_afectada: String,
    dias_incapcidad: String,
    secuelas:  String




});


module.exports= restful.model('accidentes_trabajos',categoriaSchema);
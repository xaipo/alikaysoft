/**
 * Created by xaipo on 3/28/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({



    descripcion_factor_riesgo: String,



});


module.exports= restful.model('factores_riesgo',categoriaSchema);
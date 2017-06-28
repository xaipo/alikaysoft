/**
 * Created by xaipo on 3/28/2016.
 */
/**
 * Created by xaipo on 3/28/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({



    descripcion_interpretacion_IMC: String,



});


module.exports= restful.model('interpretacionIMC',categoriaSchema);
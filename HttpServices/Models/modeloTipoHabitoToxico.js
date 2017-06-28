/**
 * Created by xaipo on 3/28/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({



    descripcion_tipo_habito_toxico: String,



});


module.exports= restful.model('tipo_habito_toxico',categoriaSchema);
/**
 * Created by xaipo on 3/29/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({



    descripcion_tipo_organo: String,



});


module.exports= restful.model('tipo_organo',categoriaSchema);
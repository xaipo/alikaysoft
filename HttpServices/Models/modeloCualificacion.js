/**
 * Created by xaipo on 3/28/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({



    descripcion_cualificacion: String,



});


module.exports= restful.model('cualificaciones',categoriaSchema);
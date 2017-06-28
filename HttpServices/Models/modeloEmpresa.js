/**
 * Created by Administrador on 1/3/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({



    nombre_empresa: String,



});


module.exports= restful.model('empresa',categoriaSchema);
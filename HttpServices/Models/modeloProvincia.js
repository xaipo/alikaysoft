/**
 * Created by Edison García on 07/03/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({



    nombre_provincia: String,



});


module.exports= restful.model('provicia',categoriaSchema);
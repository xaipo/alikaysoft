/**
 * Created by Administrador on 1/3/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({


    nombre_dependencia : String,
    id_empresa: mongoose.Schema.ObjectId



});


module.exports= restful.model('dependencia',categoriaSchema);
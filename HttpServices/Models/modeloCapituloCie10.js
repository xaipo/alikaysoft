/**
 * Created by xaipo on 7/25/2017.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({

    codigo_capitulo: String,
    descripcion: String,
    estado: String,

});


module.exports= restful.model('capitulocie10',categoriaSchema);
/**
 * Created by xaipo on 4/4/2016.
 */
/**
 * Created by xaipo on 3/29/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({



    descripcion_protocolo: String,
    preguntas: Array,




});


module.exports= restful.model('protocolos',categoriaSchema);
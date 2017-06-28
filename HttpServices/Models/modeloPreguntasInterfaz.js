/**
 * Created by xaipo on 3/29/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({



    pregunta: String,
    respuestas: Array,
    respuestas_seleccionadas: Array,



});


module.exports= restful.model('preguntas_interfaz',categoriaSchema);
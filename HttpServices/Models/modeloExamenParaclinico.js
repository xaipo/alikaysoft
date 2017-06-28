/**
 * Created by xaipo on 3/29/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({



    examen_paraclinico: String,



});


module.exports= restful.model('examenes_paraclinicos',categoriaSchema);
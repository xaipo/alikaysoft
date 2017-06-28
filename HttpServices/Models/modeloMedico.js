/**
 * Created by xaipo on 10/4/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({


    nombre_medico : String,




});


module.exports= restful.model('medico',categoriaSchema);
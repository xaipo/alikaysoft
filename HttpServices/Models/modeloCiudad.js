/**
 * Created by xaipo on 3/28/2016.
 */
/**
 * Created by Administrador on 1/3/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({


    nombre_ciudad : String,
    id_provincia: mongoose.Schema.ObjectId



});


module.exports= restful.model('ciudad',categoriaSchema);
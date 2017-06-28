
/**
 * Created by xaipo on 4/6/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({

    nombre_metodo:String,

});


module.exports= restful.model('metodos_planificacion_familiar',categoriaSchema);
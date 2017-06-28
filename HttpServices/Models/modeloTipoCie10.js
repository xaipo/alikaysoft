/**
 * Created by xaipo on 3/28/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({

    descripcion_tipo_CIE10: String,

});


module.exports= restful.model('tipo_cie10',categoriaSchema);
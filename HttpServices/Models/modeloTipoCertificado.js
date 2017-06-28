/**
 * Created by xaipo on 2/8/2017.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;
var categoriaSchema = new mongoose.Schema({


    descripcion_tipo_certificado : String


});


module.exports= restful.model('tipo_certificado',categoriaSchema);

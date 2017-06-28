/**
 * Created by xaipo on 4/7/2016.
 */
/**
 * Created by xaipo on 4/6/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({

    tipo_presonales:mongoose.Schema.ObjectId,
    enfermedad_cie10: String,
    observacion: String
});


module.exports= restful.model('personales',categoriaSchema);
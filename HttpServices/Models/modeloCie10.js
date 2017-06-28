/**
 * Created by xaipo on 4/5/2016.
 */
/**
 * Created by xaipo on 4/4/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({


    codigo_cie10 : String,
    tratamientos:  Array,
    tipo_cie10:   mongoose.Schema.ObjectId,
    sintoma: String,
    estado: String,

});


module.exports= restful.model('cie10',categoriaSchema);
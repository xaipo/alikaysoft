/**
 * Created by xaipo on 9/19/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({


    detalle_factor_riesgo : String,
    id_factor_riesgo: mongoose.Schema.ObjectId



});


module.exports= restful.model('detalle_factor_riesgo',categoriaSchema);
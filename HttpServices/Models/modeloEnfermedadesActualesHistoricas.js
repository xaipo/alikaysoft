/**
 * Created by xaipo on 4/5/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({



    sintomas_cie10:  mongoose.Schema.ObjectId,
    fecha: String,


});


module.exports= restful.model('enfermedades_actuales_historicas',categoriaSchema);
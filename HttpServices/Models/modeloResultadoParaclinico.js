/**
 * Created by xaipo on 4/12/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({



    resultado:String,
    examen: mongoose.Schema.Types.ObjectId,




});


module.exports= restful.model('resultado_examenes_paraclinicos',categoriaSchema);
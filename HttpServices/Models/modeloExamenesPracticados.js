/**
 * Created by xaipo on 4/11/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({

    observacion:String,
    examen: mongoose.Schema.Types.ObjectId,
    normal_anormal:String,
    fecha:String,




});


module.exports= restful.model('examenes_practicados',categoriaSchema);
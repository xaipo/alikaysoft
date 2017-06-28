/**
 * Created by xaipo on 4/11/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({

    descripcion_organo:String,
    tipo_organo: mongoose.Schema.Types.ObjectId,






});


module.exports= restful.model('organo',categoriaSchema);
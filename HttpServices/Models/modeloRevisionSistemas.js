/**
 * Created by xaipo on 4/8/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({

    descripcion_revision_sistemas:String,
    tipo_sistema: mongoose.Schema.Types.ObjectId



});


module.exports= restful.model('revision_sistemas',categoriaSchema);
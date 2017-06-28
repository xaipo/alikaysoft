/**
 * Created by xaipo on 4/11/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({

    tipo_habito_toxico:mongoose.Schema.Types.ObjectId,
    tipo_consumidor: mongoose.Schema.Types.ObjectId,
    frecuencia: String,
    anios_consumo:Number,




});


module.exports= restful.model('habitos_toxicos',categoriaSchema);
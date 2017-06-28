/**
 * Created by xaipo on 4/11/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({

    fecha_inmunizacion:String,
    vacuna: mongoose.Schema.Types.ObjectId,
    dosis_inmunizacion: Number,





});


module.exports= restful.model('inmunizacion',categoriaSchema);
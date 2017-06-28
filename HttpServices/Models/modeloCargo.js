/**
 * Created by xaipo on 3/28/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({



    nombre_cargo: String,
    dependencia: mongoose.Schema.ObjectId,


});


module.exports= restful.model('cargo',categoriaSchema);
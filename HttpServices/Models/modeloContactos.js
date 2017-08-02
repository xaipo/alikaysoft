/**
 * Created by Administrador on 1/3/2016.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

var categoriaSchema = new mongoose.Schema({


    nombres: String,
    ciudad: String,
    correo: String,
    telefono: String,
    observacion: String


});


module.exports = restful.model('contacto', categoriaSchema);
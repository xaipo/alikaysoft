var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({


	nombre_usuario : String,
	contrasena: String,
	tipo_usuario: Number,
	nombre: String

	
});


module.exports= restful.model('usuarios',categoriaSchema);

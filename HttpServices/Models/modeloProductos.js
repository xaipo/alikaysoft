var restful= require('node-restful');
var mongoose= restful.mongoose;

var productSchema = new mongoose.Schema({

	_id : mongoose.Schema.Types.ObjectId,
	codigo : String,
	descripcion: String,
	precio: Number,
	idCategoria: Array
	
});

module.exports= restful.model('Productos',productSchema);



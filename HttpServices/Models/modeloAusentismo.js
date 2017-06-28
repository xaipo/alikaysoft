/**
 * Created by xaipo on 4/5/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({


    causa : String,
    tiempo:  String,




});


module.exports= restful.model('ausentismo',categoriaSchema);
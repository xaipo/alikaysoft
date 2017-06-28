/**
 * Created by xaipo on 4/7/2016.
 */
/**
 * Created by xaipo on 4/6/2016.
 */
var restful= require('node-restful');
var mongoose= restful.mongoose;

var categoriaSchema = new mongoose.Schema({

    familiares:Array,
    personales: Array,

});


module.exports= restful.model('antescedentes_salud',categoriaSchema);
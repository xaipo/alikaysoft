/**
 * Created by xaipo on 3/29/2016.
 */
var restful = require('node-restful');
var mongoose = restful.mongoose;

var categoriaSchema = new mongoose.Schema({

    title: String,
    evento: {},
    start: Date,
    end: Date,
    backgroundColor: String,
    borderColor: String,
    estado: String


});


module.exports = restful.model('eventos', categoriaSchema);
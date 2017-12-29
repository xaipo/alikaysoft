
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
var restful = require("node-restful");



// copiar all*********************************************************************
//var restful = require('node-restful');
//var mongoose = restful.mongoose;



//User schema
const UserSchema = mongoose.Schema({

    nombre_usuario: {
        type: String

    },
    contrasena: {
        type: String

    },
    tipo_usuario: {
        type: Number

    },
    nombre: {
        type: String,
        required:true
    }


});

//module.exports = restful.model('User', categoriaSchema);

// fin copiar  all ************************************************************

const User = module.exports = mongoose.model('User', UserSchema);

module.exports = restful.model('User', UserSchema);



module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    const query = { nombre_usuario: username }
    User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
    console.log(newUser);
    bcrypt.genSalt(10,function (err, salt) {
        bcrypt.hash(newUser.contrasena, salt, function(err, hash) {
            if (err) throw err;
            newUser.contrasena = hash;
            newUser.save(callback);
        });
    });
}


module.exports.comparePass = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash,function (err, isMatch)  {
        if (err) throw err;
        callback(null, isMatch);
    });
}
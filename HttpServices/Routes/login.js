const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../Models/user');
const bCrypt = require('bcryptjs');

//Register
router.post('/register', function (req, res, next)  {
    var newUser = new User({
        nombre_usuario: req.body.nombre_usuario,
        contrasena: req.body.contrasena,
        tipo_usuario: req.body.tipo_usuario,
        nombre: req.body.nombre,

    });
    User.addUser(newUser, function(err, user)  {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            res.json({ success: true, msg: 'User registered' });
        }
    });
});
//Todos los usuario


router.put('/updateUser/:id', function (req, res) {


    User.findById(req.params.id, function (err, user) {

        user.nombre_usuario= req.body.name;
        user.contrasena= req.body.email;
        user.tipoUsuario= req.body.tipoUsuario;
        user.nombre= req.body.username;


        user.password =  createHash(req.body.password);

        user.save(function (err) {
            if (err) { res.send(err) }
            res.json(user);
        })
    })




});



var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};



//Authenticate
router.post('/authenticate',function (req, res, next)  {
    const username = req.body.nombre_usuario;
    const password = req.body.contrasena;
   console.log(req);
    console.log(password);
    User.getUserByUsername(username,function (err, user)  {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }

        User.comparePass(password, user.contrasena, function(err, isMatch)  {
            console.log(isMatch);
            console.log(user)
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 //1 semana
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: user

                });
            } else {
                return res.json({ success: false, msg: 'Wrong Password!' });
            }
        })
    })
});

//Profile
router.get('/profile', passport.authenticate('jwt', { session: false }),function (req, res, next)  {
    res.json({ user: req.user });
});

module.exports = router;
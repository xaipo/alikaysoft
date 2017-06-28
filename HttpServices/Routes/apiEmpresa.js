/**
 * Created by Administrador on 1/3/2016.
 */
// <editor-fold defaultstate="collapsed" desc="Dependencias">
var express= require('express');
var router= express.Router();


// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="Modelos">
var Productos = require('../Models/modeloEmpresa');

// </editor-fold>

// <editor-fold defaultstate="collapsed" desc="Obtener Productos">
/*router.get('/productos',function(req,res){

 res.send("ingresa api");
 });*/


Productos.methods(['get','put','post','delete','search']);
Productos.register(router,'/empresa');



// </editor-fold>

//Return route
module.exports=router;
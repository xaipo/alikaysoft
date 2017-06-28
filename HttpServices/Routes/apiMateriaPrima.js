/**
 * Created by Administrador on 1/3/2016.
 */
/**
 * Created by Administrador on 1/3/2016.
 */
// <editor-fold defaultstate="collapsed" desc="Dependencias">
var express= require('express');
var router= express.Router();


// </editor-fold>
// <editor-fold defaultstate="collapsed" desc="Modelos">
var Productos = require('../Models/modeloMateriaPrima');

// </editor-fold>


Productos.methods(['get','put','post','delete','search']);
Productos.register(router,'/materiaPrima');



// </editor-fold>

//Return route
module.exports=router;
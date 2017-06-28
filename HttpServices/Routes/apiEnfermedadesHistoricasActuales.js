/**
 * Created by xaipo on 8/15/2016.
 */
// <editor-fold defaultstate="collapsed" desc="Modelos">
var Productos = require('../Models/modeloEnfermedadesActualesHistoricas');

// </editor-fold>

// <editor-fold defaultstate="collapsed" desc="Obtener Productos">
/*router.get('/productos',function(req,res){

 res.send("ingresa api");
 });*/


Productos.methods(['get','put','post','delete','search']);
Productos.register(router,'/enfermedadesHistoricasActuales');



// </editor-fold>

//Return route
module.exports=router;
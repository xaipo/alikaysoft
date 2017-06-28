/**
 * Created by xaipo on 7/8/2016.
 */
var express= require('express');
var router = express.Router();
var modeloReporte ;


router.get('/reporteMorbilidad',function (req,res){

    res.send(req.param('hola'));
    console.log();

});

module.exports=router;
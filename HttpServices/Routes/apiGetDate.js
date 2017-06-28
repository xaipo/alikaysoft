/**
 * Created by xaipo on 12/12/2016.
 */
var express= require('express');
var router= express.Router();

router.get('/getDate',function(req,res){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today = mm+'/'+dd+'/'+yyyy;

 res.send(today.toString());
 });

module.exports=router;
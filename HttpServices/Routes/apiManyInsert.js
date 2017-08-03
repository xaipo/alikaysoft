/**
 * Created by xaipo on 8/1/2017.
 */

var express= require('express');
var router= express.Router();
var MongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var url = 'mongodb://localhost:27017/SaludOcupacional';




router.post('/apiManyPersonales',function(req,res){

//if(req.body.lenght>0){
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        console.log(req.body.table);
        var collection =db.collection(req.param('table'));
        collection.insertMany(req.body,  function(err, records){

            res.send(records);

        });



        db.close();

   });

//}
   // console.log();

});

module.exports=router;
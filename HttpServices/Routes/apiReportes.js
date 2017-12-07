/**
 * Created by xaipo on 7/8/2016.
 */
var express = require('express');
var router = express.Router();
var ausentismoCompleto = require('../ModelReports/modelReportAusentismoCompleto');
var medico = require('../Models/modeloMedico');
var paciente = require('../Models/modeloPaciente');
var puestoTrrabajo = require('../Models/modeloPuestoTrabajo');
var modeloCie = require('../Models/modeloCie10');
var modeloTipoCie = require('../Models/modeloTipoCie10');
var modeloCapitulos = require('../Models/modeloCapituloCie10');
var dependencia = require('../Models/modeloDependencia');
var cargo = require('../Models/modeloCargo');


router.get('/reporteMorbilidad', function (req, res) {

    res.send(req.param('hola'));
    console.log();

});

var comparacion='';
router.get('/reportAusentismo', function (req, res) {


 query= ausentismoCompleto.find()
    //.where('paciente.puesto_trabajo.cargo').equals('Secretaria')
        .populate('medico')
        //.populate('paciente')
        .populate('paciente')
        .populate({ path: 'diagnostico',
            model: modeloCie})

        .exec(function(err, docs) {
            if(err) return callback(err);
            ausentismoCompleto.populate(docs, {
                    path: 'paciente.puesto_trabajo',
                    model: puestoTrrabajo
                },
                function(err, cars) {
                    if(err) return callback(err);
                    //console.log(cars);
                    ausentismoCompleto.populate(cars, {
                            path: 'paciente.puesto_trabajo.cargo',

                            model: cargo,

                        },
                        function(err, cars2) {
                            if(err) return callback(err);
                            ausentismoCompleto.populate(cars2, {
                                    path: 'paciente.puesto_trabajo.cargo.dependencia',
                                    model: dependencia

                                },
                                function(err, cars3) {
                                    if(err) return callback(err);

                                    var resultado=cars3.filter(ausentismo => ausentismo.paciente.puesto_trabajo.cargo.dependencia.nombre_dependencia==='Dirección de Planificación');
                                    console.log(resultado);
                                    res.send(resultado);

                                });
                            //res.send(cars3);

                        });
                    // This object should now be populated accordingly.
                });

        });
  /* query.populate('medico');
     query.populate('paciente');
     query.populate({
     path: 'diagnostico',
     model: modeloCie
     });*/


    // console.log('The creator is %s', story._creator.name);
    // prints "The creator is Aaron"

    // });

    /*function findPuesto(ausentismo) {
       // console.log(ausentismo.paciente.puesto_trabajo.cargo);
        return ausentismo.paciente.puesto_trabajo.cargo.dependencia.nombre_dependencia==='Dirección de Planificación';
    }*/
    router.get('/reportAusentismo', function (req, res) {

    });


});
module.exports = router;
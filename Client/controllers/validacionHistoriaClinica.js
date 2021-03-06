/**
 * Created by Leo on 06/11/2016.
 */

app.controller('ControllerValidacionHistoria', ['$scope', '$http', '$location', 'myProvider', '$localStorage', '$rootScope', function ($scope, $http, $location, myProvider, $localStorage, $rootScope) {

    $scope.cedula;
    $scope.pacienteEncontrado;
    $scope.historiaClinica;

    $scope.urlSeleccionada='';

    $scope.searchUser = function () {
        console.log(myProvider.getUser()+'?cedula='+$scope.cedula);
        $http({

            method: 'GET',
            url: myProvider.getPaciente()+'?cedula='+$scope.cedula,

            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function successCallback(response) {


            var n = response.data.length;
            // console.log(n);

            if (n == 0) {

                alert('no se encontro el paciente');

            } else {
                //  $scope.tipoCie10=[];
                // for (var i = 0; i < n; i++) {


                $scope.pacienteEncontrado = response.data[0];
                //  window.localStorage.setItem("pe", JSON.stringify($scope.pacienteEncontrado));
                console.log($scope.pacienteEncontrado);


                var n = $scope.pacienteEncontrado.historias_clinicas.length;

                if(n==0){
                    alert('necesita abrir la historia clinica por primera vez');
                }else {


                    if (n == 1) {
                        $http({

                            method: 'GET',
                            url: myProvider.getHistoriaClinica() + '?_id=' + $scope.pacienteEncontrado.historias_clinicas[0],

                            headers: {
                                'Content-Type': 'application/json'
                            }

                        }).then(function successCallback(response) {
                            //console.log('entra url');
                            //console.log(url);
                            $scope.historiaEncontrada = response.data[0];
                            $scope.historiaEncontrada.estado = '2';
                            $http({
                                method: 'POST',
                                url: myProvider.getHistoriaClinica(),
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                data: {

                                    tipo_examen: '571bbe7825df3fa80c7be754',
                                    fecha_examen: new Date(),
                                    riesgos_ocupacionales: $scope.historiaEncontrada.riesgos_ocupacionales,
                                    accidentesTrabajo: $scope.historiaEncontrada.accidentesTrabajo,
                                    gineco_obstetra: $scope.historiaEncontrada.gineco_obstetra,
                                    ausentismo: $scope.historiaEncontrada.ausentismo,
                                    enfermedades_actuales_historicas: $scope.historiaEncontrada.enfermedades_actuales_historicas,
                                    antescedentes_familiares: $scope.historiaEncontrada.antescedentes_familiares,
                                    antescedentes_personales: $scope.historiaEncontrada.antescedentes_personales,
                                    inmunizacion: $scope.historiaEncontrada.inmunizacion,
                                    habitos_toxicos: $scope.historiaEncontrada.habitos_toxicos,
                                    organos_sistemas: $scope.historiaEncontrada.organos_sistemas,
                                    examenes_laboratorio: $scope.historiaEncontrada.examenes_laboratorio,
                                    examenes_paraclinicos: $scope.historiaEncontrada.examenes_paraclinicos,
                                    examen_fisico: $scope.historiaEncontrada.examen_fisico,
                                    diagnostico_ocupacional: $scope.historiaEncontrada.diagnostico_ocupacional,
                                    diagnostico_noOcupacioanl: $scope.historiaEncontrada.diagnostico_noOcupacioanl,
                                    concepto: $scope.historiaEncontrada.concepto,
                                    restricciones_limitaciones: $scope.historiaEncontrada.restricciones_limitaciones,
                                    recomendaciones: $scope.historiaEncontrada.recomendaciones,
                                    remision_especialista: $scope.historiaEncontrada.remision_especialista,
                                    nombre_especialista: $scope.historiaEncontrada.nombre_especialista,
                                    reubicacion: $scope.historiaEncontrada.reubicacion,
                                    estado: '2',
                                }


                            }).then(function successCallback(response) {
                                //console.log(response.data);
                                // console.log(response.data._id);
                                window.localStorage.setItem("hm", JSON.stringify(response.data));
                                // console.log($scope.historiaClinicaIngreso.gineco_obstetra);
                                // window.localStorage.setItem("pe", JSON.stringify(response.data[0]));

                                $scope.pacienteEncontrado.historias_clinicas.push(response.data._id);

                                $http({
                                    method: 'PUT',
                                    url: myProvider.getPaciente() + '/' + $scope.pacienteEncontrado._id,
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    data: {
                                        historias_clinicas: $scope.pacienteEncontrado.historias_clinicas,

                                    }


                                }).then(function successCallback(response) {

                                    console.log(response.data);
                                    window.localStorage.setItem("pe", JSON.stringify(response.data));
                                    alert('seleccione que desea agregar a la historia clinica');
                                    //localStorage.removeItem('hci');
                                    //localStorage.removeItem('hC');
                                    //window.location = '/tesisSaludOcupacional/Client/Administrator/indexAdmin.html';


                                }, function errorCallback(response) {
                                    // called asynchronously if an error occurs
                                    // or server returns response with an error status.
                                    // console.log(response);
                                    //$scope.mesaje = response.mensaje;

                                });


                            }, function errorCallback(response) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                                // console.log(response);
                                //$scope.mesaje = response.mensaje;

                            });





                            // console.log(n);
                        }, function errorCallback(response) {
                            console.log('entra');
                            //  Console.log(response);
                            $scope.mesaje = response.mensaje;

                        });
                    }else{

                        console.log('sino');
                        $http({

                            method: 'GET',
                            url: myProvider.getHistoriaClinica() + '?_id=' + $scope.pacienteEncontrado.historias_clinicas[1],

                            headers: {
                                'Content-Type': 'application/json'
                            }

                        }).then(function successCallback(response) {
                            //console.log('entra url');
                            //console.log(url);

                            var n = response.data.length;
                            // console.log(n);


                            //  $scope.tipoCie10=[];
                            // for (var i = 0; i < n; i++) {

                            console.log(response.data);
                            $scope.historiaClinica = response.data[0];
                            window.localStorage.setItem("pe", JSON.stringify($scope.pacienteEncontrado));
                            window.localStorage.setItem("hm", JSON.stringify($scope.historiaClinica));
                            $scope.baja = true;
                            $scope.op = true;
                            // console.log($scope.tipoCie10);

                            // }
                            //$scope.cie10Selected=response.data[0];
                            // $scope.busquedaCie10Tipo();




                        }, function errorCallback(response) {
                            console.log('entra');
                            //  Console.log(response);
                            $scope.mesaje = response.mensaje;

                        });



                    }

                }




            }

        }, function errorCallback(response) {
            console.log('entra');
            //  Console.log(response);
            $scope.mesaje = response.mensaje;

        });


      //  $scope.validateFirst();
    }


    $scope.listaCombo = [
        {
            descripcion: "Riesgos Ocupacionales",
            puesto: 1
        },
        {
            descripcion: "Accidentes de trabajo ",
            puesto: 2
        },

        {
            descripcion: "  Enfermedad Profesional",
            puesto: 3
        },

        {
            descripcion: "  Antescedentes Patológicos",
            puesto: 4
        },

        {
            descripcion: "  Gineco Obstetricos",
            puesto: 5
        },


        {
            descripcion: " Revisión Sistemas",
            puesto: 6
        }


        ,


        {
            descripcion: " Inmunizacion",
            puesto: 7
        },

        {
            descripcion: "  Habitos Tóxicos",
            puesto: 8
        }
        ,
        {
            descripcion: "  Examen Fisico",
            puesto: 9
        },

        {
            descripcion: "  Organos/Sistema",
            puesto: 10
        },


        {
            descripcion: " Examenes Laboratorio",
            puesto: 11
        },

        {
            descripcion: " Examenes Paraclínico",
            puesto: 12
        }

    ]




    $scope.combo = function (item) {


        $rootScope.primero = false;
        $rootScope.segundo = false;
        $rootScope.tercero = false;
        $rootScope.cuarto = false;
        $rootScope.quinto = false;
        $rootScope.sexto = false;
        $rootScope.septimo = false;
        $rootScope.octavo = false;
        $rootScope.noveno = false;
        $rootScope.decimo = false;
        $rootScope.once = false;
        $rootScope.doce = false;

        $rootScope.trece = false;

        console.log(item);



        switch (item) {

            case 1:

                $rootScope.primero = true;
                break;
            case 2:
                $rootScope.segundo = true;

                break;
            case 3:
                $rootScope.tercero = true;

                break;
            case 4:

                $rootScope.cuarto = true;
                break;
            case 5:
                $rootScope.quinto = true;

                break;

            case 6:
                $rootScope.sexto = true;

                break;

            case 7:
                $rootScope.septimo = true;

                break;
            case 8:
                $rootScope.octavo = true;

                break;


            case 9:
                $rootScope.noveno = true;

                break;

            case 10:
                $rootScope.decimo = true;

                break;

            case 11:
                $rootScope.once = true;

                break;

            case 12:
                $rootScope.doce = true;

                break;


        }


    }

    $scope.op = false;
    $scope.baja = false;
    $rootScope.primero = false;
    $rootScope.segundo = false;
    $rootScope.tercero = false;
    $rootScope.cuarto = false;
    $rootScope.quinto = false;
    $rootScope.sexto = false;
    $rootScope.septimo = false;
    $rootScope.octavo = false;
    $rootScope.noveno = false;
    $rootScope.decimo = false;
    $rootScope.once = false;
    $rootScope.doce = false;

    $rootScope.trece = false;


    $scope.darBaja = function () {


        console.log("dar baja");


        //


        //  window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));


        console.log(JSON.parse(window.localStorage.getItem('pe')));
        $scope.historiaClinica.paciente = JSON.parse(window.localStorage.getItem('pe'));
        console.log($scope.historiaClinica);


        var hm = JSON.parse(window.localStorage.getItem('hm'));


        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));


        console.log(hm);


        $http({
            method: 'Put',
            url: myProvider.getHistoriaClinica() + "/" + hm._id,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {


                estado: 2


            }


        }).then(function successCallback(response) {
            console.log("cambio a dos");

        }, function errorCallback(response) {

            console.log('falla');
        });


        $location.path('/HC1');


    }


}]);

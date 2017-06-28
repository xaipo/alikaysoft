/**
 * Created by Leo on 06/11/2016.
 */

app.controller('ControllerValidacionHistoria', ['$scope', '$http', '$location', 'myProvider', '$localStorage', function ($scope, $http, $location, myProvider, $localStorage) {

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


    $scope.redireccion=function(){

        console.log('entra');
        console.log($scope.urlSeleccionada);
            if($scope.urlSeleccionada!=''&& $scope.urlSeleccionada!=undefined){


            switch ($scope.urlSeleccionada){

                case '1':

                    window.open('/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/modificar/modificarAccidenteTrabajo.html','_blank'); ;
                    break;
                case '2':

                    window.open('/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/modificar/modificarGinecoObstetra.html','_blank'); ;
                    break;
                case '3':

                    window.open( '/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/modificar/modificarInmunizacion.html','_blank'); ;;
                    break;
                case '4':

                    window.open('/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/modificar/modificacionHabitosToxicos.html','_blank'); ;;
                    break;
                case '5':

                    window.open('/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/modificar/modificacionExamenLaboratorio.html','_blank'); ;;
                    break;
               ;

            }
        }
      //  $//scope.pacienteEncontrado = JSON.parse(window.localStorage.getItem('pe'));
     //   console.log($scope.pacienteEncontrado);


    }

}]);

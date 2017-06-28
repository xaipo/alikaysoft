/**
 * Created by xaipo on 11/7/2016.
 */
app.controller('ControllerExamenesLaboratorio', ['$scope', '$http', '$location', 'myProvider', '$localStorage', function ($scope, $http, $location, myProvider, $localStorage) {




    $scope.listaExamenes=[];
    $scope.historiaClinica='';
    $scope.iniciar=function() {

        $scope.historiaClinica=JSON.parse(window.localStorage.getItem('hm'));
        console.log($scope.historiaClinica);

        var n = $scope.historiaClinica.examenes_laboratorio.length;
        $scope.listaExamenes=[];
        for (var i = 0; i < n; i++) {


                $http({

                    method: 'GET',
                    url: myProvider.getExamenesPracticados()+'?_id='+$scope.historiaClinica.examenes_laboratorio[i],

                    headers: {
                        'Content-Type': 'application/json'
                    }

                }).then(function successCallback(response) {
                    //console.log('entra url');
                    //console.log(url);

                    var n = response.data.length;
                    // console.log(n);

                    if (n == 0) {

                        alert('no se encontro el paciente');

                    } else {
                        //  $scope.tipoCie10=[];
                        for (var i = 0; i < n; i++) {

                            var aux=response.data[i];

                            $http({

                                method: 'GET',
                                url: myProvider.getExamenesLaboratorio()+'?_id='+aux.examen,

                                headers: {
                                    'Content-Type': 'application/json'
                                }

                            }).then(function successCallback(response) {
                                console.log(aux);
                                aux.examen=response.data[0];
                                $scope.listaExamenes.push(aux);


                            }, function errorCallback(response) {
                                console.log('entra');
                                //  Console.log(response);
                                $scope.mesaje = response.mensaje;

                            });



                            //console.log($scope.listaAccidentesTrabajo);

                        }
                        //$scope.cie10Selected=response.data[0];
                        // $scope.busquedaCie10Tipo();

                    }


                }, function errorCallback(response) {
                    console.log('entra');
                    //  Console.log(response);
                    $scope.mesaje = response.mensaje;

                });

            }






    }



    $scope.examenes=[];
   // $scope.listaExamenes=[];
    $scope.examen={

        codigo:'',
        examen:'',
        normal_anormal:'',
        fecha:'',
        observacion:''

    };
    $scope.contador=0;
    $scope.examenQuitar='';

    $scope.getHistoria = function () {

        $scope.historiaClinica = JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

    }


    $http({

        method: 'GET',
        url: myProvider.getExamenesLaboratorio(),

        headers: {
            'Content-Type': 'application/json'
        }

    }).then(function successCallback(response) {
        //console.log('entra url');
        //console.log(url);

        var n = response.data.length;
        // console.log(n);

        if(n==0){

            alert('no se encontro provincias');

        }else {
            $scope.examenes=[];

            for(var i=0;i<n;i++){

                $scope.examenes.push(response.data[i]);

                // console.log($scope.empresas);
            }
            //  $scope.tipoActividadSeleccionada=$scope.empresas[0]._id;
            //console.log($scope.empresaSeleccionada);
            // console.log($scope.empresas);


        }


    }, function errorCallback(response) {
        console.log('entra');
        //  Console.log(response);
        $scope.mesaje = response.mensaje;

    });



    $scope.setClickedRow = function(index,item){  //function that sets the value of selectedRow to current index

        console.log('entra');
        $scope.selectedRow = index;
        $scope.examenQuitar=item;
        // console.log(item);
        // console.log($scope.accidentesTrabajoSelected);

        /*console.log($scope.selectedRow);
         console.log(item);*/
    }



    $scope.agregar = function(){

        $scope.examen.fecha=document.getElementById('datepicker').value;

        //  console.log($scope.selectRevision);
        $scope.examen.codigo=$scope.contador++;
        $scope.examen.examen=JSON.parse($scope.examen.examen);
        // $scope.selectRevision.codigo=$scope.contador++;

        $scope.listaExamenes.push($scope.examen);




        $http({
            method: 'POST',
            url: myProvider.getExamenesPracticados(),
            headers: {
                'Content-Type': 'application/json'
            },
            data: {

                observacion: $scope.examen.observacion,
                examen:  $scope.examen.examen._id,
                normal_anormal: $scope.examen.normal_anormal,
                fecha: $scope.examen.fecha,

            }


        }).then(function successCallback(response) {



            console.log(response.data);
            $scope.historiaClinica.examenes_laboratorio.push(response.data._id);
            window.localStorage.setItem("hm", JSON.stringify($scope.historiaClinica));

            $http({
                method: 'PUT',
                url: myProvider.getHistoriaClinica() + '/' + $scope.historiaClinica._id,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    examenes_laboratorio:  $scope.historiaClinica.examenes_laboratorio

                }


            }).then(function successCallback(response) {

                console.log(response.data);
                // window.localStorage.setItem("hm", JSON.stringify(response.data));
                // alert('seleccione que desea agregar a la historia clinica');
                //localStorage.removeItem('hci');
                //localStorage.removeItem('hC');
                //window.location = '/tesisSaludOcupacional/Client/Administrator/indexAdmin.html';


            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                // console.log(response);
                //$scope.mesaje = response.mensaje;

            });



            // window.localStorage.setItem("hm", JSON.stringify(response.data));
            // alert('seleccione que desea agregar a la historia clinica');
            //localStorage.removeItem('hci');
            //localStorage.removeItem('hC');
            //window.location = '/tesisSaludOcupacional/Client/Administrator/indexAdmin.html';


        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            // console.log(response);
            //$scope.mesaje = response.mensaje;

        });












        $scope.examen={

            codigo:'',
            examen:'',
            normal_anormal:'',
            fecha:'',
            observacion:''

        };


    }

    $scope.quitar= function (){
        // console.log($scope.accidentesTrabajoSelected);
        var n=  $scope.listaExamenes.length;
        console.log(n);
        var pos;
        for(var i=0;i<n;i++ ){


            if($scope.listaExamenes[i].codigo==$scope.examenQuitar.codigo){
                console.log('entra');

                pos=i;
                break;
            }
        }
        console.log(pos);
        $scope.listaExamenes.splice(pos,1);
        //  console.log($scope.listaRiesgosOcupacionales);
        //  console.log($scope.contador);
    }


    $scope.saveThirteen= function(){

        $scope.historiaClinica.examenes_laboratorio=$scope.listaExamenes;
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/fourteenth.html';
    }




}]);

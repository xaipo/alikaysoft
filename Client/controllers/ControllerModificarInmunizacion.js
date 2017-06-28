/**
 * Created by xaipo on 11/7/2016.
 */
app.controller('ControllerInmunizacion', ['$scope', '$http', '$location', 'myProvider', '$localStorage', function ($scope, $http, $location, myProvider, $localStorage) {

    $scope.historiaClinica='';
    $scope.inmunizacion=[];


    $scope.iniciar=function(){

        $scope.historiaClinica=JSON.parse(window.localStorage.getItem('hm'));
        console.log($scope.historiaClinica);

        var n = $scope.historiaClinica.inmunizacion.length;
        $scope.gineco_obstetra=[];
        for (var i = 0; i < n; i++) {
            $http({

                method: 'GET',
                url: myProvider.getImnunizacion()+'?_id='+$scope.historiaClinica.inmunizacion[i],

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
                            url: myProvider.getVacunas()+'?_id='+aux.vacuna,

                            headers: {
                                'Content-Type': 'application/json'
                            }

                        }).then(function successCallback(response) {
                            console.log(aux);
                            aux.vacuna=response.data[0];
                            $scope.inmunizacion.push(aux);


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




    $scope.listaVacunas=[]
    $scope.vacunaSelect='';
    $scope.contador=0;
    //$scope.inmunizacion=[];
    $scope.inmunizacionAdd={
        codigo:'',
        vacuna:'',
        fecha_inmunizacion:'',
        dosis_inmunizacion:''

    };


    $http({

        method: 'GET',
        url: myProvider.getVacunas(),

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
            $scope.listaVacunas=[];

            for(var i=0;i<n;i++){

                $scope.listaVacunas.push(response.data[i]);

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



    $scope.getHistoria= function(){

        $scope.historiaClinica=JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

    }



    $scope.setClickedRow = function(index,item){  //function that sets the value of selectedRow to current index

        console.log('entra');
        $scope.selectedRow = index;
        $scope.selectedQuitar=item;
        // console.log(item);
        // console.log($scope.accidentesTrabajoSelected);

        /*console.log($scope.selectedRow);
         console.log(item);*/
    }



    $scope.agregar = function(){

        $scope.inmunizacionAdd.fecha_inmunizacion=document.getElementById('datepicker').value;
        if($scope.inmunizacionAdd.dosis_inmunizacion!=''&&$scope.inmunizacionAdd.dosis_inmunizacion!=undefined&& $scope.inmunizacionAdd.fecha_inmunizacion!=''&& $scope.inmunizacionAdd.fecha_inmunizacion!=undefined){
            //  console.log($scope.selectRevision);
            $scope.inmunizacionAdd.codigo=$scope.contador++;
            $scope.inmunizacionAdd.vacuna=JSON.parse($scope.inmunizacionAdd.vacuna);
            // $scope.selectRevision.codigo=$scope.contador++;

            $scope.inmunizacion.push($scope.inmunizacionAdd);




            $http({
                method: 'POST',
                url: myProvider.getImnunizacion(),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {

                    fecha_inmunizacion:$scope.inmunizacionAdd.fecha_inmunizacion,
                    vacuna: $scope.inmunizacionAdd.vacuna._id,
                    dosis_inmunizacion: $scope.inmunizacionAdd.dosis_inmunizacion,
                }


            }).then(function successCallback(response) {



                console.log(response.data);
                $scope.historiaClinica.inmunizacion.push(response.data._id);
                window.localStorage.setItem("hm", JSON.stringify($scope.historiaClinica));

                $http({
                    method: 'PUT',
                    url: myProvider.getHistoriaClinica() + '/' + $scope.historiaClinica._id,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {
                        inmunizacion:  $scope.historiaClinica.inmunizacion

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













            $scope.inmunizacionAdd={
                codigo:'',
                vacuna:'',
                fecha_inmunizacion:'',
                dosis_inmunizacion:''

            };


        }else{
            alert('Elija un valor para agregar');

        }
    }

    $scope.quitar= function (){
        // console.log($scope.accidentesTrabajoSelected);
        var n=  $scope.inmunizacion.length;
        console.log(n);
        var pos;
        for(var i=0;i<n;i++ ){

            if($scope.inmunizacion[i].codigo==$scope.selectedQuitar.codigo){


                pos=i;
                break;
            }
        }
        console.log(pos);
        $scope.inmunizacion.splice(pos,1);
        //  console.log($scope.listaRiesgosOcupacionales);
        //  console.log($scope.contador);
    }


    $scope.saveNine= function(){

        $scope.historiaClinica.inmunizacion=$scope.inmunizacion;
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/tenth.html';
    }





}]);
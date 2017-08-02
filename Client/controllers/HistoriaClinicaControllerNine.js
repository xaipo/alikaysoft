
app.controller('HistoriaClinicaControllerNineth', ['$scope', '$http', '$location','myProvider','$localStorage','$rootScope',  function ($scope,$http,$location,myProvider,$localStorage,$rootScope) {


    $scope.listaVacunas=[]
    $scope.vacunaSelect='';
    $scope.contador=0;
    $scope.inmunizacion=[];
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

        $scope.inmunizacionAdd.fecha_inmunizacion = document.getElementById('datepicker3').value;
        if($scope.inmunizacionAdd.dosis_inmunizacion!=''&&$scope.inmunizacionAdd.dosis_inmunizacion!=undefined&& $scope.inmunizacionAdd.fecha_inmunizacion!=''&& $scope.inmunizacionAdd.fecha_inmunizacion!=undefined){
          //  console.log($scope.selectRevision);
            $scope.inmunizacionAdd.codigo=$scope.contador++;
            $scope.inmunizacionAdd.vacuna=JSON.parse($scope.inmunizacionAdd.vacuna);
            // $scope.selectRevision.codigo=$scope.contador++;

            $scope.inmunizacion.push($scope.inmunizacionAdd);
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

        console.clear();

        $scope.historiaClinica = JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

        $scope.historiaClinica.inmunizacion=$scope.inmunizacion;
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
       // window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/tenth.html';
        $rootScope.octavo=true;
    }

    $scope.noAplica= function(){

        $scope.historiaClinica.inmunizacion="No Aplica";
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
    //    window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/tenth.html';
        $rootScope.octavo=true;
    }


    $scope.modificar = function () {










        // console.log($scope.historiaClinica);
        console.clear();
        console.log(JSON.parse(window.localStorage.getItem('pe')));
        console.log(JSON.parse(window.localStorage.getItem('hm')));

        $scope.historiaClinica.inmunizacion = $scope.inmunizacion;


        var n = $scope.historiaClinica.inmunizacion.length;
        // console.log($scope.historiaClinica.ginecoObstetra);
        // console.log($scope.historiaClinica);
        for (var i = 0; i < n; i++) {
            $http({
                method: 'POST',
                url: myProvider.getImnunizacion(),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {

                    fecha_inmunizacion: $scope.historiaClinica.inmunizacion[i].fecha_inmunizacion,
                    vacuna: $scope.historiaClinica.inmunizacion[i].vacuna._id,
                    dosis_inmunizacion: $scope.historiaClinica.inmunizacion[i].dosis_inmunizacion,
                }


            }).then(function successCallback(response) {

                var hm = JSON.parse(window.localStorage.getItem('hm'));

                hm.inmunizacion.push(response.data._id);

                window.localStorage.setItem("hm", JSON.stringify(hm));
                // console.log($scope.historiaClinicaIngreso.riesgos_ocupacionales);

                console.log(hm);
                //actulizarla tabla de histira clinica


                $http({
                    method: 'Put',
                    url: myProvider.getHistoriaClinica() + "/" + hm._id,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {


                        inmunizacion: hm.inmunizacion


                    }


                }).then(function successCallback(response) {
                    alert('Actulizado Corectamente')
                    $rootScope.septimo = false;

                }, function errorCallback(response) {

                    console.log('falla');
                });


            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                // console.log(response);
                //$scope.mesaje = response.mensaje;

            });
        }


    }



}]);

/**
 * Created by xaipo on 9/8/2016.
 */
app.controller('HistoriaClinicaTenth', ['$scope', '$http', '$location','myProvider','$localStorage','$rootScope',  function ($scope,$http,$location,myProvider,$localStorage,$rootScope) {



    $scope.habito_toxico={
        codigo:'',
        "tipo_habito_toxico":"",
        "tipo_consumidor":"",
        "frecuencia":"",
        "anios_consumo":''
    };
    $scope.contador=0;
    $scope.listaTipoHabito=[];
    $scope.listaTipoConsumidor=[];
    $scope.listaHabitosToxicos=[];
    $scope.habitoSeleccionado='';
    $http({

        method: 'GET',
        url: myProvider.getTipoHabitoToxico(),

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
            $scope.listaTipoHabito=[];

            for(var i=0;i<n;i++){

                $scope.listaTipoHabito.push(response.data[i]);

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



    $http({

        method: 'GET',
        url: myProvider.getTipoConsumidor(),

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
            $scope.listaTipoConsumidor=[];

            for(var i=0;i<n;i++){

                $scope.listaTipoConsumidor.push(response.data[i]);

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
        $scope.habitoSeleccionado=item;
        // console.log(item);
        // console.log($scope.accidentesTrabajoSelected);

        /*console.log($scope.selectedRow);
         console.log(item);*/
    }



    $scope.agregar = function(){

       // $scope.inmunizacionAdd.fecha_inmunizacion=document.getElementById('datepicker').value;
        if($scope.habito_toxico.frecuencia!=''&&$scope.habito_toxico.frecuencia!=undefined&& $scope.habito_toxico.anios_consumo!=''&& $scope.habito_toxico.anios_consumo!=undefined){
            //  console.log($scope.selectRevision);
            $scope.habito_toxico.codigo=$scope.contador++;
            $scope.habito_toxico.tipo_consumidor=JSON.parse($scope.habito_toxico.tipo_consumidor);
            $scope.habito_toxico.tipo_habito_toxico=JSON.parse($scope.habito_toxico.tipo_habito_toxico);
            // $scope.selectRevision.codigo=$scope.contador++;

            $scope.listaHabitosToxicos.push($scope.habito_toxico);
            $scope.habito_toxico={
                codigo:'',
                "tipo_habito_toxico":"",
                "tipo_consumidor":"",
                "frecuencia":"",
                "anios_consumo":''
            };


        }else{
            alert('Elija un valor para agregar');

        }
    }

    $scope.quitar= function (){
        // console.log($scope.accidentesTrabajoSelected);
        var n=  $scope.listaHabitosToxicos.length;
        console.log(n);
        var pos;
        for(var i=0;i<n;i++ ){

            if($scope.listaHabitosToxicos[i].codigo==$scope.habitoSeleccionado.codigo){


                pos=i;
                break;
            }
        }
        console.log(pos);
        $scope.listaHabitosToxicos.splice(pos,1);
        //  console.log($scope.listaRiesgosOcupacionales);
        //  console.log($scope.contador);
    }



    $scope.saveTen= function(){

        console.clear();
        $scope.historiaClinica = JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

        $scope.historiaClinica.habitos_toxicos=$scope.listaHabitosToxicos;
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
       // window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/eleventh.html';

        $rootScope.noveno=true;
    }

    $scope.noAplica= function(){

        $scope.historiaClinica.habitos_toxicos="No Aplica";
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        // window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/eleventh.html';

        $rootScope.noveno=true;

   
    }


    $scope.modificar = function () {


        // console.log($scope.historiaClinica);
        console.clear();
        console.log(JSON.parse(window.localStorage.getItem('pe')));
        console.log(JSON.parse(window.localStorage.getItem('hm')));

        console.log($scope.listaAccidentesTrabajo);


        $scope.historiaClinica.habitos_toxicos = $scope.listaHabitosToxicos;


        var n = $scope.historiaClinica.habitos_toxicos.length;
        // console.log($scope.historiaClinica.ginecoObstetra);
        // console.log($scope.historiaClinica);
        for (var i = 0; i < n; i++) {
            $http({
                method: 'POST',
                url: myProvider.gethabitosToxicos(),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {

                    tipo_habito_toxico: $scope.historiaClinica.habitos_toxicos[i].tipo_habito_toxico._id,
                    tipo_consumidor: $scope.historiaClinica.habitos_toxicos[i].tipo_consumidor._id,
                    frecuencia: $scope.historiaClinica.habitos_toxicos[i].frecuencia,
                    anios_consumo: $scope.historiaClinica.habitos_toxicos[i].anios_consumo,
                }


            }).then(function successCallback(response) {
                //console.log(response.data);

                var hm = JSON.parse(window.localStorage.getItem('hm'));

                hm.habitos_toxicos.push(response.data._id);

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


                        habitos_toxicos: hm.habitos_toxicos


                    }


                }).then(function successCallback(response) {
                    alert('Actulizado Corectamente')
                    $rootScope.octavo = false;

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

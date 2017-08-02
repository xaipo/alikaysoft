/**
 * Created by xaipo on 9/26/2016.
 */
app.controller('HistoriaClinicaControllerTwelve', ['$scope', '$http', '$location','myProvider','$localStorage','$rootScope',  function ($scope,$http,$location,myProvider,$localStorage,$rootScope) {


    $scope.getHistoria = function () {

        $scope.historiaClinica = JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

    }
    $scope.contador=0;
    $scope.tipoSelected='';
    $scope.listaTipos=[];
    $scope.listaIndicadores=[];
    $scope.listaOrganosSistemas=[];
    $scope.organo_sistema={
        codigo:'',
        observacion:'',
        organo:'',
        normal_anormal:''
    }
    $scope.selectedQuitar;

    $http({

        method: 'GET',
        url: myProvider.getTipoOrgano(),

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
            $scope.listaTipos=[];

            for(var i=0;i<n;i++){

                $scope.listaTipos.push(response.data[i]);

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



    $scope.changeType=function(){


        if($scope.tipoSelected!=''&&$scope.tipoSelected!=undefined){
            //console.log($scope.tipoSelected);
            $scope.tipoSelected=JSON.parse($scope.tipoSelected);
            $http({

                method: 'GET',
                url: myProvider.getOrganos()+"?tipo_organo="+$scope.tipoSelected._id,

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
                    $scope.listaIndicadores=[];

                    for(var i=0;i<n;i++){

                        $scope.listaIndicadores.push(response.data[i]);

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


        }



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

        // $scope.inmunizacionAdd.fecha_inmunizacion=document.getElementById('datepicker').value;

        //  console.log($scope.selectRevision);
        $scope.organo_sistema.codigo=$scope.contador++;
        $scope.organo_sistema.organo=JSON.parse($scope.organo_sistema.organo);
        // $scope.selectRevision.codigo=$scope.contador++;

        $scope.listaOrganosSistemas.push($scope.organo_sistema);
        $scope.organo_sistema={
            codigo:'',
            observacion:'',
            organo:'',
            normal_anormal:''
        }


    }

    $scope.quitar= function (){
        // console.log($scope.accidentesTrabajoSelected);
        var n=  $scope.listaOrganosSistemas.length;
        console.log(n);
        var pos;
        for(var i=0;i<n;i++ ){


            if($scope.listaOrganosSistemas[i].codigo==$scope.selectedQuitar.codigo){
                console.log('entra');

                pos=i;
                break;
            }
        }
        console.log(pos);
        $scope.listaOrganosSistemas.splice(pos,1);
        //  console.log($scope.listaRiesgosOcupacionales);
        //  console.log($scope.contador);
    }

    $scope.saveTwelve= function(){

        console.clear();
        $scope.historiaClinica = JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

        $scope.historiaClinica.organos_sistemas=$scope.listaOrganosSistemas;
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
       // window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/thirteenth.html';


        $rootScope.once=true;
    }


    $scope.noAplica= function(){

        $scope.historiaClinica.organos_sistemas="No Aplica";
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        // window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/thirteenth.html';


        $rootScope.once=true;
    }


    $scope.modificar = function () {










        // console.log($scope.historiaClinica);
        console.clear();
        console.log(JSON.parse(window.localStorage.getItem('pe')));
        console.log(JSON.parse(window.localStorage.getItem('hm')));

        console.log($scope.listaAccidentesTrabajo);


        $scope.historiaClinica.organos_sistemas = $scope.listaOrganosSistemas;


        var n = $scope.historiaClinica.organos_sistemas.length;
        // console.log($scope.historiaClinica.ginecoObstetra);
        // console.log($scope.historiaClinica);
        for (var i = 0; i < n; i++) {
            $http({
                method: 'POST',
                url: myProvider.getOrganoSelected(),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {

                    observacion: $scope.historiaClinica.organos_sistemas[i].observacion,
                    organo: $scope.historiaClinica.organos_sistemas[i].organo._id,
                    normal_anormal: $scope.historiaClinica.organos_sistemas[i].normal_anormal,
                }


            }).then(function successCallback(response) {
                //console.log(response.data);

                var hm = JSON.parse(window.localStorage.getItem('hm'));

                hm.organos_sistemas.push(response.data._id);

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


                        organos_sistemas: hm.organos_sistemas


                    }


                }).then(function successCallback(response) {
                    alert('Actulizado Corectamente')
                    $rootScope.decimo = false;

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
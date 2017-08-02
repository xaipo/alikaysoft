/**
 * Created by xaipo on 8/31/2016.
 */
app.controller('HistoriaClinicaSeventh', ['$scope', '$http', '$location','myProvider','$localStorage','$rootScope',  function ($scope,$http,$location,myProvider,$localStorage,$rootScope) {


    $scope.listaGinecoObstetra=[];
    $scope.contador=0;
    $scope.ginecoQuitar='';

    $scope.ginecoObstetra={
        codigo:'',
        normal_anormal:'',
        fecha_ultima_regla:'',

        partos:'',
        abortos:'',
        hijos_vivos:'',
        embarazos:'',
        fecha_ultima_citologia:'',
        resultados_citologia:'',

        observaciones:'',
        metodos_planificacion_familiar:[]
    }

    $scope.metodos_planificacion=[];
    $scope.metodos_seleccionados=[];
    $scope.selectedMetodo;
    $scope.search1;
    $scope.search2;

    $scope.getHistoria= function(){

        $scope.historiaClinica=JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

    }

    $http({

        method: 'GET',
        url: myProvider.getMetodosPlanifiacionFamiliar(),

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
            $scope.metodos_planificacion=[];

            for(var i=0;i<n;i++){

                $scope.metodos_planificacion.push(response.data[i]);

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

    // </editor-fold >


    $scope.agregar=function(){


        if($scope.selectedMetodo!=undefined && $scope.selectedMetodo != "") {
            $scope.selectedMetodo=JSON.parse($scope.selectedMetodo);
            $scope.metodos_seleccionados.push($scope.selectedMetodo);

            var n = $scope.metodos_planificacion.length;
            var pos = "";
            for (var i = 0; i < n; i++) {

                if ($scope.metodos_planificacion[i]._id == $scope.selectedMetodo._id) {
                    pos = i;
                    break;
                }
            }
            //    console.log(pos);
            $scope.metodos_planificacion.splice(pos, 1);
            //$scope.maquinaria.cleanData(undefined);
            //  console.log($scope.listaSeleccionMaquinaria);
            // console.log($scope.maquinaria);
            $scope.selectedMetodo="";
            //$scope.maquinaria.removeItem($scope.selectedMaquinaria);
        }

    }



    $scope.quitar=function(){


        if( $scope.selectedMetodo!=undefined && $scope.selectedMetodo != "") {
            $scope.selectedMetodo=JSON.parse($scope.selectedMetodo);
            $scope.metodos_planificacion.push($scope.selectedMetodo);
            // $scope.listaSeleccionMaquinaria.removeItem($scope.selectedMaquinaria._id);

            var n = $scope.metodos_seleccionados.length;
            var pos = "";
            for (var i = 0; i < n; i++) {

                if ($scope.metodos_seleccionados[i]._id == $scope.selectedMetodo._id) {
                    pos = i;
                    break;
                }
            }
            //  console.log(pos);
            $scope.metodos_seleccionados.splice(pos, 1);
            $scope.selectedMetodo="";
            // $scope.listaSeleccionMaquinaria.cleanData(undefined);
            //    console.log($scope.maquinaria);
            // console.log($scope.listaSeleccionMaquinaria);
        }

    }


    $scope.nextSeventh=function(){


        console.clear();

        $scope.historiaClinica = JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

        $scope.historiaClinica.ginecoObstetra=$scope.listaGinecoObstetra;


        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
       // window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/eigth.html';
        $rootScope.sexto=true;
    }



    $scope.agregarP1 = function(){
        //  console.log($scope.antescedentes_familiares)

        $scope.ginecoObstetra.fecha_ultima_citologia=document.getElementById('datepicker1').value;
        $scope.ginecoObstetra.fecha_ultima_regla=document.getElementById('datepicker').value;
        $scope.ginecoObstetra.metodos_planificacion_familiar=$scope.metodos_seleccionados;
        $scope.ginecoObstetra.codigo=$scope.contador++;

            $scope.listaGinecoObstetra.push($scope.ginecoObstetra);
        $scope.ginecoObstetra={
            codigo:'',
            normal_anormal:'',
            fecha_ultima_regla:'',

            partos:'',
            abortos:'',
            hijos_vivos:'',
            embarazos:'',
            fecha_ultima_citologia:'',
            resultados_citologia:'',

            observaciones:'',
            metodos_planificacion_familiar:[]
        }


    }


    $scope.quitar1= function (){
        // console.log($scope.accidentesTrabajoSelected);
        var n=  $scope.listaGinecoObstetra.length;
        console.log(n);
        var pos;
        for(var i=0;i<n;i++ ){

            if($scope.listaGinecoObstetra[i].codigo==$scope.ginecoQuitar.codigo){


                pos=i;
                break;
            }
        }
        console.log(pos);
        $scope.listaGinecoObstetra.splice(pos,1);
        //  console.log($scope.listaRiesgosOcupacionales);
        //  console.log($scope.contador);
    }

    $scope.setClickedRow1 = function(index,item){  //function that sets the value of selectedRow to current index

        console.log('entra');
        $scope.selectedRow = index;
        $scope.ginecoQuitar=item;
        // console.log(item);
        // console.log($scope.accidentesTrabajoSelected);

        /*console.log($scope.selectedRow);
         console.log(item);*/
    }


    $scope.skipt=function(){



        $scope.historiaClinica.ginecoObstetra=[];
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
       // window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/eigth.html';


        $rootScope.sexto=true
    }


    $scope.modificar = function () {




        // console.log($scope.historiaClinica);
        console.clear();
        console.log(JSON.parse(window.localStorage.getItem('pe')));
        console.log(JSON.parse(window.localStorage.getItem('hm')));


        $scope.historiaClinica.ginecoObstetra = $scope.listaGinecoObstetra;


        var n = $scope.historiaClinica.ginecoObstetra.length;
        // console.log($scope.historiaClinica.ginecoObstetra);
        // console.log($scope.historiaClinica);
        for (var i = 0; i < n; i++) {
            var vec = [];
//           // console.log($scope.historiaClinica.ginecoObstetra[i].metodos_planificacion_familiar.length);
            var m = $scope.historiaClinica.ginecoObstetra[i].metodos_planificacion_familiar.length;
            for (var j = 0; j < m; j++) {

                vec.push($scope.historiaClinica.ginecoObstetra[i].metodos_planificacion_familiar[j]._id)

            }
            $scope.historiaClinica.ginecoObstetra[i].metodos_planificacion_familiar = vec;
            // console.log( $scope.historiaClinica.ginecoObstetra[i].metodos_planificacion_familiar);


            $http({
                method: 'POST',
                url: myProvider.getGinecoObstetra(),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {

                    normal_anormal: $scope.historiaClinica.ginecoObstetra[i].normal_anormal,
                    fecha_ultima_regla: $scope.historiaClinica.ginecoObstetra[i].fecha_ultima_regla,

                    partos: $scope.historiaClinica.ginecoObstetra[i].partos,
                    aborto: $scope.historiaClinica.ginecoObstetra[i].abortos,
                    hijos_vivos: $scope.historiaClinica.ginecoObstetra[i].hijos_vivos,
                    embarazos: $scope.historiaClinica.ginecoObstetra[i].embarazos,
                    fecha_ultima_citologia: $scope.historiaClinica.ginecoObstetra[i].fecha_ultima_citologia,
                    resultados_citologia: $scope.historiaClinica.ginecoObstetra[i].resultados_citologia,

                    metodos_planifiacion_familiar: $scope.historiaClinica.ginecoObstetra[i].metodos_planificacion_familiar,
                    observaciones: $scope.historiaClinica.ginecoObstetra[i].observacion
                }


            }).then(function successCallback(response) {
                //console.log(response.data);

                var hm = JSON.parse(window.localStorage.getItem('hm'));

                hm.gineco_obstetra.push(response.data._id);

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


                        gineco_obstetra: hm.gineco_obstetra


                    }


                }).then(function successCallback(response) {
                    alert('Actulizado Corectamente')
                    $rootScope.quinto = false;

                }, function errorCallback(response) {

                    console.log('falla');
                });


            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                // console.log(response);
                //$scope.mesaje = response.mensaje;

            });

            //$scope.mensaje = "Para ingresar debe llenar el nombre de la empresa";

            //

        }


    }






}]);
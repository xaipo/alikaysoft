/**
 * Created by xaipo on 11/6/2016.
 */
app.controller('ControllerModificarGineco', ['$scope', '$http', '$location', 'myProvider', '$localStorage', function ($scope, $http, $location, myProvider, $localStorage) {


    $scope.listaGinecoObstetra=[];
    $scope.historiaClinica='';

    $scope.iniciar=function(){
        $scope.historiaClinica=JSON.parse(window.localStorage.getItem('hm'));
        console.log($scope.historiaClinica);

        var n = $scope.historiaClinica.gineco_obstetra.length;
        $scope.gineco_obstetra=[];
        for (var i = 0; i < n; i++) {
            $http({

                method: 'GET',
                url: myProvider.getGinecoObstetra()+'?_id='+$scope.historiaClinica.gineco_obstetra[i],

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


                        $scope.listaGinecoObstetra.push(response.data[i]);
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



        $scope.historiaClinica.ginecoObstetra=$scope.listaGinecoObstetra;


        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/eigth.html';
    }



    $scope.agregarP1 = function(){
        //  console.log($scope.antescedentes_familiares)

        $scope.ginecoObstetra.fecha_ultima_citologia=document.getElementById('datepicker1').value;
        $scope.ginecoObstetra.fecha_ultima_regla=document.getElementById('datepicker').value;
        $scope.ginecoObstetra.metodos_planificacion_familiar=$scope.metodos_seleccionados;
        var n=$scope.ginecoObstetra.metodos_planificacion_familiar.length;
        var vec=[];
        for(var i=0;i<n;i++){

            vec.push($scope.ginecoObstetra.metodos_planificacion_familiar[i]._id);
        }
        $scope.ginecoObstetra.metodos_planificacion_familiar=vec;
        $scope.ginecoObstetra.codigo=$scope.contador++;
        $scope.listaGinecoObstetra.push($scope.ginecoObstetra);


        $http({
            method: 'POST',
            url: myProvider.getGinecoObstetra(),
            headers: {
                'Content-Type': 'application/json'
            },
            data: {

                normal_anormal:$scope.ginecoObstetra.normal_anormal,
                fecha_ultima_regla: $scope.ginecoObstetra.fecha_ultima_regla,

                partos:$scope.ginecoObstetra.partos,
                aborto: $scope.ginecoObstetra.abortos,
                hijos_vivos:$scope.ginecoObstetra.hijos_vivos,
                embarazos:$scope.ginecoObstetra.embarazos,
                fecha_ultima_citologia:$scope.ginecoObstetra.fecha_ultima_citologia,
                resultados_citologia:$scope.ginecoObstetra.resultados_citologia,

                metodos_planifiacion_familiar: $scope.ginecoObstetra.metodos_planificacion_familiar,
                observaciones: $scope.ginecoObstetra.observacion
            }


        }).then(function successCallback(response) {



            console.log(response.data);
            $scope.historiaClinica.gineco_obstetra.push(response.data._id);
            window.localStorage.setItem("hm", JSON.stringify($scope.historiaClinica));

            $http({
                method: 'PUT',
                url: myProvider.getHistoriaClinica() + '/' + $scope.historiaClinica._id,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    gineco_obstetra:  $scope.historiaClinica.gineco_obstetra

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
        window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/eigth.html';
    }

}]);
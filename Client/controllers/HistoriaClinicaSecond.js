/**
 * Created by xaipo on 7/8/2016.
 */

app.controller('HistoriaClinicaSecond', ['$scope', '$http', '$location','myProvider','$localStorage','$rootScope',  function ($scope,$http,$location,myProvider,$localStorage,$rootScope) {


    $scope.search1;
    $scope.search2;
    $scope.search3;
    $scope.search4;
    $scope.empresas=[];
    $scope.tipoActividad=[];
    $scope.cualificaciones=[];
    $scope.factoresRiesgo=[];
    $scope.listaFactoresRiesgoSeleccionado=[];
    $scope.alimentos=[];
    $scope.listaAlimentosSeleccionados=[];
    $scope.listaDetalleFactorRiesgo=[];
    $scope.alimentoSeleccionado;
    $scope.empresaSeleccionada;
    $scope.tipoActividadSeleccionada;
    $scope.cualificacionSeleccionada;
    $scope.selectedFactorRiesgo;
    $scope.historiaClinica = {};
    $scope.historiaClinica.riesgosOcupacionales = [];
    $scope.selectedRow ;
    $scope.riesgosOcupacionalesSelected;
    $scope.listaRiesgosOcupacionales=[];
    $scope.factorRiesgoSeleccionado='';
    $scope.contador=0;

    $scope.riesgosOcupacionales={
        _id: "",
        nombre_empresa : "",
        cargo_empresa:  "",
        actividades:  "",
        tipo_actividad: "",
        tiempo_anios_exposicion: "",
        factores_riesgo:  "",
        cualificacion: "",
        alimentos: "",
        sintomatologia_individual: "",
        sintomatologia_grupal: "",
        epp: "",
        cod:""

    }


    $scope.historiaClinica = JSON.parse(window.localStorage.getItem('hC'));
    console.log($scope.historiaClinica);
    
    $scope.getHistoria= function(){

        //   $scope.historiaClinica=JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

    }

    // <editor-fold defaultstate="collapsed" desc="Cargar empresa">
    $http({

        method: 'GET',
        url: myProvider.getEmpresa(),

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
            $scope.empresas=[];

            for(var i=0;i<n;i++){

                $scope.empresas.push(response.data[i]);

                // console.log($scope.empresas);
            }
            $scope.empresaSeleccionada=$scope.empresas[0]._id;
            //console.log($scope.empresaSeleccionada);
            // console.log($scope.empresas);


        }


    }, function errorCallback(response) {
        console.log('entra');
        //  Console.log(response);
        $scope.mesaje = response.mensaje;

    });

    // </editor-fold >

    // <editor-fold defaultstate="collapsed" desc="tipo actividad">
    $http({

        method: 'GET',
        url: myProvider.getTipoActividad(),

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
            $scope.tipoActividad=[];

            for(var i=0;i<n;i++){

                $scope.tipoActividad.push(response.data[i]);

                // console.log($scope.empresas);
            }
            $scope.tipoActividadSeleccionada=$scope.empresas[0]._id;
            //console.log($scope.empresaSeleccionada);
            // console.log($scope.empresas);


        }


    }, function errorCallback(response) {
        console.log('entra');
        //  Console.log(response);
        $scope.mesaje = response.mensaje;

    });

    // </editor-fold >


    // <editor-fold defaultstate="collapsed" desc="alimentos">
    $http({

        method: 'GET',
        url: myProvider.getAlimentos(),

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
            $scope.alimentos=[];

            for(var i=0;i<n;i++){

                $scope.alimentos.push(response.data[i]);

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

    // <editor-fold defaultstate="collapsed" desc="cualificacion">
    $http({

        method: 'GET',
        url: myProvider.getCualificacion(),

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
            $scope.cualificaciones=[];

            for(var i=0;i<n;i++){

                $scope.cualificaciones.push(response.data[i]);

                // console.log($scope.empresas);
            }
            $scope.cualificacionSeleccionada=$scope.empresas[0]._id;
            //console.log($scope.empresaSeleccionada);
            // console.log($scope.empresas);


        }


    }, function errorCallback(response) {
        console.log('entra');
        //  Console.log(response);
        $scope.mesaje = response.mensaje;

    });

    // </editor-fold >


    // <editor-fold defaultstate="collapsed" desc="factores riesgo">
    $http({

        method: 'GET',
        url: myProvider.getFactoresRiesgo(),

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
            $scope.factoresRiesgo=[];



                $scope.factoresRiesgo=response.data;


        //    $scope.fac=$scope.empresas[0]._id;
            console.log($scope.factoresRiesgo);
            // console.log($scope.empresas);


        }


    }, function errorCallback(response) {
        console.log('entra');
        //  Console.log(response);
      //  $scope.selectedFactorRiesgo = response.mensaje;

    });

    // </editor-fold >



    $scope.FactorRiesgo=function(){


        if($scope.selectedFactorRiesgo!=undefined && $scope.selectedMaquinaria != "") {
            $scope.selectedFactorRiesgo=JSON.parse($scope.selectedFactorRiesgo);
            $scope.listaFactoresRiesgoSeleccionado.push($scope.selectedFactorRiesgo);

            var n = $scope.listaDetalleFactorRiesgo.length;
            var pos = "";
            for (var i = 0; i < n; i++) {

                if ($scope.listaDetalleFactorRiesgo[i]._id == $scope.selectedFactorRiesgo._id) {
                    pos = i;
                    break;
                }
            }
        //    console.log(pos);
            $scope.listaDetalleFactorRiesgo.splice(pos, 1);
            //$scope.maquinaria.cleanData(undefined);
          //  console.log($scope.listaSeleccionMaquinaria);
           // console.log($scope.maquinaria);
            $scope.selectedFactorRiesgo="";
            //$scope.maquinaria.removeItem($scope.selectedMaquinaria);
        }

    }
    $scope.FactorRiesgoSeleccionado=function(){


        if( $scope.selectedFactorRiesgo!=undefined && $scope.selectedFactorRiesgo != "") {
            $scope.selectedFactorRiesgo=JSON.parse($scope.selectedFactorRiesgo);
            $scope.listaDetalleFactorRiesgo.push($scope.selectedFactorRiesgo);
            // $scope.listaSeleccionMaquinaria.removeItem($scope.selectedMaquinaria._id);

            var n = $scope.listaFactoresRiesgoSeleccionado.length;
            var pos = "";
            for (var i = 0; i < n; i++) {

                if ($scope.listaFactoresRiesgoSeleccionado[i]._id == $scope.selectedFactorRiesgo._id) {
                    pos = i;
                    break;
                }
            }
          //  console.log(pos);
            $scope.listaFactoresRiesgoSeleccionado.splice(pos, 1);
            $scope.selectedFactorRiesgo="";
            // $scope.listaSeleccionMaquinaria.cleanData(undefined);
            //    console.log($scope.maquinaria);
            // console.log($scope.listaSeleccionMaquinaria);
        }

    }


    $scope.alimentosFunc=function(){


        if($scope.alimentoSeleccionado!=undefined && $scope.alimentoSeleccionado != "") {
            $scope.alimentoSeleccionado=JSON.parse($scope.alimentoSeleccionado);
            $scope.listaAlimentosSeleccionados.push($scope.alimentoSeleccionado);

            var n = $scope.alimentos.length;
            var pos = "";
            for (var i = 0; i < n; i++) {

                if ($scope.alimentos[i]._id == $scope.alimentoSeleccionado._id) {
                    pos = i;
                    break;
                }
            }
            //    console.log(pos);
            $scope.alimentos.splice(pos, 1);
            //$scope.maquinaria.cleanData(undefined);
            //  console.log($scope.listaSeleccionMaquinaria);
            // console.log($scope.maquinaria);
            $scope.alimentoSeleccionado="";
            //$scope.maquinaria.removeItem($scope.selectedMaquinaria);
        }

    }



    $scope.alimentosSeleccionadosFunc=function(){


        if( $scope.alimentoSeleccionado!=undefined && $scope.alimentoSeleccionado != "") {
            $scope.alimentoSeleccionado=JSON.parse($scope.alimentoSeleccionado);
            $scope.alimentos.push($scope.alimentoSeleccionado);
            // $scope.listaSeleccionMaquinaria.removeItem($scope.selectedMaquinaria._id);

            var n = $scope.listaAlimentosSeleccionados.length;
            var pos = "";
            for (var i = 0; i < n; i++) {

                if ($scope.listaAlimentosSeleccionados[i]._id == $scope.alimentoSeleccionado._id) {
                    pos = i;
                    break;
                }
            }
            //  console.log(pos);
            $scope.listaAlimentosSeleccionados.splice(pos, 1);
            $scope.alimentoSeleccionado="";
            // $scope.listaSeleccionMaquinaria.cleanData(undefined);
            //    console.log($scope.maquinaria);
            // console.log($scope.listaSeleccionMaquinaria);
        }

    }


    $scope.agregar=function(){

      //  $scope.riesgosOcupacionales.nombre_empresa=JSON.parse($scope.riesgosOcupacionales.nombre_empresa);
        $scope.riesgosOcupacionales.tipo_actividad=JSON.parse($scope.riesgosOcupacionales.tipo_actividad);
        $scope.riesgosOcupacionales.cualificacion=JSON.parse($scope.riesgosOcupacionales.cualificacion);
        $scope.riesgosOcupacionales.alimentos=$scope.listaAlimentosSeleccionados;
        $scope.riesgosOcupacionales.factores_riesgo=$scope.listaFactoresRiesgoSeleccionado;
        $scope.riesgosOcupacionales.cod=$scope.contador;
        $scope.contador++;
        $scope.listaRiesgosOcupacionales.push($scope.riesgosOcupacionales);


        $scope.riesgosOcupacionales={

            nombre_empresa : "",
            cargo_empresa:  "",
            actividades:  "",
            tipo_actividad: "",
            tiempo_anios_exposicion: "",
            factores_riesgo:  [],
            cualificacion: [],
            alimentos: [],
            sintomatologia_individual: "",
            sintomatologia_grupal: "",
            epp: "",

        }


        console.log($scope.riesgosOcupacionales);
    }

    $scope.quitar= function (){

        var n=  $scope.listaRiesgosOcupacionales.length;
        console.log(n);
        var pos;
        for(var i=0;i<n;i++ ){

            if($scope.listaRiesgosOcupacionales[i].cod==$scope.riesgosOcupacionalesSelected.cod){

                pos=i;
                break;
            }
        }
        console.log(pos);
        $scope.listaRiesgosOcupacionales.splice(pos,1);
        console.log($scope.listaRiesgosOcupacionales);
        console.log($scope.contador);
    }

    $scope.setClickedRow = function(index,item){  //function that sets the value of selectedRow to current index

       console.log('entra');
        $scope.selectedRow = index;
        $scope.riesgosOcupacionalesSelected=item;
        console.log($scope.riesgosOcupacionalesSelected);

        /*console.log($scope.selectedRow);
         console.log(item);*/
    }

    console.log( $scope.segundo);


    $scope.modificar = function () {

        // console.log($scope.historiaClinica);
        console.clear();
        console.log(JSON.parse(window.localStorage.getItem('pe')));
        console.log(JSON.parse(window.localStorage.getItem('hm')));

        console.log($scope.listaRiesgosOcupacionales);


        var n = $scope.listaRiesgosOcupacionales.length;

        for (var i = 0; i < n; i++) {
            var vec = [];
            // console.log($scope.historiaClinica.riesgosOcupacionales[i].factores_riesgo);
            var m = $scope.listaRiesgosOcupacionales[i].factores_riesgo.length;
            for (var j = 0; j < m; j++) {

                vec.push($scope.listaRiesgosOcupacionales[i].factores_riesgo[j]._id);

            }
            $scope.listaRiesgosOcupacionales[i].factores_riesgo = vec;


            vec = [];
            m = $scope.listaRiesgosOcupacionales[i].alimentos.length;
            for (var j = 0; j < m; j++) {

                vec.push($scope.listaRiesgosOcupacionales[i].alimentos[j]._id);

            }
            $scope.listaRiesgosOcupacionales[i].alimentos = vec;


            $http({
                method: 'POST',
                url: myProvider.getRiesgosOcupacionales(),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {

                    nombre_empresa: $scope.listaRiesgosOcupacionales[i].nombre_empresa._id,
                    cargo_empresa: $scope.listaRiesgosOcupacionales[i].cargo_empresa,
                    actividades: $scope.listaRiesgosOcupacionales[i].actividades,
                    tipo_actividad: $scope.listaRiesgosOcupacionales[i].tipo_actividad._id,
                    tiempo_anios_exposicion: $scope.listaRiesgosOcupacionales[i].tiempo_anios_exposicion,
                    factores_riesgo: $scope.listaRiesgosOcupacionales[i].factores_riesgo,
                    cualificacion: $scope.listaRiesgosOcupacionales[i].cualificacion._id,
                    alimentos: $scope.listaRiesgosOcupacionales[i].alimentos,
                    sintomatologia_individual: $scope.listaRiesgosOcupacionales[i].sintomatologia_individual,
                    sintomatologia_grupal: $scope.listaRiesgosOcupacionales[i].sintomatologia_grupal,
                    epp: $scope.listaRiesgosOcupacionales[i].epp
                }


            }).then(function successCallback(response) {
                //console.log(response.data);


                var hm = JSON.parse(window.localStorage.getItem('hm'));

                hm.riesgos_ocupacionales.push(response.data._id);

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


                        riesgos_ocupacionales: hm.riesgos_ocupacionales


                    }


                }).then(function successCallback(response) {
                    alert('Actulizado Corectamente')
                    $rootScope.primero = false;

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

            //  }

        }


    }



    $scope.nextSecond= function(){

       // console.log($scope.historiaClinica);
        console.clear();
        $scope.historiaClinica.riesgosOcupacionales=$scope.listaRiesgosOcupacionales;
        console.log($scope.historiaClinica.riesgosOcupacionales);
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        //window.location ='second.html';

        $rootScope.segundo=true;
        console.log($rootScope.segundo);

    }

    $scope.noAplica= function(){

        // console.log($scope.historiaClinica);

        $scope.historiaClinica.riesgosOcupacionales="No Aplica";
        console.log($scope.historiaClinica.riesgosOcupacionales);
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        //window.location ='second.html';

        $rootScope.segundo=true;
        console.log($rootScope.segundo);

    }

    $scope.skipt= function(){

        console.log($scope.historiaClinica);
        $scope.riesgosOcupacionales={

            nombre_empresa : "no aplica",
            cargo_empresa:  "",
            actividades:  "",
            tipo_actividad: "",
            tiempo_anios_exposicion: "",
            factores_riesgo:  [],
            cualificacion: [],
            alimentos: [],
            sintomatologia_individual: "",
            sintomatologia_grupal: "",
            epp: "",

        }
        $scope.listaRiesgosOcupacionales=[];
        $scope.listaRiesgosOcupacionales.push($scope.riesgosOcupacionales);
        $scope.historiaClinica.riesgosOcupacionales=$scope.listaRiesgosOcupacionales;
        console.log($scope.historiaClinica.riesgosOcupacionales);
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/second.html';
    }

    $scope.changeDetalleFactorRiesgo=function(){
    console.log(myProvider.getDetalleFactoresRiesgo()+'?id_factor_riesgo='+$scope.factorRiesgoSeleccionado);
       if( $scope.factorRiesgoSeleccionado!= undefined && $scope.factorRiesgoSeleccionado!=''){

            $scope.listaDetalleFactorRiesgo=[];
           $http({

               method: 'GET',
               url: myProvider.getDetalleFactoresRiesgo()+'?id_factor_riesgo='+$scope.factorRiesgoSeleccionado,

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
                   //$scope.factoresRiesgo=[];

                   for(var i=0;i<n;i++){

                       $scope.listaDetalleFactorRiesgo.push(response.data[i]);

                       // console.log($scope.empresas);
                   }
                   //    $scope.fac=$scope.empresas[0]._id;
                   //console.log($scope.factoresRiesgo);
                   // console.log($scope.empresas);


               }


           }, function errorCallback(response) {
               console.log('entra');
               //  Console.log(response);
               //  $scope.selectedFactorRiesgo = response.mensaje;

           });

       }

    }

}]);


app.controller('HistoriaClinicaUnido', ['$scope', '$http', '$location','myProvider','$localStorage','$rootScope',  function ($scope,$http,$location,myProvider,$localStorage,$rootScope) {

    $rootScope.primero = false;
    $rootScope.segundo=false;
    $rootScope.tercero=false;
    $rootScope.cuarto=false;
    $rootScope.quinto=false;
    $rootScope.sexto=false;
    $rootScope.septimo=false;
    $rootScope.octavo=false;
    $rootScope.noveno=false;
    $rootScope.decimo=false;
    $rootScope.once=false;
    $rootScope.doce=false;

    $rootScope.trece=false;


}]);

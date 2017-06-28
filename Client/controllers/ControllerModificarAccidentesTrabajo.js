/**
 * Created by xaipo on 11/6/2016.
 */
app.controller('ControllerModificarAccidentes', ['$scope', '$http', '$location', 'myProvider', '$localStorage', function ($scope, $http, $location, myProvider, $localStorage) {


    $scope.historiaClinica = '';

    $scope.listaAccidentesTrabajo=[];


    $scope.iniciar=function() {

        $scope.historiaClinica=JSON.parse(window.localStorage.getItem('hm'));
        console.log($scope.historiaClinica);
        var n = $scope.historiaClinica.accidentesTrabajo.length;
        $scope.listaAccidentesTrabajo=[];
        for (var i = 0; i < n; i++) {
            $http({

                method: 'GET',
                url: myProvider.getAccidentesTrabajo()+'?_id='+$scope.historiaClinica.accidentesTrabajo[i],

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

                        var aux=response.data[i]
                        aux.nombre_empresa={'nombre_empresa':aux.nombre_empresa};
                        $scope.listaAccidentesTrabajo.push(aux);
                         console.log($scope.listaAccidentesTrabajo);

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



        /*$scope.historiaCLinc={
            "_id" : "581fb2761bc3fc7c4a1b5320",
            "tipo_examen" : "56f956af407c173c08243c5c",
            "fecha_examen" : "11/06/2016",
            "concepto" : "A",
            "restricciones_limitaciones" : "asd",
            "recomendaciones" : "asd",
            "remision_especialista" : "S",
            "nombre_especialista" : "asdasd",
            "reubicacion" : "S",
            "estado" : 1,
            "diagnostico_noOcupacioanl" : ["581f3857ba03cd607011d41e"],
            "diagnostico_ocupacional" : ["581f3857ba03cd607011d41e"],
            "examen_fisico" : [],
            "examenes_paraclinicos" : [],
            "examenes_laboratorio" : [],
            "organos_sistemas" : [],
            "habitos_toxicos" : [],
            "inmunizacion" : ["581fb2761bc3fc7c4a1b5318"],
            "antescedentes_personales" : ["581fb2761bc3fc7c4a1b531a"],
            "antescedentes_familiares" : ["581fb2761bc3fc7c4a1b5317"],
            "enfermedades_actuales_historicas" : ["581fb2761bc3fc7c4a1b5316"],
            "ausentismo" : ["581fb2761bc3fc7c4a1b5315"],
            "gineco_obstetra" : [],
            "accidentesTrabajo" : ["581fb2761bc3fc7c4a1b5314"],
            "riesgos_ocupacionales" : ["581fb2761bc3fc7c4a1b5319"],
        }

        window.localStorage.setItem("hm", JSON.stringify($scope.historiaCLinc));*/





  //  $scope.listaAccidentesTrabajo=[];
    $scope.listaDetalleFactorRiesgo=[];
    $scope.accidentesTrabajo={
        codigo:"",
        fecha_ocurrencia:"" ,
        nombre_empresa:"",
        naturaleza_lesion:"",
        parte_cuerpo_afectada:"",
        dias_incapacidad:"",
        secuelas:""
    };
    $scope.accidentesTrabajoSelected="";

    $scope.contador=0;
    $scope.mapAccidentesTrabajo= new Map();

    $scope.empresas;

    $scope.getHistoria= function(){

        $scope.historiaClinica=JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

    }


    $scope.agregar= function (){


        $scope.accidentesTrabajo.fecha_ocurrencia= document.getElementById(('datepicker')).value;
        $scope.accidentesTrabajo.nombre_empresa= JSON.parse($scope.accidentesTrabajo.nombre_empresa);
        $scope.accidentesTrabajo.codigo=$scope.contador;
        $scope.contador++;

        //$scope.mensaje = "Para ingresar debe llenar el nombre de la empresa";

        //
        $http({
            method: 'POST',
            url: myProvider.getAccidentesTrabajo(),
            headers: {
                'Content-Type': 'application/json'
            },
            data: {

                fecha_ocurrencia : $scope.accidentesTrabajo.fecha_ocurrencia,
                nombre_empresa:  $scope.accidentesTrabajo.nombre_empresa.nombre_empresa,
                naturaleza_lesion:  $scope.accidentesTrabajo.naturaleza_lesion,
                parte_cuerpo_afectada: $scope.accidentesTrabajo.parte_cuerpo_afectada,
                dias_incapcidad: $scope.accidentesTrabajo.dias_incapcidad,
                secuelas:  $scope.accidentesTrabajo.secuelas
            }


        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.historiaClinica.accidentesTrabajo.push(response.data._id);
            var aux2=response.data;
            aux2.nombre_empresa={"nombre_empresa":aux2.nombre_empresa};
            $scope.listaAccidentesTrabajo.push(aux2);

            console.log( $scope.historiaClinica.accidentesTrabajo);
            window.localStorage.setItem("hm", JSON.stringify( $scope.historiaClinica));

            $http({
                method: 'PUT',
                url: myProvider.getHistoriaClinica() + '/' + $scope.historiaClinica._id,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    accidentesTrabajo:  $scope.historiaClinica.accidentesTrabajo

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












        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            // console.log(response);
            //$scope.mesaje = response.mensaje;

        });
       // console.log($scope.listaAccidentesTrabajo);
        //$scope.mapAccidentesTrabajo.set($scope.accidentesTrabajo.codigo,$scope.accidentesTrabajo);
        // console.log($scope.mapAccidentesTrabajo.entries());
        $scope.accidentesTrabajo={
            codigo:"",
            fecha_ocurrencia:"" ,
            nombre_empresa:"",
            naturaleza_lesion:"",
            parte_cuerpo_afectada:"",
            dias_incapacidad:"",
            secuelas:""
        };
        //console.log($scope.mapAccidentesTrabajo);


        $scope.iniciar();

    }


    $scope.quitar= function (){
        console.log($scope.accidentesTrabajoSelected);
        var n=  $scope.listaAccidentesTrabajo.length;
        console.log(n);
        var pos;
        for(var i=0;i<n;i++ ){

            if($scope.listaAccidentesTrabajo[i].codigo==$scope.accidentesTrabajoSelected.codigo){
                console.log(i);
                console.log($scope.accidentesTrabajoSelected.codigo);
                console.log($scope.listaAccidentesTrabajo[i].codigo);

                pos=i;
                break;
            }
        }
        console.log(pos);
        $scope.listaAccidentesTrabajo.splice(pos,1);
        //  console.log($scope.listaRiesgosOcupacionales);
        //  console.log($scope.contador);
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



    $scope.setClickedRow = function(index,item){  //function that sets the value of selectedRow to current index

        console.log('entra');
        $scope.selectedRow = index;
        $scope.accidentesTrabajoSelected=item;
        console.log(item);
        console.log($scope.accidentesTrabajoSelected);

        /*console.log($scope.selectedRow);
         console.log(item);*/
    }


    $scope.saveThird= function (){


        $scope.historiaClinica.accidentesTrabajo=$scope.listaAccidentesTrabajo;
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/third.html';



    }
    $scope.skipt2= function (){


        $scope.accidentesTrabajo={
            codigo:"",
            fecha_ocurrencia:"" ,
            nombre_empresa:"",
            naturaleza_lesion:"no aplica",
            parte_cuerpo_afectada:"",
            dias_incapacidad:"",
            secuelas:""
        };

        $scope.listaAccidentesTrabajo=[];
        $scope.listaAccidentesTrabajo.push($scope.accidentesTrabajo);
        $scope.historiaClinica.accidentesTrabajo=$scope.listaAccidentesTrabajo;
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/third.html';



    }


    $scope.volver=function(){

        window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/modificar/inicioModificar.html'
    }
} ]);

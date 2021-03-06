/**
 * Created by xaipo on 8/8/2016.
 */
app.controller('HistoriaClinicaFourth', ['$scope', '$http', '$location','myProvider','$localStorage','$rootScope',  function ( $scope,$http,$location,myProvider,$localStorage,$rootScope) {


    $scope.bus1='';
    $scope.bus2='';
    $scope.tipoCie10=[];
    $scope.cie10Selected;
    $scope.cie10Select='';
    $scope.seleccionada;
    $scope.encontrada="";
    $scope.cie10=[];
    $scope.listaCie10Selecionada=[];
    $scope.selectedRow;
    $scope.seleccionadaCieQuitar;
    $scope.contador=0;
    $scope.antecedentesHistoricos={
        codigo:'',
        sintoma_cie10:'',
        fecha:''
    }




    $scope.getHistoria= function(){

        $scope.historiaClinica=JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

    }

    $http({

        method: 'GET',
        url: myProvider.getTipoCie10(),

        headers: {
            'Content-Type': 'application/json'
        }

    }).then(function successCallback(response) {
        //console.log('entra url');
        //console.log(url);

        var n = response.data.length;
        // console.log(n);

        if(n==0){

            alert('no se encontro el paciente');

        }else {
            //  $scope.tipoCie10=[];
            for(var i=0;i<n;i++){

                $scope.tipoCie10.push(response.data[i]);
                // console.log($scope.tipoCie10);

            }
            //$scope.cie10Selected=response.data[0];
           // $scope.busquedaCie10Tipo();

        }


    }, function errorCallback(response) {
        console.log('entra');
        //  Console.log(response);
        $scope.mesaje = response.mensaje;

    });


    $scope.busquedaCie10Tipo=function()
    {
        console.log($scope.cie10Selected);
        if($scope.cie10Selected!=undefined) {

            $scope.cie10Selected =JSON.parse($scope.cie10Selected);
            $http({

                method: 'GET',
                url: myProvider.getCie10() + "?tipo_cie10=" + $scope.cie10Selected._id,

                headers: {
                    'Content-Type': 'application/json'
                }

            }).then(function successCallback(response) {
                //console.log('entra url');
                //console.log(url);

                var n = response.data.length;
                 console.log(response.data);

                if (n == 0) {

                    alert('no se encontro el paciente');

                } else {
                    $scope.cie10 = [];
                    for (var i = 0; i < n; i++) {


                        $scope.cie10.push(response.data[i]);
                        if($scope.cie10[i].estado==1){
                            $scope.cie10[i].estado="activado";
                        }else{

                            $scope.cie10[i].estado="desactivado";
                        }
                        //  console.log($scope.tipoCie10);

                    }


                }


            }, function errorCallback(response) {
                console.log('entra');
                //  Console.log(response);
                $scope.mesaje = response.mensaje;

            });
        }
    }



    $scope.busquedaPorCodigoPropio= function(){

        console.log("entragunc");


        if($scope.seleccionada!=undefined&&$scope.seleccionada!='') {
            $scope.seleccionada=$scope.seleccionada.toUpperCase();
           // $scope.selecc =JSON.parse($scope.seleccionada);
          //  console.log(myProvider.getCie10() + "?codigo_cie10=" + $scope.seleccionada);
            $http({

                method: 'GET',
                url: myProvider.getCie10() + "?codigo_cie10=" + $scope.seleccionada,

                headers: {
                    'Content-Type': 'application/json'
                }

            }).then(function successCallback(response) {
                //console.log('entra url');
                //console.log(url);

                var n = response.data.length;
                // console.log(n);

                if (n == 0) {

                    alert('no se encontro el c�digo ingresado');
                    $scope.encontrada='';
                } else {
                   // $scope.seleccionada = '';
                    for (var i = 0; i < n; i++) {


                        $scope.encontrada=(response.data[i]);
                        if($scope.encontrada.estado==1){
                            $scope.encontrada.estado="activado";
                        }else{

                            $scope.encontrada.estado="desactivado";
                        }
                        //  console.log($scope.tipoCie10);

                    }


                }


            }, function errorCallback(response) {
                console.log('entra');
                //  Console.log(response);
               // $scope.mesaje = response.mensaje;

            });
        }
    }




    $scope.agregar=function(){

        $scope.antecedentesHistoricos.fecha = document.getElementById('datepicker1').value;
        if($scope.encontrada!='' &&  $scope.antecedentesHistoricos.fecha!='' &&  $scope.antecedentesHistoricos.fecha!=undefined)
        {

            $scope.antecedentesHistoricos.sintoma_cie10=$scope.encontrada;
            $scope.antecedentesHistoricos.codigo=$scope.contador;
            $scope.contador++;
            console.log($scope.antecedentesHistoricos);
            console.log($scope.encontrada);
            $scope.listaCie10Selecionada.push($scope.antecedentesHistoricos);
            console.log('lista'+$scope.listaCie10Selecionada);
            $scope.encontrada="";
            $scope.antecedentesHistoricos={
                codigo:'',
                sintoma_cie10:'',
                fecha:''
            }

        }else{
            console.log( JSON.parse($scope.cie10Select));

            if($scope.cie10Select=="" || $scope.cie10Select==undefined ||  $scope.antecedentesHistoricos.fecha=='' ||  $scope.antecedentesHistoricos.fecha==undefined){

               alert('Seleccione una enfermedad de la lista o busquela por c�digo');

            }else{
                $scope.antecedentesHistoricos.sintoma_cie10=JSON.parse($scope.cie10Select);
                $scope.antecedentesHistoricos.codigo=$scope.contador;
                $scope.contador++;
               // $scope.antecedentesHistoricos.fecha=document.getElementById('datepicker').value;
                console.log($scope.antecedentesHistoricos);
                $scope.listaCie10Selecionada.push($scope.antecedentesHistoricos);
                console.log($scope.listaCie10Selecionada);

                $scope.antecedentesHistoricos={
                    codigo:'',
                    sintoma_cie10:'',
                    fecha:''
                }
            }

        }

    }


    $scope.setClickedRow = function(index,item){  //function that sets the value of selectedRow to current index

        console.log('entra');
        $scope.selectedRow = index;
        $scope.seleccionadaCieQuitar=item;
       console.log(item);
       // console.log($scope.accidentesTrabajoSelected);

        /*console.log($scope.selectedRow);
         console.log(item);*/
    }


    $scope.quitar= function (){
       // console.log($scope.accidentesTrabajoSelected);
        var n=  $scope.listaCie10Selecionada.length;
        console.log($scope.seleccionadaCieQuitar);
        var pos;
        for(var i=0;i<n;i++ ){

            if($scope.listaCie10Selecionada[i].codigo==$scope.seleccionadaCieQuitar.codigo){


                pos=i;
                break;
            }
        }
        console.log(pos);
        $scope.listaCie10Selecionada.splice(pos,1);
        //  console.log($scope.listaRiesgosOcupacionales);
        //  console.log($scope.contador);
    }



    $scope.saveFourth=function(){

        console.clear();

        $scope.historiaClinica = JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);


        $scope.historiaClinica.enfermedades_actuales_historicas=$scope.listaCie10Selecionada;
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
       // window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/fiveth.html';


        $rootScope.cuarto=true;

    }

    $scope.noAplica=function(){


        $scope.historiaClinica.enfermedades_actuales_historicas="No Aplica";
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        // window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/fiveth.html';

        $rootScope.cuarto=true;
    }

    $scope.skipt3=function(){



        $scope.historiaClinica.enfermedades_actuales_historicas=$scope.listaCie10Selecionada;
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/forth.html';
    }


    $scope.modificar = function () {










        // console.log($scope.historiaClinica);
        console.clear();
        console.log(JSON.parse(window.localStorage.getItem('pe')));
        console.log(JSON.parse(window.localStorage.getItem('hm')));

        console.log($scope.listaAccidentesTrabajo);


        $scope.historiaClinica.enfermedades_actuales_historicas = $scope.listaCie10Selecionada;


        var n = $scope.historiaClinica.enfermedades_actuales_historicas.length;
        // console.log($scope.historiaClinica.ginecoObstetra);
        // console.log($scope.historiaClinica);
        for (var i = 0; i < n; i++) {

            // console.log( $scope.historiaClinica.ginecoObstetra[i].metodos_planificacion_familiar);


            $http({
                method: 'POST',
                url: myProvider.getEnfermedadesActualesHistoricas(),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {

                    sintomas_cie10: $scope.historiaClinica.enfermedades_actuales_historicas[i].sintoma_cie10._id,
                    fecha: $scope.historiaClinica.enfermedades_actuales_historicas[i].fecha,
                }


            }).then(function successCallback(response) {
                //console.log(response.data);

                var hm = JSON.parse(window.localStorage.getItem('hm'));

                hm.enfermedades_actuales_historicas.push(response.data._id);

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


                        enfermedades_actuales_historicas: hm.enfermedades_actuales_historicas


                    }


                }).then(function successCallback(response) {
                    alert('Actulizado Corectamente')
                    $rootScope.tercero = false;

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
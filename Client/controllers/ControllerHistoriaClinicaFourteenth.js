/**
 * Created by xaipo on 9/28/2016.
 */
app.controller('HistoriaClinicaControllerFourteenth', ['$scope', '$http', '$location','myProvider','$localStorage','$rootScope',  function ($scope,$http,$location,myProvider,$localStorage,$rootScope) {


    $scope.lista_paraclinicos_seleccionados=[];
    $scope.examenes=[];
    $scope.resultados=[];
    $scope.examenQuitar;
    $scope.paraclinico_seleccionado={
        codigo:'',
        resultado:'',
        fecha:'',
        observacion:''

    }
    $scope.selectedExamen='';
    $scope.observacion_paraclinicos = {};
    $scope.getHistoria = function () {

        $scope.historiaClinica = JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

    }

    $http({

        method: 'GET',
        url: myProvider.getExamenesParclinicos(),

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


    $scope.charge_resultado=function(){



        if($scope.selectedExamen!=''&&$scope.selectedExamen!=undefined){
            //console.log($scope.tipoSelected);
            $scope.selectedExamen=JSON.parse($scope.selectedExamen);
            $http({

                method: 'GET',
                url: myProvider.getResultadoExamenesParclinicos()+"?examen="+$scope.selectedExamen._id,

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
                    $scope.resultados=[];

                    for(var i=0;i<n;i++){

                        $scope.resultados.push(response.data[i]);

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
        $scope.examenQuitar=item;
        // console.log(item);
        // console.log($scope.accidentesTrabajoSelected);

        /*console.log($scope.selectedRow);
         console.log(item);*/
    }



    $scope.agregar = function(){

        $scope.paraclinico_seleccionado.fecha=document.getElementById('datepicker').value;

        //  console.log($scope.selectRevision);
        $scope.paraclinico_seleccionado.codigo=$scope.contador++;
        $scope.paraclinico_seleccionado.resultado=JSON.parse($scope.paraclinico_seleccionado.resultado);
        // $scope.selectRevision.codigo=$scope.contador++;

        $scope.lista_paraclinicos_seleccionados.push($scope.paraclinico_seleccionado);
        $scope.paraclinico_seleccionado={
            codigo:'',
            resultado:'',
            fecha:'',
            observacion:''

        }


    }

    $scope.quitar= function (){
        // console.log($scope.accidentesTrabajoSelected);
        var n=  $scope.lista_paraclinicos_seleccionados.length;
        console.log(n);
        var pos;
        for(var i=0;i<n;i++ ){


            if($scope.lista_paraclinicos_seleccionados[i].codigo==$scope.examenQuitar.codigo){
                console.log('entra');

                pos=i;
                break;
            }
        }
        console.log(pos);
        $scope.lista_paraclinicos_seleccionados.splice(pos,1);
        //  console.log($scope.listaRiesgosOcupacionales);
        //  console.log($scope.contador);
    }


    $scope.saveFourteen= function(){
        console.clear();
        $scope.historiaClinica = JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

        
      //  console.log($scope.lista_paraclinicos_seleccionados);
        $scope.historiaClinica.examenes_paraclinicos=$scope.lista_paraclinicos_seleccionados;
        $scope.historiaClinica.observacion_paraclinicos=$scope.observacion_paraclinicos;
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
       // console.log($scope.historiaClinica);
      // window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/fiveteenth.html';
        $rootScope.trece=true;
    }


    $scope.noAplica= function(){
        //  console.log($scope.lista_paraclinicos_seleccionados);
        $scope.historiaClinica.examenes_paraclinicos="No Aplica";
        $scope.historiaClinica.observacion_paraclinicos="No Aplica";
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        // console.log($scope.historiaClinica);
        // window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/fiveteenth.html';
        $rootScope.trece=true;
    }

    $scope.modificar = function () {










        // console.log($scope.historiaClinica);
        console.clear();
        console.log(JSON.parse(window.localStorage.getItem('pe')));
        console.log(JSON.parse(window.localStorage.getItem('hm')));

        console.log($scope.listaAccidentesTrabajo);


        $scope.historiaClinica.examenes_paraclinicos = $scope.lista_paraclinicos_seleccionados;
        $scope.historiaClinica.observacion_paraclinicos = $scope.observacion_paraclinicos;


        var n = $scope.historiaClinica.examenes_paraclinicos.length;
        // console.log($scope.historiaClinica.ginecoObstetra);
        // console.log($scope.historiaClinica);
        for (var i = 0; i < n; i++) {
            $http({
                method: 'POST',
                url: myProvider.getParaclinico(),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {

                    observacion: $scope.historiaClinica.examenes_paraclinicos[i].observacion,
                    respuesta_examen_paraclinico: $scope.historiaClinica.examenes_paraclinicos[i].resultado._id,
                    fecha: $scope.historiaClinica.examenes_paraclinicos[i].fecha
                }


            }).then(function successCallback(response) {
                //console.log(response.data);

                var hm = JSON.parse(window.localStorage.getItem('hm'));

                hm.examenes_paraclinicos.push(response.data._id);

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


                        examenes_paraclinicos: hm.examenes_paraclinicos


                    }


                }).then(function successCallback(response) {
                    alert('Actulizado Corectamente')
                    $rootScope.doce = false;

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
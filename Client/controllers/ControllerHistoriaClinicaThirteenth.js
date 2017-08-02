/**
 * Created by xaipo on 9/27/2016.
 */
app.controller('HistoriaClinicaControllerThirteenth', ['$scope', '$http', '$location','myProvider','$localStorage','$rootScope',  function ($scope,$http,$location,myProvider,$localStorage,$rootScope) {


    $scope.examenes=[];
    $scope.listaExamenes=[];
    $scope.examen={

        codigo:'',
        examen:'',
        normal_anormal:'',
        fecha:'',
        observacion:''

    };
    $scope.contador=0;
    $scope.examenQuitar='';

    $scope.getHistoria = function () {

        $scope.historiaClinica = JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

    }


    $http({

        method: 'GET',
        url: myProvider.getExamenesLaboratorio(),

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

         $scope.examen.fecha=document.getElementById('datepicker').value;

        //  console.log($scope.selectRevision);
        $scope.examen.codigo=$scope.contador++;
        $scope.examen.examen=JSON.parse($scope.examen.examen);
        // $scope.selectRevision.codigo=$scope.contador++;

        $scope.listaExamenes.push($scope.examen);
        $scope.examen={

            codigo:'',
            examen:'',
            normal_anormal:'',
            fecha:'',
            observacion:''

        };


    }

    $scope.quitar= function (){
        // console.log($scope.accidentesTrabajoSelected);
        var n=  $scope.listaExamenes.length;
        console.log(n);
        var pos;
        for(var i=0;i<n;i++ ){


            if($scope.listaExamenes[i].codigo==$scope.examenQuitar.codigo){
                console.log('entra');

                pos=i;
                break;
            }
        }
        console.log(pos);
        $scope.listaExamenes.splice(pos,1);
        //  console.log($scope.listaRiesgosOcupacionales);
        //  console.log($scope.contador);
    }


    $scope.saveThirteen= function(){

        console.clear();
        $scope.historiaClinica = JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

        $scope.historiaClinica.examenes_laboratorio=$scope.listaExamenes;
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
       // window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/fourteenth.html';
        $rootScope.doce=true;
    }


    $scope.noAplica= function(){

        $scope.historiaClinica.examenes_laboratorio="No Aplica";
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        // window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/fourteenth.html';
        $rootScope.doce=true;
    }


    $scope.modificar = function () {










        // console.log($scope.historiaClinica);
        console.clear();
        console.log(JSON.parse(window.localStorage.getItem('pe')));
        console.log(JSON.parse(window.localStorage.getItem('hm')));

        console.log($scope.listaAccidentesTrabajo);


        $scope.historiaClinica.examenes_laboratorio = $scope.listaExamenes;


        var n = $scope.historiaClinica.examenes_laboratorio.length;
        // console.log($scope.historiaClinica.ginecoObstetra);
        // console.log($scope.historiaClinica);
        for (var i = 0; i < n; i++) {
            $http({
                method: 'POST',
                url: myProvider.getExamenesPracticados(),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {

                    observacion: $scope.historiaClinica.examenes_laboratorio[i].observacion,
                    examen: $scope.historiaClinica.examenes_laboratorio[i].examen._id,
                    normal_anormal: $scope.historiaClinica.examenes_laboratorio[i].normal_anormal,
                    fecha: $scope.historiaClinica.examenes_laboratorio[i].fecha,
                }


            }).then(function successCallback(response) {
                //console.log(response.data);


                var hm = JSON.parse(window.localStorage.getItem('hm'));

                hm.examenes_laboratorio.push(response.data._id);

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


                        examenes_laboratorio: hm.examenes_laboratorio


                    }


                }).then(function successCallback(response) {
                    alert('Actulizado Corectamente')
                    $rootScope.once = false;

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
/**
 * Created by xaipo on 9/27/2016.
 */
app.controller('HistoriaClinicaControllerThirteenth', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {


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

        $scope.historiaClinica.examenes_laboratorio=$scope.listaExamenes;
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/fourteenth.html';
    }
}]);
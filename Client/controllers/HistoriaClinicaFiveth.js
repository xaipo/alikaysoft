/**
 * Created by xaipo on 8/15/2016.
 */
app.controller('HistoriaClinicaFiveth', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {


    $scope.historiaClinica;
    $scope.ausentismo={
            codigo:'',
            causa:'',
            tiempo:''


    }
    $scope.listaAusentismo=[];
    $scope.contador=0,
        $scope.selectedQuitar;






    $scope.agregar = function(){

        if($scope.ausentismo.causa!=''&&$scope.ausentismo.causa!=undefined&&$scope.ausentismo.tiempo!=''&&$scope.ausentismo.tiempo!=undefined){
            $scope.ausentismo.codigo=$scope.contador++;
            $scope.ausentismo.tiempo;
            $scope.listaAusentismo.push($scope.ausentismo);
            $scope.ausentismo={
                codigo:'',
                causa:'',
                tiempo:''


            }
        }else{
            alert('Ingrese Valores y la Causa del Ausentismo para agregar a la lista');

        }
    }

    $scope.quitar= function (){
        // console.log($scope.accidentesTrabajoSelected);
        var n=  $scope.listaAusentismo.length;
        console.log(n);
        var pos;
        for(var i=0;i<n;i++ ){

            if($scope.listaAusentismo[i].codigo==$scope.selectedQuitar.codigo){


                pos=i;
                break;
            }
        }
        console.log(pos);
        $scope.listaAusentismo.splice(pos,1);
        //  console.log($scope.listaRiesgosOcupacionales);
        //  console.log($scope.contador);
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
    $scope.getHistoria= function(){

        $scope.historiaClinica=JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

    }

    $scope.saveFive=function(){


        $scope.historiaClinica.ausentismo=$scope.listaAusentismo;
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/fiveth.html';
    }
}]);
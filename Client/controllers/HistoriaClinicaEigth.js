/**
 * Created by xaipo on 9/5/2016.
 */
app.controller('HistoriaClinicaEigth', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {


    $scope.tiposistemaSelected;
    $scope.tiposSistema=[];
    $scope.listaRevision=[];
    $scope.revision_sistemas=[];
    $scope.contador=0;
    $scope.selectTipo='';
    $scope.search1;
    $scope.selectRevision='';
    $scope.selectedQuitar='';
    $scope.historiaClinica
    $http({

        method: 'GET',
        url: myProvider.getTipoRevisionSistemas(),

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
            $scope.tiposSistema=[];

            for(var i=0;i<n;i++){

                $scope.tiposSistema.push(response.data[i]);

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






    $scope.getHistoria= function(){

        $scope.historiaClinica=JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

    }

    $scope.buscar= function (){


        if($scope.selectTipo!=undefined&&$scope.selectTipo!='')
        {
            $scope.selectTipo=JSON.parse($scope.selectTipo);
            console.log(myProvider.getTipoRevisionSistemas() + '?_id=' + $scope.selectTipo._id);
            $http({

                method: 'GET',
                url: myProvider.RevisionSistemas() + '?tipo_sistema=' + $scope.selectTipo._id,

                headers: {
                    'Content-Type': 'application/json'
                }

            }).then(function successCallback(response) {
                //console.log('entra url');
                //console.log(url);

                var n = response.data.length;
                // console.log(n);

                if (n == 0) {

                    alert('no se encontro provincias');

                } else {
                    $scope.listaRevision = [];

                    for (var i = 0; i < n; i++) {

                        $scope.listaRevision.push(response.data[i]);

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

        if($scope.selectRevision!=''&&$scope.selectRevision!=undefined){
            console.log($scope.selectRevision);
            $scope.selectRevision=JSON.parse($scope.selectRevision);
           // $scope.selectRevision.codigo=$scope.contador++;

            $scope.revision_sistemas.push($scope.selectRevision);
            $scope.selectRevision=''

        }else{
            alert('Elija un valor para agregar');

        }
    }

    $scope.quitar= function (){
        // console.log($scope.accidentesTrabajoSelected);
        var n=  $scope.revision_sistemas.length;
        console.log(n);
        var pos;
        for(var i=0;i<n;i++ ){

            if($scope.revision_sistemas[i]._id==$scope.selectedQuitar._id){


                pos=i;
                break;
            }
        }
        console.log(pos);
        $scope.revision_sistemas.splice(pos,1);
        //  console.log($scope.listaRiesgosOcupacionales);
        //  console.log($scope.contador);
    }

    $scope.saveEigth= function(){

        $scope.historiaClinica.revision_sistemas=$scope.revision_sistemas;
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/nineth.html';
    }
}]);
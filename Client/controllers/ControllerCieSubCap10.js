/**
 * Created by xaipo on 7/25/2017.
 */
app.controller('ControllerNewCieCap10', ['$scope', '$http', '$location', 'myProvider', '$localStorage', function ($scope, $http, $location, myProvider, $localStorage) {

    $scope.listCap=[];
    $scope.listCap2=[];
    $scope.selectCap='';
    $scope.sub_capitulo = {
        descripcion: '',
        estado: ''
    }
    $scope.capituloSelect='';
    $scope.iniciar = function () {

        console.log(myProvider.getCapituloCie()+'?estado=activo');
        $http({

            method: 'GET',
            url: myProvider.getCapituloCie()+'?estado=activo',

            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function successCallback(response) {
            //console.log('entra url');
            //console.log(url);
            $scope.listCap = response.data;
            console.log($scope.listCap);


        }, function errorCallback(response) {
            console.log('entra');
            //  Console.log(response);
            $scope.mesaje = response.mensaje;

        });

    }



    $scope.loadSubGroup=function () {
        if($scope.selectCap!=''&& $scope.selectCap!=undefined){
            $scope.selectCap1=JSON.parse($scope.selectCap);

            $http({

                method: 'GET',
                url: myProvider.getTipoCie10()+'?capitulo='+$scope.selectCap1._id,

                headers: {
                    'Content-Type': 'application/json'
                }

            }).then(function successCallback(response) {
                //console.log('entra url');
                //console.log(url);
                $scope.listCap2 = response.data;
                console.log($scope.listCap2);


            }, function errorCallback(response) {
                console.log('entra');
                //  Console.log(response);
                $scope.mesaje = response.mensaje;

            });

        }

    }

    $scope.input=function(){

        if ($scope.sub_capitulo.descripcion != undefined && $scope.sub_capitulo.codigo != '') {
            $scope.selectCap1=JSON.parse($scope.selectCap);
            $scope.sub_capitulo.estado = 'activo';

            $http({
                method: 'POST',
                url: myProvider.getTipoCie10(),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    capitulo:$scope.selectCap1._id,
                    descripcion_tipo_CIE10: $scope.sub_capitulo.descripcion,
                    estado: $scope.sub_capitulo.estado

                }
            }).then(function successCallback(response) {

                alert('Ingreso Correcto ');
                $scope.loadSubGroup();
                $scope.sub_capitulo = {
                    descripcion: '',
                    estado: ''
                }
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                // console.log(response);
                alert('Error al ingresar');
                // console.log(response);
                //$scope.mesaje = response.mensaje;

            });

        }
        else {

            alert('Ingrese los campos codigo y descripcion');
        }
    }

    $scope.changeState=function (){

        if($scope.capituloSelect.estado=='activo'){

            $http({
                method: 'PUT',
                url: myProvider.getTipoCie10()+"/"+$scope.capituloSelect._id,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    estado:'inactivo'
                }


            }).then(function successCallback(response) {
                $scope.loadSubGroup();
                //console.log(newEstadoCie10);

            }, function errorCallback(response) {
                // console.log(response);

            });

        }else{

            $http({
                method: 'PUT',
                url: myProvider.getTipoCie10()+"/"+$scope.capituloSelect._id,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    estado:'activo'
                }


            }).then(function successCallback(response) {
                $scope.loadSubGroup();
                //console.log(newEstadoCie10);

            }, function errorCallback(response) {
                // console.log(response);

            });

        }
    }

    $scope.setClickedRow = function (index, item) {  //function that sets the value of selectedRow to current index
        $scope.selectedRow = index;
        $scope.capituloSelect = item;


        /*console.log($scope.selectedRow);
         console.log(item);*/
    }
}]);
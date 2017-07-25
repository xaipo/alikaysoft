/**
 * Created by xaipo on 11/6/2016.
 */
app.controller('ControllerNewCie10', ['$scope', '$http', '$location', 'myProvider', '$localStorage', function ($scope, $http, $location, myProvider, $localStorage) {

    $scope.listCap = [];
    $scope.capituloSelect;
    $scope.selectedRow;
    $scope.capitulo = {
        codigo: '',
        descripcion: '',
        estado: ''
    }


    $scope.iniciar = function () {
        $http({

            method: 'GET',
            url: myProvider.getCapituloCie(),

            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function successCallback(response) {
            //console.log('entra url');
            //console.log(url);
            $scope.listCap = response.data;
            //console.log($scope.listCap);


        }, function errorCallback(response) {
            console.log('entra');
            //  Console.log(response);
            $scope.mesaje = response.mensaje;

        });

    }
    $scope.iniciarCapitulos = function () {
        $http({

            method: 'GET',
            url: myProvider.getCapituloCie(),

            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function successCallback(response) {
            //console.log('entra url');
            //console.log(url);
            $scope.listCap = response.data;
           // console.log($scope.listCap);


        }, function errorCallback(response) {
            console.log('entra');
            //  Console.log(response);
            $scope.mesaje = response.mensaje;

        });

    }

    // $scope.selectedRow = null;  // initialize our variable to null
    $scope.setClickedRow = function (index, item) {  //function that sets the value of selectedRow to current index
        $scope.selectedRow = index;
        $scope.capituloSelect = item;


        /*console.log($scope.selectedRow);
         console.log(item);*/
    }


    $scope.inputCapitulo = function () {

        if ($scope.capitulo.codigo != '' && $scope.capitulo.codigo != undefined && $scope.capitulo.descripcion != undefined && $scope.capitulo.codigo != '') {

            $scope.capitulo.estado = 'activo';

            $http({
                method: 'POST',
                url: myProvider.getCapituloCie(),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {

                    codigo_capitulo: $scope.capitulo.codigo,
                    descripcion: $scope.capitulo.descripcion,
                    estado: $scope.capitulo.estado

                }
            }).then(function successCallback(response) {

                alert('Ingreso Correcto ');
                $scope.iniciarCapitulos();

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


    $scope.changeStateCapitulo=function () {
        if($scope.capituloSelect.estado=='activo'){

            $http({
                method: 'PUT',
                url: myProvider.getCapituloCie()+"/"+$scope.capituloSelect._id,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    estado:'inactivo'
                }


            }).then(function successCallback(response) {
                $scope.iniciarCapitulos();
                //console.log(newEstadoCie10);

            }, function errorCallback(response) {
               // console.log(response);

            });

        }else{

            $http({
                method: 'PUT',
                url: myProvider.getCapituloCie()+"/"+$scope.capituloSelect._id,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    estado:'activo'
                }


            }).then(function successCallback(response) {
                $scope.iniciarCapitulos();
                //console.log(newEstadoCie10);

            }, function errorCallback(response) {
               // console.log(response);

            });

        }


    }
}]);
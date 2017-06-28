/**
 * Created by xaipo on 11/21/2015.
 */


app.controller('EmpresaController', ['$scope', '$http', function ($scope, $http) {
    $scope.mensaje = "";
    $scope.listaEmpresas=[];
    $scope.empresaSelected="";
    $scope.nuevaEmpresa="";
    $scope.search;
    $scope.search1;
    $scope.listaDependencias=[];

// <editor-fold defaultstate="collapsed" desc="Inicializar">

    $http({
            method: 'GET',
            url: 'http://localhost:3000/api/empresa',
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
           // console.log(response);
            var n=response.data.length;
         //   console.log(response.data.length);
            for(var i=0; i<n; i++){
                var aux=response.data[i];
               // console.log(aux);
                $scope.listaEmpresas.push(aux);

               // console.log($scope.listaEmpresas);

            }


        }, function errorCallback(response) {

            Console.log(response);
            $scope.mesaje=response.mensaje;

        });
// </editor-fold >

    $scope.test = function () {
        $scope.mensaje = "procesando";

        console.log('entro');
        $scope.empresaSelected=JSON.parse($scope.empresaSelected);
        console.log($scope.empresaSelected.nombre_empresa);

    };

    $scope.inputEmpresa=function(){
        $scope.mensaje = "procesando";
        if($scope.nuevaEmpresa!="") {
            $http({
                method: 'POST',
                url: 'http://localhost:3000/api/empresa',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {nombre_empresa: $scope.nuevaEmpresa}

            }).then(function successCallback(response) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:3000/api/empresa',
                    headers: {
                        'Content-Type': 'application/json'
                    }

                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    $scope.listaEmpresas = [];
                   // console.log(response);
                    n = response.data.length;
                //    console.log(response.data.length);
                    for (var i = 0; i < n; i++) {
                        var aux = response.data[i];
                     //   console.log(aux);
                        $scope.listaEmpresas.push(aux);

                   //     console.log($scope.listaEmpresas);

                    }
                    $scope.mensaje = "Ingresado Correctamente"
                    $scope.nuevaEmpresa = "";

                }, function errorCallback(response) {

                  //  Console.log(response);
                    $scope.mesaje = response.mensaje;

                });

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                Console.log(response);
                $scope.mesaje = response.mensaje;

            });
        }else{
            $scope.mensaje = "Para ingresar debe llenar el nombre de la empresa";

        }

    };


    $scope.searchDependenciaPorEmpresa = function () {

        $scope.mensaje = "procesando";

        if($scope.empresaSelected.length>0) {
            $scope.listaDependencias=[];
            console.log($scope.empresaSelected);
            var contact = JSON.parse($scope.empresaSelected);

            console.log(contact);
            $http({
                method: 'GET',
                url: 'http://localhost:3000/api/dependencia?id_empresa=' + contact._id,
                headers: {
                    'Content-Type': 'application/json'
                }

            }).then(function successCallback(response) {

                $scope.depenendica = angular.fromJson(response.data[0]);


                console.log(response);
                var n = response.data.length;
                console.log(response.data.length);
                for (var i = 0; i < n; i++) {
                    var aux = response.data[i];
                    console.log(aux);
                    $scope.listaDependencias.push(aux);

                    console.log($scope.listaDependencias);

                }

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                Console.log(response);
                $scope.mesaje = response.mensaje;

            });
        }else{

            $scope.mensaje="Seleccione una Empresa para cargar las dependencias";
        }
    };



}]);
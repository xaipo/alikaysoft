/**
 * Created by xaipo on 11/21/2015.
 */

app.controller('CargasController', function ($timeout, $rootScope, $scope, $location,$localStorage, $routeParams) {

   // $scope.usuarioLog=$localStorage.usr;
   // $scope.usuarioLog=$localStorage.getItem('usuario');
    $scope.usuarioLog;

    data = JSON.parse(localStorage.getItem("usuario"));
    $scope.usuarioLog=data;
    //console.log(data);
    //console.log($scope.usuarioLog.nombre_usuario);
   // $scope.usuarioLog= JSON.parse ($scope.usuarioLog);
   // console.log($scope.usuarioLog+" entro");

    $scope.showCargarArchivos = function (pathurl) {

        data = JSON.parse(localStorage.getItem("usuario"));
        $scope.usuarioLog=data;

        if($scope.usuarioLog!=null){

            $timeout(function () {
                $location.path(pathurl);
                $location.replace();
                console.log($location.path());
            });

        }else{
            window.location = '/tesisSaludOcupacional/Client/login.html';

        }


    };


    $scope.logout= function() {
       // $localStorage.removeAll();
       localStorage.removeItem('usuario');
       window.location = '/tesisSaludOcupacional/Client/login.html';
    };



    $scope.load=function(){

        data = JSON.parse(localStorage.getItem("usuario"));
        if(data==null){
            window.location = '/tesisSaludOcupacional/Client/login.html';
        }else{
            $scope.usuarioLog=data;

        }

    }
});
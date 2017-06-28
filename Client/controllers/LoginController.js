/**
 * Created by xaipo on 9/30/2015.
 */



app.controller('LoginController', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {

    console.log(myProvider.getUser());
    $scope.mensaje = "";
    $scope.usuario = "";
    $scope.password = "";
    $scope.usuario1;
    //$rootScope.usuarioLogin;
    $scope.login = function () {
        $scope.mensaje = "procesando";
        var url= myProvider.getUser()+'?nombre_usuario='+$scope.usuario;
        console.log(url);

        $http({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
          //  console.log(response.data[0].nombre_usuario);
          //  console.log(response.data);
            $scope.usuario1= angular.fromJson(response.data[0]);
            //console.log($scope.usuario1);
           // console.log($scope.usuario1.nombre_usuario);
           // console.log($scope.usuario1.contrasena);
           // console.log($scope.usuario1._id);
            if(response.data.length>0){
            if($scope.usuario1.nombre_usuario==$scope.usuario && $scope.usuario1.contrasena==$scope.password ){
                console.log($scope.usuario1.contrasena);
                $scope.mensaje="Bienvenido "+response.data[0].nombre_usuario.toString();
               // $rootScope.usuarioLogin=$scope.usuario1;
                //$localStorage.usr=$scope.usuario1;
                switch(response.data[0].tipo_usuario) {
                    case 1:
                        console.log($scope.usuario1);
                        window.localStorage.setItem("usuario", JSON.stringify($scope.usuario1));
                        window.location ='/tesisSaludOcupacional/Client/Administrator/indexAdmin.html';

                        break;
                    case 2:
                        window.localStorage.setItem("usuario", JSON.stringify($scope.usuario1));
                        window.location ='/tesisSaludOcupacional/Client/SysAdmin/indexAdmin.html';
                        break;
                    case 3:
                        window.localStorage.setItem("usuario", JSON.stringify($scope.usuario1));
                        window.location ='/tesisSaludOcupacional/Client/Administrator/CieUser/ConfiguracionCIe10.html';
                        break;
                    default:

                     alert('El tipo de usuario no tiene permiso para ningun sistema')
                }

              //  console.log($rootScope.usuarioLogin);
             //   $location.replace();


            }else{

                $scope.mensaje="Revise su usuario y password";
            }

            }else{

                $scope.mensaje="Revise su usuario y password";
                alert('Revise su usuario y password');

            }
            console.log(response);

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            Console.log(response);
            $scope.mesaje=response.mensaje;

        });
    };

  //  console.log($rootScope.usuarioLogin);

}]);

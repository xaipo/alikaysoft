/**
 * Created by xaipo on 10/4/2016.
 */
app.controller('ControllerMostrarAusentismo', ['$scope', '$http', '$location', 'myProvider', '$localStorage', function ($scope, $http, $location, myProvider, $localStorage) {
    var ficha;
$scope.inicialize= function (){

    console.log(JSON.parse(localStorage.getItem("ficha")));

   ficha = JSON.parse(localStorage.getItem("ficha"));
    console.log(ficha);
    console.log(ficha.fechas);


    $scope.ausentismo = {

     //   mes: ficha.mes,
       // desde: Number(ficha.desde),
      //  hasta: Number(ficha.hasta),
        fechas:ficha.fechas,
        dias: ficha.dias,
        horas: ficha.horas,
        minutos: ficha.minutos,
        laboral_nolaboral: ficha.laboral_nolaboral,
        diagnostico: ficha.diagnostico,
        medico: ficha.medico,
        tipo_certificado: ficha.tipo_certificado,
        observaciones: ficha.observaciones,
        regimen: ficha.regimen
    };
    for (var i = 0; i < ficha.diagnostico.length; i++) {


        var diag = ficha.diagnostico[i];

        cargarCies(diag);

    }



    $http({

        method: 'GET',
        url: myProvider.getPaciente() + '?_id=' + ficha.paciente,

        headers: {
            'Content-Type': 'application/json'
        }

    }).then(function successCallback(response) {


        var n = response.data.length;
        // console.log(n);

        if (n == 0) {

            alert('no se encontro el paciente');

        } else {
            //  $scope.tipoCie10=[];
            // for (var i = 0; i < n; i++) {


            $scope.pacienteEncontrado = response.data[0];
            //  window.localStorage.setItem("pe", JSON.stringify($scope.pacienteEncontrado));
            console.log($scope.pacienteEncontrado);


        }
    }, function errorCallback(response) {
        console.log('entra');
        //  Console.log(response);
        $scope.mesaje = response.mensaje;

    });



    $http({

        method: 'GET',
        url: myProvider.getMedico(),

        headers: {
            'Content-Type': 'application/json'
        }

    }).then(function successCallback(response) {
        //console.log('entra url');
        //console.log(url);

        var n = response.data.length;
        // console.log(n);

        if (n == 0) {

            alert('no se encontro el paciente');

        } else {
            //  $scope.tipoCie10=[];
            for (var i = 0; i < n; i++) {

                $scope.medicos.push(response.data[i]);
                // console.log($scope.tipoCie10);

            }
            //$scope.cie10Selected=response.data[0];
            // $scope.busquedaCie10Tipo();

        }


    }, function errorCallback(response) {
        console.log('entra');
        //  Console.log(response);
        $scope.mesaje = response.mensaje;

    });
}



    $(function () {




        $('.datepicker').datepicker({
            multidate: true,
            language: 'es',
        });


        $timeout(function () {
        $('.datepicker').datepicker('setDates',  $scope.ausentismo.fechas)
        }, 100, false);
    });



    $scope.listaCie = [];

    function cargarCies(cie) {


        $http({

            method: 'GET',
            url: myProvider.getCie10() + "?_id=" + cie,

            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function successCallback(response) {
            //console.log('entra url');
            console.log(response.data);

            $scope.listaCie.push(response.data[0]);
            //   $scope.listaSelectedCie10.push(response.data);
            console.log($scope.listaCie);

        }, function errorCallback(response) {
            console.log('entra');
            //  Console.log(response);
            // $scope.mesaje = response.mensaje;

        });


    }




    $scope.cambiarEstado = function () {


        console.log(ficha);


        $http({
            method: 'Put',
            url: myProvider.getAusentismo() + "/" + ficha._id,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {


                estado: "inactivo"


            }


        }).then(function successCallback(response) {
            alert('Eliminado Correctamente')
            $location.path('/BA');

        }, function errorCallback(response) {

            console.log('falla');
        });





    }


    $scope.medicos = [];




}]);

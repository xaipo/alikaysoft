/**
 * Created by xaipo on 10/4/2016.
 */
app.controller('ControllerBusquedaAusentismo', ['$scope', '$http', '$location', 'myProvider', '$localStorage', '$timeout', function ($scope, $http, $location, myProvider, $localStorage, $timeout) {

    $scope.listaPacientes = [];
    $scope.paciente = {


        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        cargo: '',
        edad: '',


    };
    $scope.pacienteEncontrado = '';
    $scope.search;
    $scope.pacienteSelected = '';
    $scope.listaDependencias = [];
    $scope.listaPuestos = {};
    $scope.listaSelectedCie10 = [];
    $scope.medicos = [];
    $scope.cie10Quitar;
    $scope.tipoCie10 = [];
    $scope.cie10Selected;
    $scope.cie10Select = '';
    $scope.seleccionada;
    $scope.encontrada = "";
    $scope.cie10 = [];
    $scope.listaCie10Selecionada = [];
    $scope.selectedDependencia = '';
    $scope.listaCargo = [];
    $scope.listaDependencias = [];
    $scope.ausentismo = {

        mes: '',
        paciente: '',
        desde: '',
        hasta: '',
        dias: '',
        horas: '',
        minutos: '',
        laboral_nolaboral: '',
        diagnostico: [],
        medico: '',
        tipo_certificado: '',
        observaciones: '',
        regimen: ''
    };


    $scope.searchUser = function () {
        console.log(myProvider.getUser() + '?cedula=' + $scope.cedula);
        $http({

            method: 'GET',
            url: myProvider.getPaciente() + '?cedula=' + $scope.cedula,

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


                $http({

                    method: 'GET',
                    url: myProvider.getAusentismo() + '?paciente=' + $scope.pacienteEncontrado._id,

                    headers: {
                        'Content-Type': 'application/json'
                    }

                }).then(function successCallback(response) {
                    //console.log('entra url');
                    //console.log(url);


                    console.log(response.data);
                    $scope.lista = response.data;

                    $timeout(function () {


                        $('#example1').dataTable({
                            "language": {
                                "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
                            }


                        });
                    }, 100, false);


                }, function errorCallback(response) {
                    console.log('entra');
                    //  Console.log(response);
                    $scope.mesaje = response.mensaje;

                });


            }
        }, function errorCallback(response) {
            console.log('entra');
            //  Console.log(response);
            $scope.mesaje = response.mensaje;

        });


        //  $scope.validateFirst();
    }


    $scope.lista = [];


    $scope.verFicha = function (ficha) {

        console.log(ficha);
        window.localStorage.setItem("ficha", JSON.stringify(ficha));


        $location.path('/VF');


    }


    $scope.eliminar = function (ficha) {

        console.log(ficha);

        console.log("eliminar");

    }


}]);

/**
 * Created by xaipo on 10/4/2016.
 */
app.controller('ControllerAusentismo', ['$scope', '$http', '$location', 'myProvider', '$localStorage', function ($scope, $http, $location, myProvider, $localStorage) {

    $scope.listaPacientes = [];
    $scope.paciente = {


        primer_nombre: '',
        segundo_nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        cargo: '',
        edad: '',


    };
    $scope.pacienteEncontrado ='';
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
        regimen:''
    };

    $http({

        method: 'GET',
        url: myProvider.getDependencia() + '?id_empresa=56d5d20bc2dbc38c0f279527',

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
            $scope.listaDependencias = [];

            for (var i = 0; i < n; i++) {

                $scope.aux = response.data[i];
                //$scope.aux.primer_apellido+=' '+$scope.aux.segundo_apellido+' '+$scope.aux.primer_nombre+' '+$scope.aux.segundo_nombre
                $scope.listaDependencias.push($scope.aux);

                // console.log($scope.empresas);
            }
            //  $scope.tipoActividadSeleccionada=$scope.empresas[0]._id;
            //console.log($scope.empresaSeleccionada);
            console.log($scope.listaPacientes);


        }


    }, function errorCallback(response) {
        console.log('entra');
        //  Console.log(response);
        $scope.mesaje = response.mensaje;

    });

    $scope.searchUser = function () {
        console.log(myProvider.getUser()+'?cedula='+$scope.cedula);
        $http({

            method: 'GET',
            url: myProvider.getPaciente()+'?cedula='+$scope.cedula,

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


        //  $scope.validateFirst();
    }

    $scope.control1 = function () {


        if ($scope.paciente.primer_nombre != '' && $scope.paciente.primer_nombre != undefined) {

            if ($scope.paciente.segundo_nombre != '' && $scope.paciente.segundo_nombre != undefined) {

                if ($scope.paciente.primer_apellido != '' && $scope.paciente.primer_apellido != undefined) {
                    if ($scope.paciente.segundo_apellido != '' && $scope.paciente.segundo_apellido != undefined) {

                        if ($scope.paciente.edad != '' && $scope.paciente.edad != undefined) {

                            if ($scope.paciente.cargo != '' && $scope.paciente.cargo != undefined) {

                                return true;
                            } else {
                                return false;
                            }
                        } else {

                            return false;
                        }
                    } else {
                        return false;
                    }

                } else {
                    return false;

                }
            } else {
                return false;
            }
        } else {

            return false;
        }


    }


    $scope.ingresarPaciente = function () {
        // console.log('entra');

        console.log($scope.control1());
        if ($scope.control1()) {
            $scope.paciente.cargo = JSON.parse($scope.paciente.cargo);
            $http({
                method: 'POST',
                url: myProvider.getPaciente(),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {

                    primer_nombre: $scope.paciente.primer_nombre.toUpperCase(),
                    segundo_nombre: $scope.paciente.segundo_nombre.toUpperCase(),
                    primer_apellido: $scope.paciente.primer_apellido.toUpperCase(),
                    segundo_apellido: $scope.paciente.segundo_apellido.toUpperCase(),
                    puesto_trabajo: $scope.paciente.cargo._id,
                    edad: $scope.paciente.edad,

                }


            }).then(function successCallback(response) {
                console.log('entra');
                $scope.paciente=response.data;
                console.log($scope.paciente);
                $scope.paciente.primer_apellido += ' ' + $scope.paciente.segundo_apellido + ' ' + $scope.paciente.primer_nombre + ' ' + $scope.paciente.segundo_nombre
                console.log($scope.paciente);
                $scope.listaPacientes.push($scope.paciente);
                $scope.paciente = {


                    primer_nombre: '',
                    segundo_nombre: '',
                    primer_apellido: '',
                    segundo_apellido: '',
                    cargo: '',
                    edad: '',


                };

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                // console.log(response);
                //$scope.mesaje = response.mensaje;
                //console.log('falla');
            });
        } else {
            alert('Revise los campos para ingrear el paciente');

        }
    }

    $http({

        method: 'GET',
        url: myProvider.getTipoCie10(),

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

                $scope.tipoCie10.push(response.data[i]);
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


    $scope.busquedaCie10Tipo = function () {
        console.log($scope.cie10Selected);
        if ($scope.cie10Selected != undefined) {

            $scope.cie10Selected = JSON.parse($scope.cie10Selected);
            $http({

                method: 'GET',
                url: myProvider.getCie10() + "?tipo_cie10=" + $scope.cie10Selected._id,

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
                    $scope.cie10 = [];
                    for (var i = 0; i < n; i++) {


                        $scope.cie10.push(response.data[i]);
                        if ($scope.cie10[i].estado == 1) {
                            $scope.cie10[i].estado = "activado";
                        } else {

                            $scope.cie10[i].estado = "desactivado";
                        }
                        //  console.log($scope.tipoCie10);

                    }


                }


            }, function errorCallback(response) {
                console.log('entra');
                //  Console.log(response);
                $scope.mesaje = response.mensaje;

            });
        }
    }


    $scope.busquedaPorCodigoPropio = function () {

        console.log("entragunc");


        if ($scope.seleccionada != undefined && $scope.seleccionada != '') {
            $scope.seleccionada = $scope.seleccionada.toUpperCase();
            // $scope.selecc =JSON.parse($scope.seleccionada);
            //  console.log(myProvider.getCie10() + "?codigo_cie10=" + $scope.seleccionada);
            $http({

                method: 'GET',
                url: myProvider.getCie10() + "?codigo_cie10=" + $scope.seleccionada,

                headers: {
                    'Content-Type': 'application/json'
                }

            }).then(function successCallback(response) {
                //console.log('entra url');
                //console.log(url);

                var n = response.data.length;
                // console.log(n);

                if (n == 0) {

                    alert('no se encontro el código ingresado');
                    $scope.encontrada = '';
                } else {
                    // $scope.seleccionada = '';
                    for (var i = 0; i < n; i++) {


                        $scope.encontrada = (response.data[i]);
                        if ($scope.encontrada.estado == 1) {
                            $scope.encontrada.estado = "activado";
                        } else {

                            $scope.encontrada.estado = "desactivado";
                        }
                        //  console.log($scope.tipoCie10);

                    }


                }


            }, function errorCallback(response) {
                console.log('entra');
                //  Console.log(response);
                // $scope.mesaje = response.mensaje;

            });
        }
    }


    $scope.agregar = function () {


        if ($scope.cie10Select != undefined && $scope.cie10Select != '') {

            $scope.cie10Select = JSON.parse($scope.cie10Select);
            console.log($scope.cie10Select);
            $scope.listaSelectedCie10.push($scope.cie10Select);
            $scope.cie10Select = '';
        } else {
            if ($scope.encontrada != undefined && $scope.encontrada != '') {
                // scope.encontrada=JSON.parse($scope.encontrada);
                $scope.listaSelectedCie10.push($scope.encontrada);
                $scope.encontrada = '';
            } else {

                alert('seleccione un sintoma para agregar');
            }

        }


        //   $scope.paraclinico_seleccionado.fecha=document.getElementById('datepicker').value;

        //  console.log($scope.selectRevision);
        //  $scope.paraclinico_seleccionado.codigo=$scope.contador++;
        //   $scope.paraclinico_seleccionado.resultado=JSON.parse($scope.paraclinico_seleccionado.resultado);
        // $scope.selectRevision.codigo=$scope.contador++;


    }

    $scope.quitar = function () {
        // console.log($scope.accidentesTrabajoSelected);

        if ($scope.cie10Quitar != undefined && $scope.cie10Quitar != '') {
            $scope.cie10Quitar = JSON.parse($scope.cie10Quitar);
            var n = $scope.listaSelectedCie10.length;
            console.log(n);
            var pos;
            for (var i = 0; i < n; i++) {


                if ($scope.listaSelectedCie10[i].codigo_cie10 == $scope.cie10Quitar.codigo_cie10) {
                    console.log('entra');

                    pos = i;
                    break;
                }
            }
            console.log(pos);
            $scope.listaSelectedCie10.splice(pos, 1);
            //  console.log($scope.listaRiesgosOcupacionales);
            //  console.log($scope.contador);
        }
    }


    $scope.changePuesto = function () {
        console.log('entra');
        if ($scope.selectedDependencia != '' && $scope.selectedDependencia != undefined) {

            $scope.selectedDependencia = JSON.parse($scope.selectedDependencia);
            console.log(myProvider.getCargo() + '?dependencia=' + $scope.selectedDependencia._id);
            $http({

                method: 'GET',
                url: myProvider.getCargo() + '?dependencia=' + $scope.selectedDependencia._id,

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
                    $scope.listaCargo = [];

                    for (var i = 0; i < n; i++) {

                        $scope.aux = response.data[i];
                        //$scope.aux.primer_apellido+=' '+$scope.aux.segundo_apellido+' '+$scope.aux.primer_nombre+' '+$scope.aux.segundo_nombre
                        $scope.listaCargo.push($scope.aux);

                        // console.log($scope.empresas);
                    }
                    //  $scope.tipoActividadSeleccionada=$scope.empresas[0]._id;
                    //console.log($scope.empresaSeleccionada);
                    console.log($scope.listaPacientes);


                }


            }, function errorCallback(response) {
                console.log('entra');
                //  Console.log(response);
                $scope.mesaje = response.mensaje;

            });


        }

    }


    $scope.control2 = function () {

        if ($scope.ausentismo.mes != '' && $scope.ausentismo.mes != undefined) {
            if ($scope.pacienteEncontrado != '' && $scope.pacienteEncontrado != undefined) {

                if ($scope.ausentismo.desde != '' && $scope.ausentismo.hasta != undefined) {

                    if ($scope.ausentismo.dias != '' && $scope.ausentismo.dias != undefined) {

                        if ($scope.ausentismo.horas != '' && $scope.ausentismo.horas != undefined) {

                            if ($scope.ausentismo.minutos != '' && $scope.ausentismo.minutos != undefined) {

                                if ($scope.ausentismo.laboral_nolaboral != '' && $scope.ausentismo.laboral_nolaboral != undefined) {

                                    if ($scope.listaSelectedCie10.length > 0) {
                                        if ($scope.ausentismo.medico != '' && $scope.ausentismo.medico != undefined) {

                                            if ($scope.ausentismo.tipo_certificado != '' && $scope.ausentismo.tipo_certificado != undefined) {
                                            if ($scope.ausentismo.regimen != '' && $scope.ausentismo.regimen != undefined) {
                                                return true;
                                            }else{
                                                return false;
                                            }


                                            }else{
                                                return false;
                                            }
                                        }else{
                                            return false;
                                        }

                                    }else{
                                        return false;
                                    }
                                }else{

                                    return false;
                                }
                            }else{

                                return false;
                            }

                        }else{
                            return false;
                        }
                    }else{
                        return false;
                    }

                }else{
                    return false;
                }


            } else {
                return false;
            }


        } else {


    }


}


    $scope.ingresarAusentismo = function () {

        if($scope.control2()){

        $scope.ausentismo.medico=JSON.parse($scope.ausentismo.medico);
      //  $scope.ausentismo.paciente=JSON.parse($scope.ausentismo.paciente);
        console.log($scope.listaSelectedCie10[i]);
        var n= $scope.listaSelectedCie10.length;
            for(var i=0; i<n ;i++){

                $scope.ausentismo.diagnostico.push($scope.listaSelectedCie10[i]._id);
            }


            $http({
                method: 'POST',
                url: myProvider.getAusentismo(),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {


                    mes : $scope.ausentismo.mes,
                    paciente:  $scope.pacienteEncontrado._id,
                    desde:$scope.ausentismo.desde,
                    hasta: $scope.ausentismo.hasta,
                    dias:$scope.ausentismo.dias,
                    horas:$scope.ausentismo.horas,
                    minutos:$scope.ausentismo.minutos,
                    laboral_nolaboral:$scope.ausentismo.laboral_nolaboral,
                    diagnostico:$scope.ausentismo.diagnostico,
                    medico: $scope.ausentismo.medico,
                    tipo_certificado:$scope.ausentismo.tipo_certificado,
                    observaciones:$scope.ausentismo.observaciones,
                    regimen:$scope.ausentismo.regimen,

                }


            }).then(function successCallback(response) {
                alert('Ingresado Correctamente')
                $scope.listaSelectedCie10=[];
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
                }
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    // console.log(response);
                    //$scope.mesaje = response.mensaje;
                    console.log('falla');
                });


        }else{
            console.log($scope.ausentismo);
            alert('Verifique que todos los datos esten ingresados')
        }
    }



} ]);

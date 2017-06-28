/**
 * Created by xaipo on 1/23/2017.
 */
app.controller('ControllerCreacionGenerica', ['$scope', '$http', '$location', 'myProvider', '$localStorage', function ($scope, $http, $location, myProvider, $localStorage) {


    $scope.campo = {
        nombre: '',
        tipo_dato: '',
        obligatoriedad:''
    };


    $scope.tabla = {

        campos: [],
        nombre: '',
        token: '',
        estado: '1'
    }

    $scope.selectedQuitar = '';

    $scope.generar = function () {

        $http({

            method: 'GET',
            url: myProvider.getToken(),

            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function successCallback(response) {

            console.log(response.data);
            $scope.tabla.token = response.data;


        }, function errorCallback(response) {
            console.log('entra');
            //  Console.log(response);
            $scope.mesaje = response.mensaje;

        });

    }

    $scope.setClickedRow = function (index, item) {  //function that sets the value of selectedRow to current index

        console.log('entra');
        $scope.selectedRow = index;
        $scope.selectedQuitar = item;
        // console.log(item);
        // console.log($scope.accidentesTrabajoSelected);

        /*console.log($scope.selectedRow);
         console.log(item);*/
    }
    $scope.agregar = function () {

        $scope.campo.nombre = $scope.campo.nombre.toLowerCase();
        if ($scope.campo.nombre != '' && $scope.campo.nombre != undefined && $scope.campo.tipo_dato != '' && $scope.campo.tipo_dato != undefined) {

            if ($scope.validar($scope.tabla.campos, $scope.campo)) {

                // $scope.selectRevision.codigo=$scope.contador++;

                $scope.tabla.campos.push($scope.campo);
                $scope.campo = {
                    nombre: '',
                    tipo_dato: ''
                };
            } else {

                alert('los nombres de los campos deben ser unicos');
            }
        } else {
            alert('Llene el nombre del campo y el tipo de dato');

        }
    }

    $scope.quitar = function () {
        // console.log($scope.accidentesTrabajoSelected);
        var n = $scope.tabla.campos.length;
        console.log(n);
        var pos;
        for (var i = 0; i < n; i++) {

            if ($scope.tabla.campos[i].nombre == $scope.selectedQuitar.nombre && $scope.tabla.campos[i].tipo_dato == $scope.selectedQuitar.tipo_dato) {


                pos = i;
                break;
            }
        }
        console.log(pos);
        $scope.tabla.campos.splice(pos, 1);
        //  console.log($scope.listaRiesgosOcupacionales);
        //  console.log($scope.contador);
    }


    $scope.validar = function (array, item) {

        var n = array.length;

        for (var i = 0; i < n; i++) {

            if (array[i].nombre == item.nombre) {

                return false;
            }
        }
        return true;
    }


    $scope.ingresar = function () {

        console.log($scope.tabla);
        var n = $scope.tabla.campos.length;









        
        if ($scope.tabla.nombre != undefined && $scope.tabla.nombre != '' && $scope.tabla.token != undefined && $scope.tabla.token != '' && n > 0) {


            $http({
                method: 'POST',
                url: myProvider.getCreacionGenerica(),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    nombre_tabla: $scope.tabla.nombre,
                    tk: $scope.tabla.token,
                    estado: $scope.tabla.estado,
                    campos: $scope.tabla.campos

                }


            }).then(function successCallback(response) {

                alert('ingreso correcto');
                console.log(response.data);


            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                // console.log(response);
                //$scope.mesaje = response.mensaje;

            });


        }

        else {
            alert('Ingrese el nombre de la tabla, genere el token y que exista por lo menos un campo para ingresar');

        }
    }
}]);

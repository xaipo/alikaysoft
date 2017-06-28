/**
 * Created by xaipo on 6/7/2016.
 */
app.controller('ControllerCie10', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {

    $scope.search1="";
    $scope.search2="";
    $scope.tipoCie10=[];
    $scope.cie10Selected="";
    $scope.cie10Selected1="";
    $scope.cie10SintomaSelected="";
    $scope.cie10=[];

    $scope.newCie10={
        codigo_cie10:"",
        tipo_cie10:"",
        sintoma:"",
        tratamientos:[],
        estado:"1"
    }


    $scope.totalItems = $scope.cie10.length;
    $scope.currentPage = 1;
    $scope.numPerPage = 5;

    $scope.paginate = function(value) {
        var begin, end, index;
        begin = ($scope.currentPage - 1) * $scope.numPerPage;
        end = begin + $scope.numPerPage;
        index = $scope.cie10.indexOf(value);
        return (begin <= index && index < end);
    };


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

        if(n==0){

            alert('no se encontro el paciente');

        }else {
          //  $scope.tipoCie10=[];
            for(var i=0;i<n;i++){

                $scope.tipoCie10.push(response.data[i]);
                  // console.log($scope.tipoCie10);

            }
           // $scope.cie10Selected=response.data[0];
            //$scope.busquedaCie10Tipo();

        }


    }, function errorCallback(response) {
        console.log('entra');
        //  Console.log(response);
        $scope.mesaje = response.mensaje;

    });

    $scope.busquedaCie10Tipo=function() {

            if ($scope.cie10Selected != undefined &&$scope.cie10Selected != '' ) {

                $scope.new = JSON.parse($scope.cie10Selected);

                $http({

                    method: 'GET',
                    url: myProvider.getCie10() + "?tipo_cie10=" + $scope.new._id,

                    headers: {
                        'Content-Type': 'application/json'
                    }

                }).then(function successCallback(response) {
                    //console.log('entra url');
                    //console.log(url);

                    var n = response.data.length;
                    // console.log(n);

                    if (n == 0) {

                        $scope.cie10 = [];

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



    $scope.selectedRow = null;  // initialize our variable to null
    $scope.setClickedRow = function(index,item){  //function that sets the value of selectedRow to current index
        $scope.selectedRow = index;
        $scope.cie10Selected1=item;


        /*console.log($scope.selectedRow);
        console.log(item);*/
    }




    $scope.guardarCie10=function(){

        console.log($scope.newCie10.codigo_cie10);
        console.log($scope.cie10Selected._id);
        console.log($scope.newCie10.sintoma);
        $scope.newCie10.codigo_cie10=$scope.newCie10.codigo_cie10.toUpperCase();
        $scope.new1=JSON.parse($scope.cie10Selected);

        $http({
            method: 'POST',
            url: myProvider.getCie10(),
            headers: {
                'Content-Type': 'application/json'
            },
            data: {

                codigo_cie10:$scope.newCie10.codigo_cie10,
                tratamientos:[""],
                tipo_cie10:$scope.new1._id,
                sintoma:$scope.newCie10.sintoma,
                estado:"1"

            }


        }).then(function successCallback(response) {

            //console.log(response);
            //console.log($scope.tipoCie10)
            //$scope.cie10Selected._id=response.data.tipo_cie10.toString();


            //
            $http({

                method: 'GET',
                url: myProvider.getCie10() + "?tipo_cie10=" + $scope.new1._id,

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
                        if($scope.cie10[i].estado==1){
                            $scope.cie10[i].estado="activado";
                        }else{

                            $scope.cie10[i].estado="desactivado";
                        }
                        //  console.log($scope.tipoCie10);

                    }

                }

            }, function errorCallback(response) {
                console.log('entra');
                //  Console.log(response);
                $scope.mesaje = response.mensaje;

            });

            //


            console.log($scope.cie10Selected);
            //$scope.busquedaCie10Tipo();


        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            // console.log(response);

            console.log(response);
            //$scope.mesaje = response.mensaje;

        });

        //$scope.newCie10.tipo_cie10=$scope.selec._id

    }

    $scope.updateStatusCIE10Sintoma=function(){

        if ($scope.cie10Selected1._id == undefined){
            alert("Error, seleccionar un campo!")

        }else{

            var n = $scope.cie10.length;
            var ind = -1;
            for(var i = 0, len = n; i < len; i++) {
                if ($scope.cie10[i]._id === $scope.cie10Selected1._id) {
                    ind = i;
                    break;
                }
            }

            if ($scope.cie10Selected1.estado == "activado") {
                $scope.newCie10.estado="0";
                $scope.cie10[ind].estado ="desactivado";

                } else{

                $scope.newCie10.estado="1";
                $scope.cie10[ind].estado ="activado";

            }

            var newEstadoCie10 = $scope.newCie10.estado;

            $http({
                method: 'PUT',
                url: myProvider.getCie10()+"/"+$scope.cie10Selected1._id,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    estado:newEstadoCie10
                }


            }).then(function successCallback(response) {

                //console.log(newEstadoCie10);

            }, function errorCallback(response) {
                console.log(response);

            });

            }
            }

        }


    ]);

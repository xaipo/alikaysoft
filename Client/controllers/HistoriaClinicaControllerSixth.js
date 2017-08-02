/**
 * Created by xaipo on 8/31/2016.
 */
app.controller('HistoriaClinicaSixth', ['$scope', '$http', '$location','myProvider','$localStorage','$rootScope',  function ($scope,$http,$location,myProvider,$localStorage,$rootScope) {


    $scope.anstecedentes_salud;
    $scope.antescedentes_familiares={
        codigo:'',
        patologia:'',
        parentezco:''
    };

    $scope.antescedetnes_personales={

        codigo:'',
        enfermedad:'',
        tipo:'',
        observacion:''
    };
    $scope.lsita_parentezco=[];
    $scope.familiar_selected;

    $scope.listaAntescedentesFamiliares=[];
    $scope.listaAntescedentesPersonales=[];
    $scope.contador=0;
    $scope.tipo=[];
    $scope.personal_selected;


    $scope.getHistoria= function(){

        $scope.historiaClinica=JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

    }


    $http({

        method: 'GET',
        url: myProvider.getTipoPersonales(),

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

                $scope.tipo.push(response.data[i]);
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
        url: myProvider.getParentezco(),

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

                $scope.lsita_parentezco.push(response.data[i]);
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




    $scope.agregarP = function(){
            console.log($scope.antescedentes_familiares)
        if($scope.antescedentes_familiares.patologia!=''&&$scope.antescedentes_familiares.patologia!=undefined){
            $scope.antescedentes_familiares.codigo=$scope.contador++;
            $scope.antescedentes_familiares.parentezco=JSON.parse($scope.antescedentes_familiares.parentezco);
            $scope.listaAntescedentesFamiliares.push($scope.antescedentes_familiares);
            $scope.antescedentes_familiares={
                codigo:'',
                patologia:'',
                parentezco:''
            };
        }else{
            alert('Ingrese Patologia y parentezco para agregar a la lista');

        }
    }


    $scope.quitar= function (){
        // console.log($scope.accidentesTrabajoSelected);
        var n=  $scope.listaAntescedentesFamiliares.length;
        console.log(n);
        var pos;
        for(var i=0;i<n;i++ ){

            if($scope.listaAntescedentesFamiliares[i].codigo==$scope.familiar_selected.codigo){


                pos=i;
                break;
            }
        }
        console.log(pos);
        $scope.listaAntescedentesFamiliares.splice(pos,1);
        //  console.log($scope.listaRiesgosOcupacionales);
        //  console.log($scope.contador);
    }

    $scope.setClickedRow = function(index,item){  //function that sets the value of selectedRow to current index

        console.log('entra');
        $scope.selectedRow = index;
        $scope.familiar_selected=item;
        // console.log(item);
        // console.log($scope.accidentesTrabajoSelected);

        /*console.log($scope.selectedRow);
         console.log(item);*/
    }









    $scope.agregarP1 = function(){
      //  console.log($scope.antescedentes_familiares)
        if($scope.antescedetnes_personales.enfermedad!=''&&$scope.antescedetnes_personales.enfermedad!=undefined){
            $scope.antescedetnes_personales.codigo=$scope.contador++;
            $scope.antescedetnes_personales.tipo=JSON.parse($scope.antescedetnes_personales.tipo);
            $scope.listaAntescedentesPersonales.push($scope.antescedetnes_personales);
            $scope.antescedetnes_personales={

                codigo:'',
                enfermedad:'',
                tipo:'',
                observacion:''
            };

        }else{
            alert('Ingrese Patologia y parentezco para agregar a la lista');

        }
    }


    $scope.quitar1= function (){
        // console.log($scope.accidentesTrabajoSelected);
        var n=  $scope.listaAntescedentesPersonales.length;
        console.log(n);
        var pos;
        for(var i=0;i<n;i++ ){

            if($scope.listaAntescedentesPersonales[i].codigo==$scope.personal_selected.codigo){


                pos=i;
                break;
            }
        }
        console.log(pos);
        $scope.listaAntescedentesPersonales.splice(pos,1);
        //  console.log($scope.listaRiesgosOcupacionales);
        //  console.log($scope.contador);
    }

    $scope.setClickedRow1 = function(index,item){  //function that sets the value of selectedRow to current index

        console.log('entra');
        $scope.selectedRow = index;
        $scope.personal_selected=item;
        // console.log(item);
        // console.log($scope.accidentesTrabajoSelected);

        /*console.log($scope.selectedRow);
         console.log(item);*/
    }



    $scope.saveFiveth = function (){


        console.clear();

        $scope.historiaClinica = JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);


        $scope.historiaClinica.antescedentes_familiares=$scope.listaAntescedentesFamiliares;
        $scope.historiaClinica.antescedentes_personales=$scope.listaAntescedentesPersonales;

        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
      //  window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/sixth.html';

        $rootScope.quinto=true;

    }

    $scope.noAplica = function (){


        $scope.historiaClinica.antescedentes_familiares="No aplica";
        $scope.historiaClinica.antescedentes_personales="No aplica";

        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        //  window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/sixth.html';

        $rootScope.quinto=true;

    }


    $scope.modificar = function () {










        // console.log($scope.historiaClinica);
        console.clear();
        console.log(JSON.parse(window.localStorage.getItem('pe')));
        console.log(JSON.parse(window.localStorage.getItem('hm')));

        $scope.historiaClinica.antescedentes_familiares = $scope.listaAntescedentesFamiliares;


        var n = $scope.historiaClinica.antescedentes_familiares.length;
        // console.log($scope.historiaClinica.ginecoObstetra);
        // console.log($scope.historiaClinica);
        for (var i = 0; i < n; i++) {

            // console.log( $scope.historiaClinica.ginecoObstetra[i].metodos_planificacion_familiar);


            $http({
                method: 'POST',
                url: myProvider.getFamiliares(),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {

                    patologia_cie10: $scope.historiaClinica.antescedentes_familiares[i].patologia,
                    parentezco: $scope.historiaClinica.antescedentes_familiares[i].parentezco._id,
                }


            }).then(function successCallback(response) {
                //console.log(response.data);
                // console.log($scope.historiaClinicaIngreso.gineco_obstetra);

                var hm = JSON.parse(window.localStorage.getItem('hm'));

                hm.antescedentes_familiares.push(response.data._id);

                window.localStorage.setItem("hm", JSON.stringify(hm));
                // console.log($scope.historiaClinicaIngreso.riesgos_ocupacionales);

                console.log(hm);
                //actulizarla tabla de histira clinica


                $http({
                    method: 'Put',
                    url: myProvider.getHistoriaClinica() + "/" + hm._id,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {


                        antescedentes_familiares: hm.antescedentes_familiares


                    }


                }).then(function successCallback(response) {
                    alert('Actulizado Corectamente')
                    $rootScope.cuarto = false;

                }, function errorCallback(response) {

                    console.log('falla');
                });


            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                // console.log(response);
                //$scope.mesaje = response.mensaje;

            });

            //$scope.mensaje = "Para ingresar debe llenar el nombre de la empresa";

            //

        }


        $scope.historiaClinica.antescedentes_personales = $scope.listaAntescedentesPersonales;


        var n = $scope.historiaClinica.antescedentes_personales.length;
        // console.log($scope.historiaClinica.ginecoObstetra);
        // console.log($scope.historiaClinica);
        for (var i = 0; i < n; i++) {

            // console.log( $scope.historiaClinica.ginecoObstetra[i].metodos_planificacion_familiar);


            $http({
                method: 'POST',
                url: myProvider.getPersonales(),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {

                    tipo_presonales: $scope.historiaClinica.antescedentes_personales[i].tipo._id,
                    enfermedad_cie10: $scope.historiaClinica.antescedentes_personales[i].enfermedad,
                    observacion: $scope.historiaClinica.antescedentes_personales[i].observacion
                }


            }).then(function successCallback(response) {
                //console.log(response.data);


                var hm = JSON.parse(window.localStorage.getItem('hm'));

                hm.antescedentes_personales.push(response.data._id);

                window.localStorage.setItem("hm", JSON.stringify(hm));
                // console.log($scope.historiaClinicaIngreso.riesgos_ocupacionales);

                console.log(hm);
                //actulizarla tabla de histira clinica


                $http({
                    method: 'Put',
                    url: myProvider.getHistoriaClinica() + "/" + hm._id,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: {


                        antescedentes_personales: hm.antescedentes_personales


                    }


                }).then(function successCallback(response) {
                    alert('Actulizado Corectamente')
                    $rootScope.cuarto = false;

                }, function errorCallback(response) {

                    console.log('falla');
                });


            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                // console.log(response);
                //$scope.mesaje = response.mensaje;

            });

            //$scope.mensaje = "Para ingresar debe llenar el nombre de la empresa";

            //

        }


    }






}]);
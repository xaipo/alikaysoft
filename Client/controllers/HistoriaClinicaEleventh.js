/**
 * Created by xaipo on 9/8/2016.
 */
app.controller('HistoriaClinicaEleventh', ['$scope', '$http', '$location','myProvider','$localStorage','$rootScope',  function ($scope,$http,$location,myProvider,$localStorage,$rootScope) {


    $scope.examen_fisico = {
        codigo:'',
        tension_arterial_numerador: '',
        tension_arterial_denominador: '',
        frecuencia_cardiaca: '',
        dieztro: '',
        zurdo: '',
        ambidiestro: '',
        talla: '',
        peso: '',
        indice_masa_corporal: '',
        interpretacion_imc: '',
        fecha:''
    };
    $scope.selectLateralidadCerebral;
    $scope.examenFisicoSeleccionado='';
    $scope.listaExamenFisico = [];
    $scope.contador=0;
    $scope.listaImc=[];


    $http({

        method: 'GET',
        url: myProvider.getInterpretacionIMC(),

        headers: {
            'Content-Type': 'application/json'
        }

    }).then(function successCallback(response) {
        //console.log('entra url');
        //console.log(url);

        var n = response.data.length;
        // console.log(n);

        if(n==0){

            alert('no se encontro provincias');

        }else {
            $scope.listaImc=[];

            for(var i=0;i<n;i++){

                $scope.listaImc.push(response.data[i]);

                // console.log($scope.empresas);
            }
            //  $scope.tipoActividadSeleccionada=$scope.empresas[0]._id;
            //console.log($scope.empresaSeleccionada);
            // console.log($scope.empresas);


        }


    }, function errorCallback(response) {
        console.log('entra');
        //  Console.log(response);
        $scope.mesaje = response.mensaje;

    });





    $scope.getHistoria = function () {

        $scope.historiaClinica = JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

    }

    $scope.changeLateralidad = function () {

        if($scope.selectLateralidadCerebral=='D'){
            $scope.examen_fisico.dieztro=true;
            $scope.examen_fisico.zurdo=false;
            $scope.examen_fisico.ambidiestro=false;
        }
        if($scope.selectLateralidadCerebral=='Z'){
            $scope.examen_fisico.dieztro=false;
            $scope.examen_fisico.zurdo=true;
            $scope.examen_fisico.ambidiestro=false;
        }
        if($scope.selectLateralidadCerebral=='A'){
            $scope.examen_fisico.dieztro=false;
            $scope.examen_fisico.zurdo=false;
            $scope.examen_fisico.ambidiestro=true;
        }
    }




    $scope.setClickedRow = function(index,item){  //function that sets the value of selectedRow to current index

        console.log('entra');
        $scope.selectedRow = index;
        $scope.examenFisicoSeleccionado=item;
         console.log(item);
        // console.log($scope.accidentesTrabajoSelected);

        /*console.log($scope.selectedRow);
         console.log(item);*/
    }



    $scope.agregar = function(){

        // $scope.inmunizacionAdd.fecha_inmunizacion=document.getElementById('datepicker').value;

            //  console.log($scope.selectRevision);
            $scope.examen_fisico.codigo=$scope.contador++;
            $scope.examen_fisico.interpretacion_imc=JSON.parse($scope.examen_fisico.interpretacion_imc);
            // $scope.selectRevision.codigo=$scope.contador++;

            $scope.listaExamenFisico.push($scope.examen_fisico);
            $scope.examen_fisico = {

                tension_arterial_numerador: '',
                tension_arterial_denominador: '',
                frecuencia_cardiaca: '',
                dieztro: '',
                zurdo: '',
                ambidiestro: '',
                talla: '',
                peso: '',
                indice_masa_corporal: '',
                interpretacion_imc: ''

            };


    }

    $scope.quitar= function (){
        // console.log($scope.accidentesTrabajoSelected);
        var n=  $scope.listaExamenFisico.length;
        console.log(n);
        var pos;
        for(var i=0;i<n;i++ ){

            console.log($scope.listaExamenFisico[i].codigo);
            console.log($scope.examen_fisico.codigo);
            if($scope.listaExamenFisico[i].codigo==$scope.examenFisicoSeleccionado.codigo){
                console.log('entra');

                pos=i;
                break;
            }
        }
        console.log(pos);
        $scope.listaExamenFisico.splice(pos,1);
        //  console.log($scope.listaRiesgosOcupacionales);
        //  console.log($scope.contador);
    }




    $scope.saveEleven= function(){

        console.clear();
        $scope.historiaClinica = JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

        
        $scope.historiaClinica.examen_fisico=$scope.listaExamenFisico;
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
      //  window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/twelveth.html';

        $rootScope.decimo=true;
    }


    $scope.noAplica= function(){

        $scope.historiaClinica.examen_fisico="No Aplica";
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        //  window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/twelveth.html';

        $rootScope.decimo=true;
    }


    $scope.modificar = function () {










        // console.log($scope.historiaClinica);
        console.clear();
        console.log(JSON.parse(window.localStorage.getItem('pe')));
        console.log(JSON.parse(window.localStorage.getItem('hm')));

        console.log($scope.listaAccidentesTrabajo);


        $scope.historiaClinica.examen_fisico = $scope.listaExamenFisico;


        var n = $scope.historiaClinica.examen_fisico.length;
        // console.log($scope.historiaClinica.ginecoObstetra);
        // console.log($scope.historiaClinica);
        for (var i = 0; i < n; i++) {
            $http({
                method: 'POST',
                url: myProvider.getExamenFisico(),
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {

                    tension_arterial_numerador: $scope.historiaClinica.examen_fisico[i].tension_arterial_numerador,
                    tension_arterial_denominador: $scope.historiaClinica.examen_fisico[i].tension_arterial_denominador,
                    frecuencia_cardiaca: $scope.historiaClinica.examen_fisico[i].frecuencia_cardiaca,
                    frecuencia_respiratoria: $scope.historiaClinica.examen_fisico[i].frecuencia_respiratoria,
                    dieztro: $scope.historiaClinica.examen_fisico[i].dieztro,
                    zurdo: $scope.historiaClinica.examen_fisico[i].zurdo,
                    ambidiestro: $scope.historiaClinica.examen_fisico[i].ambidiestro,
                    talla: $scope.historiaClinica.examen_fisico[i].talla,
                    peso: $scope.historiaClinica.examen_fisico[i].peso,
                    indiceMasaCorporal: $scope.historiaClinica.examen_fisico[i].indiceMasaCorporal,
                    interpretacion_imc: $scope.historiaClinica.examen_fisico[i].interpretacion_imc._id,
                    fecha: ''
                }


            }).then(function successCallback(response) {


                var hm = JSON.parse(window.localStorage.getItem('hm'));

                hm.examen_fisico.push(response.data._id);

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


                        examen_fisico: hm.examen_fisico


                    }


                }).then(function successCallback(response) {
                    alert('Actulizado Corectamente')
                    $rootScope.noveno = false;

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





    $scope.calcularIMC= function () {

        var resp1=parseFloat($scope.examen_fisico.talla)*parseFloat($scope.examen_fisico.talla);
        $scope.respuestaIMC=(parseFloat($scope.examen_fisico.peso)/(resp1)).toFixed(2);
        console.log($scope.respuestaIMC);
        if($scope.respuestaIMC<18.5){
            $scope.examen_fisico.interpretacion_imc='Bajo Peso'
        }else{
                if($scope.respuestaIMC<=24.9){
                    $scope.examen_fisico.interpretacion_imc='Normal'
                }else{
                    if($scope.respuestaIMC<=29.9){
                        $scope.examen_fisico.interpretacion_imc='Sobrepeso'
                    }else{
                        $scope.examen_fisico.interpretacion_imc='Obesidad'
                    }
                }
        }
    }

}]);
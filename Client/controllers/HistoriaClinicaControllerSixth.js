/**
 * Created by xaipo on 8/31/2016.
 */
app.controller('HistoriaClinicaSixth', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {


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


        $scope.historiaClinica.antescedentes_familiares=$scope.listaAntescedentesFamiliares;
        $scope.historiaClinica.antescedentes_personales=$scope.listaAntescedentesPersonales;

        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/sixth.html';


    }

}]);
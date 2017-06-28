/**
 * Created by xaipo on 12/8/2016.
 */
app.controller('ControllerMorbilidad', ['$scope', '$http', '$location', 'myProvider', '$localStorage', function ($scope, $http, $location, myProvider, $localStorage) {

$scope.morbilidad={


}

    $scope.cedula;
    $scope.pacienteEncontrado;
    $scope.historiaClinica;
    $scope.listaImc=[];
    $scope.urlSeleccionada='';
    $scope.tipo =[];
    $scope.lsita_parentezco=[];
    $scope.listaAntescedentesPersonales=[];
    $scope.contador=0;
    $scope.tipo=[];
    $scope.personal_selected;
    $scope.listaSelectedCie10 = [];
    $scope.listaSelectedCie102 = [];
    $scope.medicos = [];
    $scope.cie10Quitar;
    $scope.cie10Quitar2='';
    $scope.tipoCie10 = [];
    $scope.cie10Selected;
    $scope.cie10Select = '';
    $scope.seleccionada;
    $scope.encontrada = "";
    $scope.cie10 = [];
    $scope.listaCie10Selecionada = [];
    $scope.search1="";
    $scope.search2="";
    $scope.examenes=[];
    $scope.listaExamenes=[];
    $scope.examen={

        codigo:'',
        examen:'',
        normal_anormal:'',
        fecha:'',
        observacion:''

    };
    $scope.contador=0;
    $scope.examenQuitar='';
$scope.now='';
$scope.certificado='';

    $scope.morbilidad={

        antescedentes_personales : '',
        motivo_consulta: '',
        enfermedad_actual: '',
        examen_fisico: '',
        organos_sistemas:[],
        examenes:[],
        diagnostico: '',
        paciente: '',
        fecha:'',
        receta:'',
        indicaciones:''
    }

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
                window.localStorage.setItem("peMor", JSON.stringify($scope.pacienteEncontrado));
                window.open('/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/modificar/modificarAccidenteTrabajo.html','_blank');

            }
        }, function errorCallback(response) {
            console.log('entra');
            //  Console.log(response);
            $scope.mesaje = response.mensaje;

        });


        //  $scope.validateFirst();
    }

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
    $http({

        method: 'GET',
        url: myProvider.getDate(),

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

            console.log(response.data);
                $scope.now=response.data;
                  console.log($scope.now);
                // ;

            //  $scope.tipoActividadSeleccionada=$scope.empresas[0]._id;
            //console.log($scope.empresaSeleccionada);
            // console.log($scope.empresas);


        }


    }, function errorCallback(response) {
        console.log('entra');
        //  Console.log(response);
        $scope.mesaje = response.mensaje;

    });


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

                    alert('no se encontro el c?digo ingresado');
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




    $scope.agregar2=function(){

        if($scope.cie10Quitar!=''&& $scope.cie10Quitar!=undefined){

            $scope.cie10Quitar=JSON.parse($scope.cie10Quitar);
            $scope.listaSelectedCie102.push($scope.cie10Quitar);
        }

    }

    $scope.quitar2=function(){

        if ($scope.cie10Quitar2 != undefined && $scope.cie10Quitar2 != '') {
            $scope.cie10Quitar2 = JSON.parse($scope.cie10Quitar2);
            var n = $scope.listaSelectedCie102.length;
            console.log(n);
            var pos;
            for (var i = 0; i < n; i++) {


                if ($scope.listaSelectedCie102[i].codigo_cie10 == $scope.cie10Quitar2.codigo_cie10) {
                    console.log('entra');

                    pos = i;
                    break;
                }
            }
            console.log(pos);
            $scope.listaSelectedCie102.splice(pos, 1);
            //  console.log($scope.listaRiesgosOcupacionales);
            //  console.log($scope.contador);
        }
    }
    $http({

        method: 'GET',
        url: myProvider.getExamenesLaboratorio(),

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
            $scope.examenes=[];

            for(var i=0;i<n;i++){

                $scope.examenes.push(response.data[i]);

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



    $scope.setClickedRow = function(index,item){  //function that sets the value of selectedRow to current index

        console.log('entra');
        $scope.selectedRow = index;
        $scope.examenQuitar=item;
        // console.log(item);
        // console.log($scope.accidentesTrabajoSelected);

        /*console.log($scope.selectedRow);
         console.log(item);*/
    }



    $scope.agregar = function(){

        $scope.examen.fecha=document.getElementById('datepicker').value;

        //  console.log($scope.selectRevision);
        $scope.examen.codigo=$scope.contador++;
        $scope.examen.examen=JSON.parse($scope.examen.examen);
        // $scope.selectRevision.codigo=$scope.contador++;

        $scope.listaExamenes.push($scope.examen);
        $scope.examen={

            codigo:'',
            examen:'',
            normal_anormal:'',
            fecha:'',
            observacion:''

        };


    }

    $scope.quitar= function (){
        // console.log($scope.accidentesTrabajoSelected);
        var n=  $scope.listaExamenes.length;
        console.log(n);
        var pos;
        for(var i=0;i<n;i++ ){


            if($scope.listaExamenes[i].codigo==$scope.examenQuitar.codigo){
                console.log('entra');

                pos=i;
                break;
            }
        }
        console.log(pos);
        $scope.listaExamenes.splice(pos,1);
        //  console.log($scope.listaRiesgosOcupacionales);
        //  console.log($scope.contador);
    }


    $scope.redirect=function(){
        console.log('entra12');
        $scope.aux=window.localStorage.getItem('usuario');
        $scope.usuario=JSON.parse(window.localStorage.getItem('usuario'));
        console.log($scope.pacienteEncontrado);
        $scope.certificado={'now':$scope.now,
            'nombre_usr':$scope.usuario.nombre,
            'cedula':$scope.pacienteEncontrado.cedula,
            'paciente':$scope.pacienteEncontrado,
            'mmorbilidad':$scope.morbilidad.diagnostico
    }
        console.log($scope.certificado);
       window.localStorage.setItem("cert", JSON.stringify($scope.certificado));
       // window.open('/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/modificar/modificarAccidenteTrabajo.html','_blank');

    }



    $scope.tipoSelected='';
    $scope.listaTipos=[];
    $scope.listaIndicadores=[];
    $scope.listaOrganosSistemas=[];
    $scope.organo_sistema={
        codigo:'',
        observacion:'',
        organo:'',
        normal_anormal:''
    }
    $scope.selectedQuitar;

    $http({

        method: 'GET',
        url: myProvider.getTipoOrgano(),

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
            $scope.listaTipos=[];

            for(var i=0;i<n;i++){

                $scope.listaTipos.push(response.data[i]);

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



    $scope.changeType=function(){


        if($scope.tipoSelected!=''&&$scope.tipoSelected!=undefined){
            //console.log($scope.tipoSelected);
            $scope.tipoSelected=JSON.parse($scope.tipoSelected);
            $http({

                method: 'GET',
                url: myProvider.getOrganos()+"?tipo_organo="+$scope.tipoSelected._id,

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
                    $scope.listaIndicadores=[];

                    for(var i=0;i<n;i++){

                        $scope.listaIndicadores.push(response.data[i]);

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


        }



    }

    $scope.setClickedRow12 = function(index,item){  //function that sets the value of selectedRow to current index

        console.log('entra');
        $scope.selectedRow = index;
        $scope.selectedQuitar=item;
        // console.log(item);
        // console.log($scope.accidentesTrabajoSelected);

        /*console.log($scope.selectedRow);
         console.log(item);*/
    }



    $scope.agregar12 = function(){

        // $scope.inmunizacionAdd.fecha_inmunizacion=document.getElementById('datepicker').value;

        //  console.log($scope.selectRevision);
        $scope.organo_sistema.codigo=$scope.contador++;
        $scope.organo_sistema.organo=JSON.parse($scope.organo_sistema.organo);
        // $scope.selectRevision.codigo=$scope.contador++;

        $scope.listaOrganosSistemas.push($scope.organo_sistema);
        $scope.organo_sistema={
            codigo:'',
            observacion:'',
            organo:'',
            normal_anormal:''
        }


    }

    $scope.quitar12= function (){
        // console.log($scope.accidentesTrabajoSelected);
        var n=  $scope.listaOrganosSistemas.length;
        console.log(n);
        var pos;
        for(var i=0;i<n;i++ ){


            if($scope.listaOrganosSistemas[i].codigo==$scope.selectedQuitar.codigo){
                console.log('entra');

                pos=i;
                break;
            }
        }
        console.log(pos);
        $scope.listaOrganosSistemas.splice(pos,1);
        //  console.log($scope.listaRiesgosOcupacionales);
        //  console.log($scope.contador);
    }



$scope.ingresoMorbilidad=function(){

  //  if($scope.control2()){

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


  //  }else{
        console.log($scope.ausentismo);
        alert('Verifique que todos los datos esten ingresados')
    }


//}



}]);

/**
 * Created by xaipo on 1/29/2016.
 */



app.controller('HistoriaClinicaController', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {

    $scope.mensaje = "";
    $scope.PacienteEncontrado="";
    $scope.pacienteBusqueda="";
    $scope.fechaExamen;
    $scope.tipoHistoria=[];
    $scope.tipoHistoriaSelected="";






    $scope.historiaClinica=  {

        paciente:"",
        fecha_examen:"",
        tipo_examen:"",
        riesgosOcupacionales:[],
        accidentesTrabajo:[],
        ginecoObstetra:[],
        ausentismo:[]

    }

    //realizar el control si tiene una historia clinica vigente



    // <editor-fold defaultstate="collapsed" desc="PreLoad">


        $http({

            method: 'GET',
            url: myProvider.getTipoHistoria1(),

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
                $scope.tipoHistoria=[];
                for(var i=0;i<n;i++){

                    $scope.tipoHistoria.push(response.data[i]);

                }


            }


        }, function errorCallback(response) {
            console.log('entra');
            //  Console.log(response);
            $scope.mesaje = response.mensaje;

        });


    $http({

        method: 'GET',
        url: myProvider.getTipoHistoria1(),

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
            $scope.tipoHistoria=[];
            for(var i=0;i<n;i++){

                $scope.tipoHistoria.push(response.data[i]);

            }


        }


    }, function errorCallback(response) {
        console.log('entra');
        //  Console.log(response);
        $scope.mesaje = response.mensaje;

    });







    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Busqueda Materia Prima">

    function  getMateriaPrima(array) {
        $scope.pacienteEncontrado.puesto_trabajo.materia_prima=[]
        for(var aux in array) {
            $http({
                method: 'GET',
                url: myProvider.getMateriaPrima() + '?_id' +aux,

                headers: {
                    'Content-Type': 'application/json'
                }

            }).then(function successCallback(response) {
                // console.log('url');

                var n = response.data.length;
                // console.log(n);

                if (n == 0) {

                    alert('no se encontro el paciente');

                } else {


                    $scope.pacienteEncontrado.puesto_trabajo.materia_prima.push(response.data[0]);


                }


            }, function errorCallback(response) {

                //  Console.log(response);
                $scope.mesaje = response.mensaje;

            });
          //  console.log($scope.pacienteEncontrado.puesto_trabajo.materia_prima);
        }


    }

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Busqueda Herramientas">

    function  getHerramientas(array) {
        $scope.pacienteEncontrado.puesto_trabajo.herramienta=[]
        for(var aux in array) {
            $http({
                method: 'GET',
                url: myProvider.getHerramientas() + '?_id' +aux,

                headers: {
                    'Content-Type': 'application/json'
                }

            }).then(function successCallback(response) {
                // console.log('url');

                var n = response.data.length;
                // console.log(n);

                if (n == 0) {

                    alert('no se encontro el paciente');

                } else {


                        $scope.pacienteEncontrado.puesto_trabajo.herramienta.push(response.data[0]);
                }


            }, function errorCallback(response) {

                //  Console.log(response);
                $scope.mesaje = response.mensaje;

            });
        }

    }

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Busqueda Ciudad">

    function  getCiudad(id) {
        $http({
            method: 'GET',
            url: myProvider.getCiudad()+"?_id="+id,

            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function successCallback(response) {


            var n = response.data.length;


            if (n == 0) {

                alert('no se encontro el paciente');

            } else {
                $scope.pacienteEncontrado.ciudad = response.data[0];


            }


        }, function errorCallback(response) {


            $scope.mesaje = response.mensaje;

        });

    }

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Busqueda Nivel Estudios">

    function  getNivelEstudios(id) {
        $http({
            method: 'GET',
            url: myProvider.getNivelEstudio()+"?_id="+id,

            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function successCallback(response) {


            var n = response.data.length;


            if (n == 0) {

                alert('no se encontro el paciente');

            } else {
                $scope.pacienteEncontrado.nivel_estudio = response.data[0];
                 //.log($scope.pacienteEncontrado.nivel_estudio);


            }


        }, function errorCallback(response) {


            $scope.mesaje = response.mensaje;

        });

    }

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Busqueda Estado civil">

    function  getEstadoCivil(id) {
        $http({
            method: 'GET',
            url: myProvider.getEstadoCivil()+"?_id="+id,

            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function successCallback(response) {


            var n = response.data.length;


            if (n == 0) {

                alert('no se encontro el paciente');

            } else {
                $scope.pacienteEncontrado.estado_civil = response.data[0];

            }


        }, function errorCallback(response) {


            $scope.mesaje = response.mensaje;

        });

    }

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Busqueda Empresa">

    function  getEmpresa(id) {
        $http({
            method: 'GET',
            url: myProvider.getEmpresa()+"?_id="+id,

            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function successCallback(response) {


            var n = response.data.length;


            if (n == 0) {

                alert('no se encontro el paciente');

            } else {
                $scope.pacienteEncontrado.puesto_trabajo.dependencia.empresa = response.data[0];


            }


        }, function errorCallback(response) {


            $scope.mesaje = response.mensaje;

        });

    }

    // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Busqueda Puesto Trabajo">
    function  getPuestoTrabajo(id){

        $http({
            method: 'GET',
            url: myProvider.getPuestoTrabajo()+"?_id="+id+"&&estado=1",

            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function successCallback(response) {
           // console.log('url');

            var n = response.data.length;
            // console.log(n);

            if(n==0){

                alert('no se encontro el paciente');

            }else {
                $scope.pacienteEncontrado.puesto_trabajo = response.data[0];

                getDependencia($scope.pacienteEncontrado.puesto_trabajo.dependencia);
                getHerramientas($scope.pacienteEncontrado.puesto_trabajo.herramienta);
                getMateriaPrima($scope.pacienteEncontrado.puesto_trabajo.materia_prima);
            }


        }, function errorCallback(response) {

            //  Console.log(response);
            $scope.mesaje = response.mensaje;

        });


    }
             // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc=" busqueda Dependencia">
    function  getDependencia(id){
        //console.log('entra dependencia');
       // console.log(myProvider.getDependencia()+"?_id="+id);
        $http({
            method: 'GET',
            url: myProvider.getDependencia()+"?_id="+id,

            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function successCallback(response) {


            var n = response.data.length;
            // console.log(n);

            if(n==0){

                alert('no se encontro el paciente');

            }else {
                $scope.pacienteEncontrado.puesto_trabajo.dependencia = response.data[0];
              //  console.log($scope.pacienteEncontrado.puesto_trabajo.dependencia.id_empresa);
                getEmpresa($scope.pacienteEncontrado.puesto_trabajo.dependencia.id_empresa)

            }


        }, function errorCallback(response) {

            //  Console.log(response);
            $scope.mesaje = response.mensaje;

        });




    }
        // </editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Busqueda Paciente">
    $scope.searchPaciente=function(){
        $scope.mensaje = "procesando";
        if($scope.pacienteBusqueda!="") {
            //  console.log(myProvider.getPaciente()+"?cedula="+$scope.pacienteBusqueda);
                $http({
                    method: 'GET',
                    url: myProvider.getPaciente()+"?cedula="+$scope.pacienteBusqueda,

                    headers: {
                        'Content-Type': 'application/json'
                    }

                }).then(function successCallback(response) {
                    //console.log('url');

                   var n = response.data.length;
                  //  console.log(n);

                    if(n==0){

                            alert('no se encontro el paciente');
                            $scope.pacienteBusqueda="";
                            $scope.pacienteEncontrado="";
                    }else {
                        var aux = response.data[0];
                       // console.log(aux);
                        $scope.pacienteEncontrado = (aux);

                        getPuestoTrabajo($scope.pacienteEncontrado.puesto_trabajo);
                        getEstadoCivil($scope.pacienteEncontrado.estado_civil);
                        getCiudad($scope.pacienteEncontrado.ciudad);
                        getNivelEstudios($scope.pacienteEncontrado.nivel_estudio);


                    }


                }, function errorCallback(response) {

                    //  Console.log(response);
                    $scope.mesaje = response.mensaje;

                });


        }else{
            $scope.mensaje = "Para ingresar debe llenar el nombre de la empresa";


        }

    };

// </editor-fold >
    // <editor-fold defaultstate="collapsed" desc="Cargar el encabezado de historia clinica">


    $scope.next1= function(){
        //console.log(document.getElementById('datepicker').value);
      //  console.log(angular.element('#datepicker').val());

        $scope.historiaClinica.fecha_examen=document.getElementById('datepicker').value;
       // console.log($scope.historiaClinica.fecha_examen);
        if( $scope.pacienteEncontrado!=""&&$scope.historiaClinica.fecha_examen!="") {


           // var dd=$scope.historiaClinica.fecha_examen;

            //console.log(dd);

            //$scope.historiaClinica.fecha_examen=vec[0];
            var a=confirm("Esta seguro que los datos estan correctos presione si para continuar");
            //console.log(a);
            if(a){
                console.log('entra la ptm');
                    $scope.historiaClinica.paciente = $scope.pacienteEncontrado;
               //console.log('entra la ptm');
                  //  console.log($scope.pacienteEncontrado);
                    window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
                window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/first.html';
                }
        }else{

            alert("para continuar ingreseel paciente y  el tipo de historia clinica a elaborar");
        }
    }

    // </editor-fold>

         var inicializar = function(){


            data = JSON.parse(localStorage.getItem("hc"));
            console.log(data);

        }




    $scope.redirect1=function(url){
    console.log(url);
        window.location =url;
    }


    $scope.load=function(){

        data = JSON.parse(localStorage.getItem("usuario"));
        if(data==null){
            window.location = '/tesisSaludOcupacional/Client/login.html';
        }else{
        $scope.usuarioLog=data;

            }

    }
}]);
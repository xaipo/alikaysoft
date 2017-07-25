'use strict';

// Declare app level module which depends on views, and components
var app = angular.module("myApp", ['ngStorage','ngRoute','angularUtils.directives.dirPagination'])
var server='localhost';

function ApiUrl(){

    this.getUser=function(){
        return 'http://'+server+':3000/api/usuarios';
    }
    this.getHistoriaClinica=function(){
        return 'http://'+server+':3000/api/historiaClinica';
    }
    this.getPaciente=function(){
        return 'http://'+server+':3000/api/pacientes';
    }
    this.getPuestoTrabajo=function(){
        return 'http://'+server+':3000/api/puestoTrabajo';
    }
    this.getDependencia=function(){
        return 'http://'+server+':3000/api/dependencia';
    }
    this.getEmpresa=function(){
        return 'http://'+server+':3000/api/empresa';
    }
    this.getTipoHistoria1=function(){
        return 'http://'+server+':3000/api/tipoHistoria';
    }
    this.getEstadoCivil=function(){
        return 'http://'+server+':3000/api/estadoCivil';
    }
    this.getCiudad=function(){
        return 'http://'+server+':3000/api/ciudad';
    }
    this.getNivelEstudio=function(){
        return 'http://'+server+':3000/api/nivelEstudio';
    }
    this.getHerramientas=function(){
        return 'http://'+server+':3000/api/herramienta';
    }

    this.getProvincia=function(){
        return 'http://'+server+':3000/api/provincia';
    }

    this.getCiudades=function(){
        return 'http://'+server+':3000/api/ciudad';
    }
    this.getCargo=function(){
        return 'http://'+server+':3000/api/cargo';
    }
    this.getMaquinaria=function(){
        return 'http://'+server+':3000/api/maquinaria';
    }
    this.getMateriaPrima=function(){
        return 'http://'+server+':3000/api/materiaPrima';
    }
    this.getProteccion=function(){
        return 'http://'+server+':3000/api/proteccion';
    }
    this.getTipoCie10=function(){
        return 'http://'+server+':3000/api/tipoCie10';
    }
    this.getCie10=function(){
        return 'http://'+server+':3000/api/cie10';
    }
    this.getJornada=function(){
        return 'http://'+server+':3000/api/jornada';
    }
    this.getTipoActividad=function(){
        return 'http://'+server+':3000/api/tipoActividad';
    }
    this.getCualificacion=function(){
        return 'http://'+server+':3000/api/cualificaciones';
    }
    this.getFactoresRiesgo=function(){
        return 'http://'+server+':3000/api/factoresRiesgo';
    }
    this.getAlimentos=function(){
        return 'http://'+server+':3000/api/alimentos';
    }
    this.getParentezco=function(){
        return 'http://'+server+':3000/api/parentezco';
    }
    this.getTipoPersonales=function(){
        return '  http://'+server+':3000/api/tipoPersonales';
    }
    this.getMetodosPlanifiacionFamiliar=function(){
        return ' http://'+server+':3000/api/metodosPlanificacionFamiliar';
    }
    this.getTipoRevisionSistemas=function(){
        return 'http://'+server+':3000/api/tipoRevisionSistemas';
    }
    this.RevisionSistemas=function(){
        return 'http://'+server+':3000/api/revisionSistemas';
    }
    this.getVacunas=function(){
        return 'http://'+server+':3000/api/vacuna';
    }
    this.getTipoHabitoToxico=function(){
        return 'http://'+server+':3000/api/tipoHabitoToxico';
    }
    this.getTipoConsumidor=function(){
        return 'http://'+server+':3000/api/tipoConsumidor';
    }
    this.getDetalleFactoresRiesgo=function(){
        return 'http://'+server+':3000/api/detallefactorriesgo';
    }
    this.getInterpretacionIMC=function(){
        return 'http://'+server+':3000/api/interpretacionIMC';
    }
    this.getTipoOrgano=function(){
        return 'http://'+server+':3000/api/tipoOrgano';
    }
    this.getOrganos=function(){
        return 'http://'+server+':3000/api/Organos';
    }
    this.getExamenesLaboratorio=function(){
        return 'http://'+server+':3000/api/examenLaboratorio';
    }
    this.getExamenesParclinicos=function(){
        return 'http://'+server+':3000/api/examenParaclinico';
    }
    this.getResultadoExamenesParclinicos=function(){
        return 'http://'+server+':3000/api/resultadoParaclinico';
    }
    this.getMedico=function(){
        return 'http://'+server+':3000/api/medico';
    }
    this.getAusentismo=function(){
        return 'http://'+server+':3000/api/ausentismoCompleto';
    }
    this.getRiesgosOcupacionales=function(){
        return 'http://'+server+':3000/api/riegosOcupacionales';
    }
    this.getAccidentesTrabajo=function(){
        return 'http://'+server+':3000/api/accidentesTrabajo';
    }
    this.getGinecoObstetra=function(){
        return 'http://'+server+':3000/api/ginecoObstetra';
    }
    this.getAusentismo1=function(){
        return 'http://'+server+':3000/api/ausentismo';
    }
    this.getEnfermedadesActualesHistoricas=function(){
        return 'http://'+server+':3000/api/enfermedadesActualesHistoricas';
    }
    this.getFamiliares=function(){
        return 'http://'+server+':3000/api/familiares';
    }
    this.getPersonales=function(){
        return 'http://'+server+':3000/api/personales';
    }
    this.getImnunizacion=function(){
        return 'http://'+server+':3000/api/inmunizacion';
    }
    this.gethabitosToxicos=function(){
        return 'http://'+server+':3000/api/habitosToxicos';
    }
    this.getOrganoSelected=function(){
        return 'http://'+server+':3000/api/organosSelected';
    }
    this.getExamenesPracticados=function(){
        return 'http://'+server+':3000/api/examenesPracticados';
    }
    this.getParaclinico=function(){
        return 'http://'+server+':3000/api/paraclinicoSeleccionado';
    }
    this.getExamenFisico=function(){
        return 'http://'+server+':3000/api/examenFisico';
    }
    this.getHistoriaClinica=function(){
        return 'http://'+server+':3000/api/historiaClinica';
    }
    this.getDate=function(){
        return 'http://'+server+':3000/api/getDate';
    }
    this.getToken=function(){
        return 'http://'+server+':3001/token';
    }
    this.getCreacionGenerica=function(){
        return 'http://'+server+':3001/api/create';
    }
    this.getCapituloCie=function(){
        return 'http://'+server+':3000/api/capitulosCie10';
    }
}

app.factory("myProvider",function(){
   // console.log("factory function");
    return new ApiUrl();

});


    app.config (function($routeProvider ,$provide){
   //$locationProvider.html5Mode(true);
        $routeProvider.when("/", {templateUrl: "inicio.html"});
        $routeProvider.when("/RHC", {
            templateUrl: "HistoriaClinica/registroHistoriaClinica.html",
            controller: 'HistoriaClinicaController'
        });


    $routeProvider.when("/newEmpresa",{templateUrl:"/tesisSaludOcupacional/Client/Administrator/Empresa/ingresarEmpresa.html", controller:'EmpresaController'});
    $routeProvider.when("/newHistory",{templateUrl:"/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/newClinicHistory.html", controller:'HistoriaClinicaController'});
    $routeProvider.when("/first",{templateUrl:"/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/first.html", controller:'HistoriaClinicaController'});
    $routeProvider.when("/second",{templateUrl:"/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/second.html", controller:'HistoriaClinicaController'});

        /*$provide.factory("ApiUrl", function () {
            return {
                urlUsuarios: 'http://'+server+':3000/api/usuarios'
            };
        })*/

        //$provide.value('urlUsuarios', 'http://'+server+':3000/api/usuarios');




});



//('urlUsuarios', 'http://'+server+':3000/api/usuarios');



    /*app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/newEmpresa', { templateUrl: '/tesisSaludOcupacional/Client/Administrator/newEmpresa.html', controller: 'EmpresaController' });
        $routeProvider.when('/', { templateUrl: '/indexAdmin.html' });
        $routeProvider.otherwise({ redirectTo: '/error' });

    }]);*/


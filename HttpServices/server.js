// <editor-fold defaultstate="collapsed" desc="Dependencias">
var express = require('express');
var mongoose=  require('mongoose');
var bodyParser= require('body-parser');
var cors = require('cors');
// </editor-fold>

// <editor-fold defaultstate="collapsed" desc="MongoDb">
//mongoose.connect('mongodb://localhost/TesisSaludOcupacional');
//mongoose.connect('xaipo:xaipo14@ds064278.mlab.com:64278/MongoLab-l');


mongoose.connect('mongodb://localhost/SaludOcupacional', function(error){
//mongoose.connect('mongodb://localhost/salud_ocupacional', function(error){
    if(error){
        throw error;
    }else{
        console.log('Conectado a MongoDB');
    }
});
// </editor-fold>



// <editor-fold defaultstate="collapsed" desc="Express">
var app= express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());// permite angular interactuar
// </editor-fold>

// <editor-fold defaultstate="collapsed" desc="Routes">

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use('/api',require('./Routes/apiUsuarios'));
app.use('/api',require('./Routes/apiEmpresa'));
app.use('/api',require('./Routes/apiDependencia'));
app.use('/api',require('./Routes/apiJornada'));
app.use('/api',require('./Routes/apiMateriaPrima'));
app.use('/api',require('./Routes/apiHerramienta'));
app.use('/api',require('./Routes/apiMaquinaria'));
app.use('/api',require('./Routes/apiProteccion'));
app.use('/api',require('./Routes/apiProvincia'));
app.use('/api',require('./Routes/apiCiudad'));
app.use('/api',require('./Routes/apiEstadoCivil'));
app.use('/api',require('./Routes/apiNivelEstudio'));
app.use('/api',require('./Routes/apiCargo'));
app.use('/api',require('./Routes/apitTipoHistoria'));
app.use('/api',require('./Routes/apiLimitaciones'));
app.use('/api',require('./Routes/apiRecomendaciones'));
app.use('/api',require('./Routes/apiTipoActividad'));
app.use('/api',require('./Routes/apiFactorRiesgo'));
app.use('/api',require('./Routes/apiCualificacion'));
app.use('/api',require('./Routes/apiAlimentos'));
app.use('/api',require('./Routes/apiTipoCie10'));
app.use('/api',require('./Routes/apiTratamientoCIE10'));
app.use('/api',require('./Routes/apiParentezco'));
app.use('/api',require('./Routes/apiTipoPersonales'));
app.use('/api',require('./Routes/apiTipoRevisionSistemas'));
app.use('/api',require('./Routes/apiTipoHabitoToxico'));
app.use('/api',require('./Routes/apiTipoConsumidor'));
app.use('/api',require('./Routes/apiInterpretacionIMC'));
app.use('/api',require('./Routes/apiVacuna'));
app.use('/api',require('./Routes/apiTipoOrgano'));
app.use('/api',require('./Routes/apiExamenLaboratorio'));
app.use('/api',require('./Routes/apiExamenParaclinico'));
app.use('/api',require('./Routes/apiRespuestas'));
app.use('/api',require('./Routes/apiPreguntasInterfaz'));
app.use('/api',require('./Routes/apiProtocolo'));
app.use('/api',require('./Routes/apiPuestoTrabajo'));
app.use('/api',require('./Routes/apiPaciente'));
app.use('/api',require('./Routes/apiRiesgosOcupacionales'));
app.use('/api',require('./Routes/apiAccidentesTrabajo'));
app.use('/api',require('./Routes/apiCie10'));
app.use('/api',require('./Routes/apiModeloEnfermedadesActualesHistoricas'));
app.use('/api',require('./Routes/apiAusentismo'));
app.use('/api',require('./Routes/apiFamiliares'));
app.use('/api',require('./Routes/apiPersonales'));
app.use('/api',require('./Routes/apiAntescedentesSalud'));
app.use('/api',require('./Routes/apiMetodosPlanifiacionFamiliar'));
app.use('/api',require('./Routes/apiGinecologiaObstetra'));
app.use('/api',require('./Routes/apiRevisionSistemas'));
app.use('/api',require('./Routes/apiInmunizacion'));
app.use('/api',require('./Routes/apiHabitosToxicos'));
app.use('/api',require('./Routes/apiExamenFisico'));
app.use('/api',require('./Routes/apiOrgano'));
app.use('/api',require('./Routes/apiOrganoSelected'));
app.use('/api',require('./Routes/apiExamenesPracticados'));
app.use('/api',require('./Routes/apiExamenParaclinico'));
app.use('/api',require('./Routes/apiResultadoParaclinico'));
app.use('/api',require('./Routes/apiParaclinicoSeleccionado'));
app.use('/api',require('./Routes/apiHistoriaClinica'));
app.use('/api',require('./Routes/apiReportes'));
app.use('/api',require('./Routes/apiDetalleFactorRiesgo'));
app.use('/api',require('./Routes/apiAusentismoCompleto'));
app.use('/api',require('./Routes/apiMedico'));
app.use('/api',require('./Routes/apiMorbilidad'));
app.use('/api',require('./Routes/apiGetDate'));

// </editor-fold >

// <editor-fold defaultstate="collapsed" desc="Server Run">
app.listen(3000);
console.log("servidor ejecutando en el puerto 3000");

// </editor-fold>
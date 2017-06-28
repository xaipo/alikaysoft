/**
 * Created by xaipo on 7/19/2016.
 */
app.controller('HistoriaClinicaThird', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {



    $scope.listaAccidentesTrabajo=[];
    $scope.listaDetalleFactorRiesgo=[];
    $scope.accidentesTrabajo={
        codigo:"",
        fecha_ocurrencia:"" ,
        nombre_empresa:"",
        naturaleza_lesion:"",
        parte_cuerpo_afectada:"",
        dias_incapacidad:"",
        secuelas:""
    };
    $scope.accidentesTrabajoSelected="";

    $scope.contador=0;
    $scope.mapAccidentesTrabajo= new Map();

    $scope.empresas;

    $scope.getHistoria= function(){

        $scope.historiaClinica=JSON.parse(window.localStorage.getItem('hC'));
        console.log($scope.historiaClinica);

    }


    $scope.agregar= function (){


        $scope.accidentesTrabajo.fecha_ocurrencia= document.getElementById(('datepicker')).value;
        $scope.accidentesTrabajo.nombre_empresa= JSON.parse($scope.accidentesTrabajo.nombre_empresa);
        $scope.accidentesTrabajo.codigo=$scope.contador;
        $scope.contador++;
        $scope.listaAccidentesTrabajo.push($scope.accidentesTrabajo);
        console.log($scope.listaAccidentesTrabajo);
        //$scope.mapAccidentesTrabajo.set($scope.accidentesTrabajo.codigo,$scope.accidentesTrabajo);
       // console.log($scope.mapAccidentesTrabajo.entries());
        $scope.accidentesTrabajo={
            codigo:"",
            fecha_ocurrencia:"" ,
            nombre_empresa:"",
            naturaleza_lesion:"",
            parte_cuerpo_afectada:"",
            dias_incapacidad:"",
            secuelas:""
        };
        //console.log($scope.mapAccidentesTrabajo);




            }


  $scope.quitar= function (){
        console.log($scope.accidentesTrabajoSelected);
        var n=  $scope.listaAccidentesTrabajo.length;
      console.log(n);
        var pos;
        for(var i=0;i<n;i++ ){

            if($scope.listaAccidentesTrabajo[i].codigo==$scope.accidentesTrabajoSelected.codigo){
                console.log(i);
                console.log($scope.accidentesTrabajoSelected.codigo);
                console.log($scope.listaAccidentesTrabajo[i].codigo);

                pos=i;
                break;
            }
        }
        console.log(pos);
        $scope.listaAccidentesTrabajo.splice(pos,1);
      //  console.log($scope.listaRiesgosOcupacionales);
      //  console.log($scope.contador);
    }


    // <editor-fold defaultstate="collapsed" desc="Cargar empresa">
    $http({

        method: 'GET',
        url: myProvider.getEmpresa(),

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
            $scope.empresas=[];

            for(var i=0;i<n;i++){

                $scope.empresas.push(response.data[i]);

                // console.log($scope.empresas);
            }
            $scope.empresaSeleccionada=$scope.empresas[0]._id;
            //console.log($scope.empresaSeleccionada);
            // console.log($scope.empresas);


        }


    }, function errorCallback(response) {
        console.log('entra');
        //  Console.log(response);
        $scope.mesaje = response.mensaje;

    });

    // </editor-fold >



    $scope.setClickedRow = function(index,item){  //function that sets the value of selectedRow to current index

        console.log('entra');
        $scope.selectedRow = index;
        $scope.accidentesTrabajoSelected=item;
        console.log(item);
        console.log($scope.accidentesTrabajoSelected);

        /*console.log($scope.selectedRow);
         console.log(item);*/
    }


    $scope.saveThird= function (){


        $scope.historiaClinica.accidentesTrabajo=$scope.listaAccidentesTrabajo;
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/third.html';



    }
    $scope.skipt2= function (){


        $scope.accidentesTrabajo={
            codigo:"",
            fecha_ocurrencia:"" ,
            nombre_empresa:"",
            naturaleza_lesion:"no aplica",
            parte_cuerpo_afectada:"",
            dias_incapacidad:"",
            secuelas:""
        };

        $scope.listaAccidentesTrabajo=[];
        $scope.listaAccidentesTrabajo.push($scope.accidentesTrabajo);
        $scope.historiaClinica.accidentesTrabajo=$scope.listaAccidentesTrabajo;
        window.localStorage.setItem("hC", JSON.stringify($scope.historiaClinica));
        window.location ='/tesisSaludOcupacional/Client/Administrator/HistoriaClinica/third.html';



    }



}]);
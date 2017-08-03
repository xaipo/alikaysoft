/**
 * Created by xaipo on 8/2/2017.
 */
app.controller('PacienteDiscapacidad', ['$scope', '$http', '$location','myProvider','$localStorage',  function ($scope,$http,$location,myProvider,$localStorage) {


    ;(function($){
        $.fn.datepicker.dates['es'] = {
            days: ["Domingo", "Lunes", "Martes", "Mi�rcoles", "Jueves", "Viernes", "S�bado"],
            daysShort: ["Dom", "Lun", "Mar", "Mi�", "Jue", "Vie", "S�b"],
            daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
            months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            today: "Hoy",
            monthsTitle: "Meses",
            clear: "Borrar",
            weekStart: 1,
            format: "dd/mm/yyyy"
        };
    }(jQuery));

    $(function () {




        $('.datepicker').datepicker({

            language: 'es',
        });



        $('.datepicker').datepicker('setDates', [])

    });



    $scope.iniciar=function(){




    }


    $scope.discapacidad={


    }


}]);
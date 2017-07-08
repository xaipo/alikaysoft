/**
 * Created by xaipo on 9/30/2015.
 */

app.controller('citasControler', ['$scope', '$http', '$location', 'myProvider', '$localStorage', '$timeout', function ($scope, $http, $location, myProvider, $localStorage, $timeout) {

    console.log(myProvider.getUser());

    $scope.login = function () {
        $scope.mensaje = "procesando";
        var url = myProvider.getUser() + '?nombre_usuario=' + $scope.usuario;
        console.log(url);

        $http({
            method: 'GET',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            //  console.log(response.data[0].nombre_usuario);
            console.log(response.data);
            $scope.usuario1 = angular.fromJson(response.data[0]);
            console.log($scope.usuario1);
            //    console.log($scope.usuario1.nombre_usuario);
            //   console.log($scope.usuario1.contrasena);
            //   console.log($scope.usuario1._id);
            if (response.data.length > 0) {

                if ($scope.usuario1.nombre_usuario == $scope.usuario && $scope.usuario1.contrasena == $scope.password) {
                    console.log($scope.usuario1.contrasena);
                    $scope.mensaje = "Bienvenido " + response.data[0].nombre_usuario.toString();
                    // $rootScope.usuarioLogin=$scope.usuario1;
                    //$localStorage.usr=$scope.usuario1;
                    switch (response.data[0].tipo_usuario) {
                        case 1:
                            console.log($scope.usuario1);
                            window.localStorage.setItem("usuario", JSON.stringify($scope.usuario1));
                            window.location = 'Administrator/indexAdmin.html';

                            break;
                        case 2:
                            window.localStorage.setItem("usuario", JSON.stringify($scope.usuario1));
                            window.location = 'SysAdmin/indexAdmin.html';
                            break;
                        case 3:
                            window.localStorage.setItem("usuario", JSON.stringify($scope.usuario1));
                            window.location = 'Administrator/CieUser/ConfiguracionCIe10.html';
                            break;
                        default:

                            alert('El tipo de usuario no tiene permiso para ningun sistema')
                    }

                    //  console.log($rootScope.usuarioLogin);
                    //   $location.replace();


                } else {

                    $scope.mensaje = "Revise su usuario y password";
                }

            } else {

                $scope.mensaje = "Revise su usuario y password";
                alert('Revise su usuario y password');

            }
            console.log(response);

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            Console.log(response);
            $scope.mesaje = response.mensaje;

        });
    };

    //  console.log($rootScope.usuarioLogin);


    $timeout(function () {

        $(".timepicker").timepicker({
            showInputs: false
        });

    }, 0, false);


    //Date picker
    $('#datepicker').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true
    });


    $scope.evento = {};


    var listado = [];

    $http({

        method: 'GET',
        url: 'http://localhost:3000/api/eventos',

        headers: {
            'Content-Type': 'application/json'
        }

    }).then(function successCallback(response) {


        console.log(response.data);
        listado = response.data;

    }, function errorCallback(response) {
        console.log('entra');


    });

    var listado1 = [];


    $http({

        method: 'GET',
        url: 'http://localhost:3000/api/eventos?estado=ocupado',


        headers: {
            'Content-Type': 'application/json'
        }

    }).then(function successCallback(response) {


        console.log(response.data);

        var n = response.data.length;

        for (var i = 0; i < n; i++) {

            response.data[i].title = "ocupado";
            listado1.push(response.data[i]);

        }


    }, function errorCallback(response) {
        console.log('entra');


    });

    $scope.horario = {};

    // formato de ingreso "2017-07-12T14:00:00-05:00"


    var date = new Date(),
        d = date.getDate(),
        m = date.getMonth(),
        y = date.getFullYear(),
        started,
        categoryClass;


    function Calendario(lista) {
        var calendar = $('#calendar1').fullCalendar({
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            selectable: true,
            selectHelper: true,
            /*select: function(start, end, allDay) {
             $('#fc_create').click();

             started = start;
             ended = end;
             console.log(started);
             console.log(ended);

             $(".antosubmit").on("click", function() {
             var title = $("#title").val();
             if (end) {
             ended = end;
             }

             categoryClass = $("#event_type").val();

             if (title) {
             calendar.fullCalendar('renderEvent', {
             title: title,
             start: started,
             end: end,
             allDay: allDay,


             backgroundColor: "#00c0ef", //Info (aqua)
             borderColor: "#00c0ef" //Info (aqua)
             },
             true // make the event "stick"
             );



             }

             $('#title').val('');

             calendar.fullCalendar('unselect');

             $('.antoclose').click();

             return false;
             });
             }
             */
            eventClick: function (calEvent, jsEvent, view) {
                $('#fc_edit').click();


                ver(calEvent);
                categoryClass = $("#event_type").val();

                $(".antosubmit2").on("click", function () {
                    calEvent.title = $("#title2").val();

                    calendar.fullCalendar('updateEvent', calEvent);

                    guardar(calEvent);


                });

                calendar.fullCalendar('unselect');
            },
            editable: true,
            events: lista

        });
    }


    $timeout(function () {
        Calendario(listado);
    }, 100, false);


    function ver(obj) {

        $('#title2').val(obj.title);
        $('#descr2').val(obj.evento.descripcion);
        $('#correo').val(obj.evento.email);
        $('#estado').val(obj.estado);
        $('#celular').val(obj.evento.celular);
        console.log(obj);


    }


    function guardar(obj) {


        console.log(obj);

        var aux = $("#estado").val();

        console.log(aux);
        var color = "#00c0ef";


        if (aux == "cancelado") {
            color = "#ff9250";
        }

        if (aux == "ocupado") {
            color = "#88f200";
        }


        $http({
            method: 'PUT',
            url: 'http://localhost:3000/api/eventos' + '/' + obj._id,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {

                estado: $("#estado").val(),
                backgroundColor: color,
                borderColor: color

            }


        }).then(function successCallback(response) {

            console.log(response.data);


        }, function errorCallback(response) {


        });


    }

    $timeout(function () {


        var calendar = $('#calendar').fullCalendar({
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },

            selectable: true,
            selectHelper: true,

            editable: false,


            events: listado1

        });

    }, 500, false);


    $scope.agregar = function () {


        var aux = document.getElementById('datepicker').value.toString();
        var vec = aux.split("T");


        console.log(vec[0]);

        var aux1 = document.getElementById('timepicker').value.toString();
        var vec1 = aux1.split(":");

        console.log(vec1);
        var vec3 = vec[0].split("/");

        console.log(vec3);
        var vec2 = vec1[1].split(" ");

        console.log(vec2);

        console.log($scope.evento);
        var hora;

        if (vec2[1] == "PM") {
            hora = ( parseInt(vec1[0]) + 12).toString();

        } else {
            hora = vec1[0];
        }

        var fecha1 = "" + vec3[2] + "-" + vec3[1] + "-" + vec3[0] + "T" + hora + ":" + vec2[0] + ":00";
        console.log(fecha1);


//sumar 12 a las horas si es pm

        // formato de ingreso "2017-07-12T14:00:00-05:00"


        $http({
            method: 'POST',
            url: 'http://localhost:3000/api/eventos',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                title: $scope.evento.titulo,
                evento: $scope.evento,
                start: fecha1,
                end: fecha1,
                backgroundColor: "#00c0ef",
                borderColor: "#00c0ef",
                estado: "pendiente"

            }


        }).then(function successCallback(response) {
            console.log(response.data);


        }, function errorCallback(response) {

        });


    };


    $scope.filtroPendiente = function () {


        if (true == $scope.a.ocupados) {

            $('#calendar1').fullCalendar('destroy');

            console.log("esta marcado pendientes");

            var pendientes = [];
            var aprobados = [];
            var total = [];
            $.getJSON('http://localhost:3000/api/eventos?estado=pendiente', function (data) {
                console.log(data);
                pendientes = data;

            });

            $.getJSON('http://localhost:3000/api/eventos?estado=ocupado', function (data) {
                console.log(data);
                aprobados = data;

            });

            $timeout(function () {
                total = pendientes.concat(aprobados);
                Calendario(total);
            }, 100, false);
        }
        else {

            if (true == $scope.a.pendientes) {


                console.log($scope.a.pendientes);


                $('#calendar1').fullCalendar('destroy');

                $.getJSON('http://localhost:3000/api/eventos?estado=pendiente', function (data) {
                    console.log(data);
                    Calendario(data);

                });


            } else {

                $('#calendar1').fullCalendar('destroy');
                console.log($scope.a.pendientes);
                Calendario(listado);
            }


        }


    };


    $scope.filtroOcupado = function () {

        if (true == $scope.a.pendientes) {

            $('#calendar1').fullCalendar('destroy');

            console.log("esta marcado pendientes");

            var pendientes = [];
            var aprobados = [];
            var total = [];
            $.getJSON('http://localhost:3000/api/eventos?estado=pendiente', function (data) {
                console.log(data);
                pendientes = data;

            });

            $.getJSON('http://localhost:3000/api/eventos?estado=ocupado', function (data) {
                console.log(data);
                aprobados = data;

            });

            $timeout(function () {
                total = pendientes.concat(aprobados);
                Calendario(total);
            }, 100, false);
        }
        else {


            if (true == $scope.a.ocupados) {


                console.log($scope.a.ocupados);


                $('#calendar1').fullCalendar('destroy');

                $.getJSON('http://localhost:3000/api/eventos?estado=ocupado', function (data) {
                    console.log(data);
                    Calendario(data);

                });


            } else {

                $('#calendar1').fullCalendar('destroy');
                console.log($scope.a.pendientes);
                Calendario(listado);
            }


        }


    }


    $scope.filtroCancelado = function () {


        if (true == $scope.a.cancelados) {


            console.log($scope.a.cancelados);


            $('#calendar1').fullCalendar('destroy');

            $.getJSON('http://localhost:3000/api/eventos?estado=cancelado', function (data) {
                console.log(data);
                Calendario(data);

            });


        } else {

            $('#calendar1').fullCalendar('destroy');
            console.log($scope.a.cancelados);
            Calendario(listado);
        }

    }

}]);

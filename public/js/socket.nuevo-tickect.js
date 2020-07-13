// comando para establecer la conexion

var socket = io();

//Para acceder a un elemento del html por el nombre y utilizarlo como variable
var label = $('#lblNuevoTicket');

// on para escuchar del servidor
socket.on('connect', function() {
    console.log('Concetado al servidor');
});

// Se ejecuta cuando perdemos la conexion con el servidor
socket.on('disconnect', function() {
    console.log('Servidor desconectado');
});

// escuchamos informacion del servidor por medio del listener estadoActual
socket.on('estadoActual', function(estadoActual) {
    console.log('Servidor: ', estadoActual);
    label.text(estadoActual.actual);
});

// Todos los botones de la pantalla, cuando hagan click lanzaran la funcion
$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        console.log(siguienteTicket);
        label.text(siguienteTicket);
    });
});
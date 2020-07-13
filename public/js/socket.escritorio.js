// comando para establecer la conexion

var socket = io();

var searchParam = new URLSearchParams(window.location.search);

// sino viene el parametro escritorio en la url, nos volvemos a la pantalla index.html
if (!searchParam.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParam.get('escritorio');
var label = $('small');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay tickets') {
            alert(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);
    });
});
// on para escuchar del servidor
socket.on('connect', function() {
    console.log('Concetado al servidor');
});

// Se ejecuta cuando perdemos la conexion con el servidor
socket.on('disconnect', function() {
    console.log('Servidor desconectado');
});
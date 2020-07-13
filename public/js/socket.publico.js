// comando para establecer la conexion

var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var tickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var escritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

// on para escuchar del servidor
socket.on('connect', function() {
    console.log('Concetado al servidor');
});

// Se ejecuta cuando perdemos la conexion con el servidor
socket.on('disconnect', function() {
    console.log('Servidor desconectado');
});

socket.on('estadoActual', function(data) {
    actualizaHTML(data.ultimos4);
});

socket.on('ultimos4', async function(data) {
    const audio = new Audio('audio/new-ticket.mp3');
    await audio.play();
    actualizaHTML(data.ultimos4);
});

function actualizaHTML(ultimos4) {
    for (var i = 0; i <= ultimos4.length - 1; i++) {
        tickets[i].text('Tickect ' + ultimos4[i].numero);
        escritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}
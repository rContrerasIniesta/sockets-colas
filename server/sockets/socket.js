const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();
io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();
        // Mostrar cual es el siguiente ticket
        console.log(`Ticket ${siguiente}`);

        callback(siguiente);
        if (!callback) return;

    });

    // emitir un evento estadoActual
    client.emit('estadoActual', {
        actual: ticketControl.getUltimo(),
        ultimos4: ticketControl.ultimos4
    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);


        callback(atenderTicket);

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.ultimos4
        });

        if (!callback) return;
        // actualizar/notificar cambios en los ultimos 4

    });

});
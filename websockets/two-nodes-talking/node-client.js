const websocket = require('ws');

// ws module acts as both server and client

// server = const wss = new websocket.webscoketserver({port:3000})

// client = const ws = new websocket('ws://localhost:3000')

const ws = new websocket('ws://localhost:3000');

console.log('\n serach for the header below to understand how a client connects to websocket by upgrading http');
console.log(ws)

ws.on('open', (onopen) => {
    // fires when opens (only when the connection is established)

    // IMPORTANT: only send messages after this fires

    console.log("Connected !")
})

ws.on('close', (data) => {
    // fires when connections closed or any server crashes.

    console.log("Dis connected !!")
    console.log("see why its dis connected !")
})

ws.on('message', (data) => {
    // fires when server.js sends us something

    console.log('\n message from server is \n', data.toString());
})

setInterval(() => {                                 
    ws.send('Hello');
}, 3000);


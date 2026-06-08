// console.log("hi")
require('dotenv').config() 
const WebSocket = require('ws')  

// const { WebSocketServer } = require('ws') 

PORT = process.env.PORT

const wss = new WebSocket.WebSocketServer({ port: PORT }) // WebSocketServer ----> this is a server object. 
 // any client connecting to ws://localhost:3000 lands here

                            
if(wss){
    console.log(`websocketserver running in ${PORT}`)
}else{
    throw console.error("error");
}


wss.on('connection', (thangacallbacksocket) => {

    // fires every time a connection connects the socket.
    // thangacallback -> stores the individual or specific client socket details
    // 10 clients means 10 thangacallback objects. each objects stores its client socket details.

    console.log("see if you can find anything about 101 response or something to understand better")

    console.log('\n details about the client socket \n', thangacallbacksocket);

    thangacallbacksocket.on('message', (msg) => {
        // fires every time a message pops up / hits the socket.
        // msg ---->  this is a raw buffer, one must call .tostring() to read it.
        console.log('message from the browser / client !')
        console.log('Okay ! Reading the message \n the message is \n', msg.toString());


        if(msg.toString().toLowerCase() === 'hello'){
            thangacallbacksocket.send('thanga world !!')
        }
    })



})


// simple demo to see 101 and client IP address

wss.on('connection', (websocket,req) => {

    console.log('\n req header \n', req.headers);

    console.log('\n client IP address \n', req.socket.remoteAddress);

})
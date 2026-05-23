import http from 'http';

const PORT = 3000;

const server = http.createServer((req, res) => {
    // res.write('Hello thanga')
    // we can change the content type too


    // res.setHeader('content-Type' , 'text/html')
    // res.statusCode=404

    // Instead of above, we can have 'writeHead'

    res.writeHead(200, {'content-type' : 'application/json'} )


    res.end(JSON.stringify({message : 'From thanga'}))
})

server.listen(PORT, () => {
    console.log(`server listening on ${PORT} `)
})

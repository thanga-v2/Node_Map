import http from 'http';

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.write('Hello thanga')
    res.end()
})

server.listen(PORT, () => {
    console.log(`server listening on ${PORT} `)
})

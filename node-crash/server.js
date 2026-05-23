import { error } from 'console';
import http from 'http';

const PORT = process.env.PORT;
const API = process.env.API;

const server = http.createServer((req, res) => {
    // res.write('Hello thanga')
    // we can change the content type too


    // res.setHeader('content-Type' , 'text/html')
    // res.statusCode=404

    // Instead of above, we can have 'writeHead'

    // console.log("\nurl\n",req.url)
    // console.log("\nmethod\n",req.method)

    try {

        if (req.method === 'GET'){

            // creating a simple router

            if(req.url === "/") {

                res.writeHead(200, {'content-type' : 'application/json'} )
                res.end(JSON.stringify({message : 'From thanga'}))
        
            }else if(req.url === "/trustgrid") {
        
                res.writeHead(200, {'content-type' : 'application/json'} )
                res.end(JSON.stringify(
                    {message : 'For TrustGrid', reponse : "from TrustGrid"},
                ))
        
            }else {
        
                res.writeHead(404, {'content-type' : 'text/html'} )
                res.end('<h1> Not found </h1>')
            } 
        }else {
            throw new Error('Method not allowed');
        }
        
    } catch (error) {

        res.writeHead(500, {'content-type' : 'text/plain'} )
        res.end('Server Error')
        
    }





})

server.listen(PORT, () => {
    console.log(`server listening on ${PORT} `)
})

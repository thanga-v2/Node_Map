import { error } from 'console';
import http from 'http';

import url from 'url';                // ----> to import the file and directory names
import fs from 'fs/promises';
import path from 'path';

const PORT = process.env.PORT;
const API = process.env.API;

const __filename = url.fileURLToPath(import.meta.url) // ----> to import the file and directory names
const __dirname = path.dirname(__filename);

console.log(__dirname, __filename);

const server = http.createServer(async(req, res) => {
    // res.write('Hello thanga')
    // we can change the content type too


    // res.setHeader('content-Type' , 'text/html')
    // res.statusCode=404

    // Instead of above, we can have 'writeHead'

    // console.log("\nurl\n",req.url)
    // console.log("\nmethod\n",req.method)

    try {

        if (req.method === 'GET'){

            let filepath;

            // creating a simple router

            if(req.url === "/") {

                // adding the html file instead
                // res.writeHead(200, {'content-type' : 'application/json'} )
                // res.end(JSON.stringify({message : 'From thanga'}))

                filepath = path.join(__dirname, 'public', 'index.html')  // this will go to __dirname/public/index.html
        
            }else if(req.url === "/trustgrid") {

                // adding the html file instead

                // res.writeHead(200, {'content-type' : 'application/json'} )
                // res.end(JSON.stringify(
                //     {message : 'For TrustGrid', reponse : "from TrustGrid"},
                // ))

                filepath = path.join(__dirname, 'public', 'about-trustgrid.html')  // this will go to __dirname/public/about-trustgrid.html
        
            }else {
        
                // res.writeHead(404, {'content-type' : 'text/html'} )
                // res.end('<h1> Not found </h1>')

                throw new Error('Not Found');
            } 
            const data = await fs.readFile(filepath);
            res.setHeader('Content-Type', 'text/html');
            res.write(data);
            res.end()
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

import {createServer} from 'http';

const PORTNEW = process.env.PORTNEW;

const users = [
    {id:1, name : "Jumbo"},
    {id:2, name : "Mumbo"},
    {id:3, name : "Dumbo"},
    {id:4, name : "Bumbo"},
]


// Logger Middleware

const logger = (req,res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

// JSON middleware
const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
}

// Route handler for GET /api/users or /listuser

const getUsersHandler = (req, res) => {
    
    res.write(JSON.stringify(users));
    res.end();

}

// Route Handler for GET /api/users/:id
const getUserByIdHandler = (req,res) => {
    const id = req.url.split('/')[3];
    // console.log("\n", id);

    const user = users.find((user) => user.id === parseInt(id));             
    if (user) {
        res.write(JSON.stringify(user));
        res.end();
    } else {
        res.statusCode = 404;
        res.write(JSON.stringify({message:"user not found"}));
        res.end();
    }

}



// Route handler for Not Found

const NotFoundHandler = (req, res) => {

    res.statusCode = 404;
    res.write(JSON.stringify({message : "Route not found"}));
    res.end();

}

const MySimpleServer = createServer((req,res) => {

    // we have to wrap the entire logic into middleware

    // logger(req, res, () => {

    //     if(req.url === '/listuser' & req.method === 'GET'){
    //         res.setHeader('Content-Type', 'application/json');
    //         res.write(JSON.stringify(users));
    //         res.end();
    //     } else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') { // /api/users/1 /api/users/2 /api/users/3 etc
            
    //         // to get the id from the api
    
    //         const id = req.url.split('/')[3];
    //         // console.log("\n", id);
    
    //         const user = users.find((user) => user.id === parseInt(id));              // ------------> This is a Call-back
    //         if (user) {
    //             res.setHeader('Content-Type', 'application/json');
    //             res.write(JSON.stringify(user));
    //             res.end();
    //         } else {
    //             res.setHeader('Content-Type', 'application/json');
    //             res.statusCode = 404;
    //             res.write(JSON.stringify({message:"user not found"}));
    //             res.end();
    //         }
    
    //     } else {
    //         res.setHeader('Content-Type', 'application/json');
    //         res.statusCode = 404;
    //         res.write(JSON.stringify({message : "Route not found"}));
    //         res.end();
    //     }

    // })


    logger (req, res, () => {
        jsonMiddleware(req, res, () => {
            if(req.url === '/listuser' && req.method === 'GET'){
                getUsersHandler(req, res);
            }else if(req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET'){
                getUserByIdHandler(req, res);
            }else {
                NotFoundHandler(req, res);
            }
        })
    })

})

MySimpleServer.listen(PORTNEW, () => {
    console.log(`server is running on ${PORTNEW}`)
});

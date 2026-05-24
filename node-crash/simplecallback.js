import http from 'http';
const PORT = process.env.CLPORT;

const dummy = [
    {dummyid:1, dummyname: "Komba"}
];

// Logger Middleware

const logger = (req,res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

// get dummy handler

const getDummyList = (req, res, next) => {
    res.setHeader('content-type', 'application/json');
    res.statusCode = 200;
    res.write(JSON.stringify(dummy));
    res.end();
}



const myServer = http.createServer((req, res) => {

logger(req, res, () => {

    if(req.url === '/getdummylist' && req.method === 'GET'){
        getDummyList(req,res); 
    }else {
        res.setHeader('content-type', 'application/json');
        res.statusCode = 404;
        res.write(JSON.stringify({"message": "Router Not Found"}))
        res.end();
        }
});
})    


myServer.listen(PORT, () =>{
    console.log(`listening in ${PORT}`);
});
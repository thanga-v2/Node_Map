const express = require('express');

const app = express();  // express is a function, calling it will give app object
app.use(express.json())    // without this req.body is always undefine

const PORT = process.env.PORT

const users = [
    {id:1, name:"thanga"},
    {id:2, name:"mani"},
    {id:3, name : "kuram"}
]

// middleware
const logger = (req, res, next) => {
    console.log(`${req.url} and ${req.method}`)
    next();
}

// app.use() -> Register middleware globally                                                                                                                                                                                          
app.use(logger);     

app.get('/', (req, res) => {
        res.statusCode = 200;
        res.write(JSON.stringify({"message":"base"}));
        res.end();
    
    })    
    
app.get('/hi', (req, res) => {
    console.log("params",req.params);
    res.send("Hello thanga");
    res.end();
})    

app.post('/add', (req,res) => {
    console.log("\n post without app.use(express.json()) \n ",req.body);
    users.push(req.body);
    res.send({message : "user added"})

})

app.get('/listusers', (req,res) => {
    res.send(users);
})


app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})
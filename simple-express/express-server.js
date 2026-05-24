const express = require('express');

const app = express();  // express is a function, calling it will give app object

const PORT = process.env.PORT

const logger = (req, res, next) => {
    console.log(`${req.url} and ${req.method}`)
    next();
}

// Register middleware globally                                                                                                                                                                                          
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


app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})
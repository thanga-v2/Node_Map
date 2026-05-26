const express = require('express');

const router = express.Router();

const users = [
    {id: 1, name : "King"},
    {id: 2, name : "Ping"},
    {id: 2, name : "Sing"}
]

router.get('/listusers', (req, res) => {
   res.json(users);
})

router.post('/adduser', (req, res) => {

    users.push(req.body);
    res.status(200).json({message: "user has been added."})
})

module.exports = router;
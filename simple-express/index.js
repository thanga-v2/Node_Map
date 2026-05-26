const express = require('express');
const userRouter = require('./routes/users.js')

const PORT = process.env.PORT

const app = express();
app.use(express.json());



app.use('/api/users', userRouter)      // ----> it tells, any request starts with /api/users, dont handle it here, pass it to
                                        // userRouter - /routes/user.js


app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})
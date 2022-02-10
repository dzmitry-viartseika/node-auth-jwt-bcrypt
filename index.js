const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./auth-router');
const app = express()
const port = process.env.port || 5000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(express.json())
app.use('/auth', authRouter);

const start = async () => {
    try {


        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()

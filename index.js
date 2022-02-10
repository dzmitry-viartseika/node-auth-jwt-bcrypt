const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./auth-router');
const app = express()
const port = process.env.PORT || 5000
const host = process.env.HOST || 'wertey'

app.get('/', (req, res) => {
    res.send('Backend is running now. Do not worry about it :D:D:D')
})

app.use(express.json())
app.use('/auth', authRouter);

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://auth-jwt-bcrypt:<password>@cluster0.nboaf.mongodb.net/<name_dataBase>?retryWrites=true&w=majority'
        ,{ useNewUrlParser: true, useUnifiedTopology: true })

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}, ${host}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()

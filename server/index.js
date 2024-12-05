const express = require('express')
const connectDB = require('./config/db')
const apiRouter = require('./routes')
require('dotenv').config()



const app = express()

connectDB()


app.use(express.json())
app.use("/api", apiRouter)


app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`server starts on port ${process.env.PORT}`);

    }
})



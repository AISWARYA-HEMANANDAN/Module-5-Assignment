const express = require('express')
const app = express()
const userRoutes = require('./routes/userRoutes')
const dbConnection = require('./config/dbConnection')
require('dotenv').config()

dbConnection()

app.use(express.json())
app.use("/user", userRoutes)

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err);

    } else {
        console.log(`Server starts on port ${process.env.PORT}`);
    }

})
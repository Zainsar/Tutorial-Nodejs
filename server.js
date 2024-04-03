const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const EmployeeRoute = require('./routes/employee')
const AuthRoute = require('./routes/auth')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: {conn.connection.host}`);
    } catch (error) {
        console.error(error.message);
        // process.exit(1);
    }
}

connectDB();

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

const port = 8080

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})

app.use('/api/employee', EmployeeRoute)
app.use('/api', AuthRoute)
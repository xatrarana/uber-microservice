require('dotenv').config()
const express = require("express");
const cookieParser = require('cookie-parser')
const connect = require('./lib/db');
const userRoutes = require('./routes/user.routes');
const app = express();
connect()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/', userRoutes)
module.exports = app;
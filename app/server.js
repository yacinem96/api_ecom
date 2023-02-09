const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes');
require('dotenv').config();

// connecting db
require("./config/db").connect();

const app=express();
const PORT=process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/",apiRoutes());

app.listen(PORT ,()=>{ console.log(`app started on port ${PORT}`);})

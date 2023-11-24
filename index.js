const express = require('express')
const cors = require('cors');

require('dotenv').config();
require('./database');

const {Weather} = require('./models/Weather')

const weather = require('./routes/Weather')


const app = express()
const port = process.env.PORT || 3001

//Configure Cors options
var corsOptions = {
   origin: 'http://localhost:4200',
 optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
   }


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(express.json());

   //Cors middleware
   app.use( cors(corsOptions));

app.use('/api/v1/weather', weather)

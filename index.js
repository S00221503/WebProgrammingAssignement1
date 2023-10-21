const express = require('express')

require('dotenv').config();
require('./database');
// note this required a .env file which is not in github


const {Weather} = require('./models/Weather')

const weather = require('./routes/Weather')


const app = express()
const port = process.env.PORT || 3001

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(express.json());

app.use('/api/v1/weather', weather)
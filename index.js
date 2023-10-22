const express = require('express')

require('dotenv').config();
require('./database');

const {Weather} = require('./models/Weather')

const weather = require('./routes/Weather')


const app = express()
const port = process.env.PORT || 3001

/*
//Calling API
app.get('/weather', (req, res) => {
    WeatherData.find({}, (err, data) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(data);
    });
  });
  //End of calling API
*/

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(express.json());

app.use('/api/v1/weather', weather)

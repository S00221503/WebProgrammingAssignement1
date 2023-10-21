const express = require('express')

const {Weather} = require('../models/Weather')

const router = express.Router();

//Post
router.post('/', async (req, res) => {


 let weather = new Weather(req.body);

 console.log(weather) // to check what was received

 try {

weather = await weather.save();
 
 
 res
 .location(`${weather._id}`)
 .status(201)
 .json(weather)
 }

 catch (error) {
res.status(500).send('db_error ' + error)
 }


});

//Get
router.get('/', async (req, res) => {

      try {
        const weather = await Weather.find()
        res.json(weather);
      }
      catch (error) {
        res.status(500).json('db error ' + error)
      }
    })
    

module.exports = router

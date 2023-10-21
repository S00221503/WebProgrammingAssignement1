const express = require('express')

const {Weather, ValidateWeather} = require('../models/Weather')

const router = express.Router();
  //let result = ValidateWeather(req.body)


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

router.get('/:id', async (req, res) => {
  const {location} = req.query;

  let filter = {}

  if (location)
  {
    filter.location = location
  }

  try {
    const weather = await Weather
      .find(filter)
    res.json(weather);
  }
  catch (error) {
    res.status(500).json('db error ' + error)
  }

})


/*
//Get that works 
router.get('/:id', async (req, res) => {

      try {
        const weather = await Weather.find()
        res.json(weather);
      }
      catch (error) {
        res.status(500).json('db error ' + error)
      }
    })
    */

    //Delete
    router.delete('/:id', async (req, res) => {
        try {
          const id = req.params.id;
      
          // Perform the deletion operation in your database
          const deletedWeather = await Weather.findByIdAndDelete(id);
      
          if (!deletedWeather) {
            // If the Weather with the provided ID doesn't exist, return a 404 status
            return res.status(404).json({ error: 'Weather not found' });
          }
      
          // Respond with a success message
          res.status(204).json({ message: 'Resource deleted successfully' });
        } catch (error) {
          // Handle errors, e.g., if there's a database error
          console.error(error);
          res.status(500).json({ error: 'An error occurred while deleting the resource' });
        }
      });

      //Put
      router.put('/:id', async (req, res) => {
        try {
          const id = req.params.id;
          const updateData = req.body; // Assuming the updated data is sent in the request body
      
          // Perform the update operation in your database
          const updatedWeather = await Weather.findByIdAndUpdate(id, updateData, { new: true });
      
          if (!updatedWeather) {
            // If the Weather with the provided ID doesn't exist, return a 404 status
            return res.status(404).json({ error: 'Weather not found' });
          }
      
          // Respond with the updated Weather data
          res.status(200).json(updatedWeather);
        } catch (error) {
          // Handle errors, e.g., if there's a database error or validation error
          console.error(error);
          res.status(500).json({ error: 'An error occurred while updating the resource' });
        }
      });

      


    
module.exports = router

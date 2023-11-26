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

router.get('/', async (req, res) => {
  const { location, weather, temperature, id } = req.query; // Include "id" in query parameters

  if (id) {
    // If an "id" parameter is provided, attempt to retrieve an individual resource by its ID
    try {
      const individualWeather = await Weather.findById(id);
      if (!individualWeather) {
        return res.status(404).json('Weather not found');
      }
      return res.json(individualWeather);
    } catch (error) {
      return res.status(500).json('db error ' + error);
    }
  } else {
   
    let filter = {};

    if (weather) {
      filter.weather = weather;
    }

    if (location) {
      filter.location = location;
    }

    if (temperature) {
      filter.temperature = temperature;
    }

    try {
      const weather = await Weather.find(filter);
      res.json(weather);
    } catch (error) {
      res.status(500).json('db error ' + error);
    }
  }
});

/*
router.get('/', async (req, res) => {

  const { name, location } = req.query;

  let filter = {};

  if (name) {
    filter.name = name;
  }

  if (location) { 
    filter.location = location;
  }

  try {
    const weather = await Weather.find(filter);
    res.json(weather);
  } catch (error) {
    res.status(500).json('db error ' + error);
  }
});
*/



//Get that works 
router.get('/:id', async (req, res) => {

  let id = req.params.id;

  try {
    const weather = await Weather.findById(id)

    if (weather) {
      res.json(weather)
    }
    else {
      res.status('404').json('not found');
    }
  }
  // Handle errors, e.g., if there's an error with id
  catch (error) {
    res.status(404).json('id is incorrect' + error)
  }
})
    

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

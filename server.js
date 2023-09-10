// Lets Import required packages and all files

const express =  require('express');

const db = require('./config/connection');

const routes = require('./routes');
// This will Set up the environment variables

const PORT = process.env.PORT || 3014;
const app = express();

//Lets use middleware to parse incoming data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// this use routes defined in routes.js
app.use(routes); 

// this Connect to the MongoDB database and start the server
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`The API server is running on port http://localhost:${PORT}!`);
    });
  });
// First lets Import the mongoose library
const mongoose = require('mongoose');

// This will Connect to the MongoDB database using the MongoDB URI provided in the environment 
mongoose.connect(process.env.MONOGDB_URI || 'mongodb://localhost:27017/Diallos&Friends',{useNewUrlParser: true, useUnifiedTopology: true,
});

// This is going to Export the connection to the database as a module
module.exports = mongoose.connection
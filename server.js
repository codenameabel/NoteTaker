// Require express module (for middleware interactions)
const express = require('express');
const app = express();

// Since we'll be writing the notes on a file, we'll need fs and path
const fs = require('fs');
const path = require('path');

// This is the file on which we'll be writing notes (no need to add the .json extension)
const {notes} = require('./db/db');
const PORT = process.env.PORT || 80;

// Sets up the Express app to handle data parsing, otherwise routes won't work
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set local explicit routes for front-end files - because here's where we have the public html files
app.use(express.static('public'));

// We'll be doing two types of routes - apiRoutes - to get the notes data, and - htmlRoutes - to display the page to the user
const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

const htmlRoutes = require('./routes/htmlRoutes');
app.use('/', htmlRoutes);

// And now we run the server (note I'm using port 80 b/c it's a web app)
app.listen(PORT, ()=> {
    console.log(`API server now on port ${PORT}`);
});
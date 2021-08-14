// Instantiate path and router
const path = require('path');
const router = require('express').Router();

// Routes user to index.html when they land on the root '/'
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// Renders note.html when users land on /notes
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// Anything else - get back to index
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;
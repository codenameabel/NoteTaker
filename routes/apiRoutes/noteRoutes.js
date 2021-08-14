const { filterByQuery, validateNote, createNewNote, deleteNote } = require('../../lib/notes');
let { notes } = require('../../db/db.json');

const router = require('express').Router();

// Gets all notes - no filter
router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// Saves note
router.post('/notes', (req, res) => {
    // req.body.id = notes.length.toString(); This creates a bug when you delete a note, and add a new one, the note id will be repeated, and two note will have the same id
    
    if (!req.body.id) {
        if (notes.length) {
            req.body.id = Math.max.apply(Math, notes.map( function(noteObject) {
                return noteObject.id + 1;
            }));
        } else {
            req.body.id = 1;
        }
    } 
    
    if (!validateNote(req.body)) {
        res.status(400).send('The note is missing a title');
    } else {
        notes = createNewNote(req.body, notes);
        res.json(notes);
    }
});

// Deletes note
router.delete('/notes/:id', (req, res) => {
    notes = deleteNote(req.params.id, notes);
    res.json(notes);
});

module.exports = router;
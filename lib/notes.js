const fs = require("fs");
const path = require("path");

function filterByQuery (query, notesArray) {
    let filteredResults = notesArray;
    if(query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    return filteredResults;
}

function validateNote (note) {
    if (!note.title || note.title === '' || typeof note.title !== 'string') {
        return false;
    }
    return true;
}

function createNewNote (body, notesArray) {
    const note = body;
    // Removes the old note from the array - if exists - so that we save an edited version of it.
    notesArray = notesArray.filter (element => element.id != note.id);

    notesArray.push(note);

    writeNotesFile(notesArray);

    return notesArray;
}

function deleteNote(id, notesArray) {
    notesArray = notesArray.filter( element => element.id != id);
    
    writeNotesFile(notesArray);
    
    return notesArray;
}

function writeNotesFile(notesArray) {
    fs.writeFileSync (
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notes: notesArray.sort((a,b) => (a.id > b.id) ? 1: -1)},null,2)
    );
}

module.exports = {
    filterByQuery,
    validateNote,
    createNewNote,
    deleteNote
}
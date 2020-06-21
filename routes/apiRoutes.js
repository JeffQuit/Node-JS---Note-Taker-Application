const jsonData = require('../db/db.json');

const util = require('util');
const fs = require('fs');
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

module.exports = function (app) {
	//
	//Prints notes from db.JSON to notes area on /notes page
	app.get('/api/notes', function (req, res) {
		//Reads JSON file and prints this to the left column on the /notes page
		readFileAsync('./db/db.json', 'utf8').then(function (data) {
			let notes = JSON.parse(data);
			res.json(notes);
		});
	});

	//Functionality to add new note using post method
	app.post('/api/notes', function (req, res) {
		//Need to read the existing JSON database and create a new array to push the new note into the array. If this is not included, then the old deleted notes will come back.
		let updateNoteArray = JSON.parse(fs.readFileSync('./db/db.json'));
		let addNote = req.body;
		//Loop through the notes to add the ID which we will use to delete the notes later on
		for (let i = 0; i < jsonData.length; i++) {
			addNote.id = i + 1;
		}
		//Push to the new array which stops old deleted notes from re-appearing
		updateNoteArray.push(addNote);
		//Stringify's the array to be written to the write file
		let jsonArray = JSON.stringify(updateNoteArray);
		// Writes updated array back to the db.Json file
		writeFileAsync('./db/db.json', jsonArray).then(function () {
			console.log('JSON DB Notes Array Updated');
		});
		res.json(jsonData);
	});

	//Functionality to delete the posts using the trashcan icon
	app.delete('/api/notes/:id', function (req, res) {
		//Read db.JSON file so we can find what needs to be removed using the delete ID
		readFileAsync('./db/db.json', 'utf8').then(function (data) {
			console.log(data);
			let arrayParse = JSON.parse(data);
			//Uses the filter method to remove the targeted note using the ID # as the identifyer
			let deletedArray = arrayParse.filter((target) => target.id != req.params.id);
			//Stringify's the array to be written to the write file
			let jsonArray = JSON.stringify(deletedArray);

			//Writes Updated db.JSON file after note is removed
			writeFileAsync('./db/db.json', jsonArray).then(function () {
				console.log('JSON DB Notes Array Updated With Deleted Note');
			});
		});
		res.json(jsonData);
	});
};

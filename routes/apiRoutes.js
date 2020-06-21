const jsonData = require('../db/db.json');

const path = require('path');
const util = require('util');
const fs = require('fs');
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

module.exports = function (app) {
	//
	//Prints notes from db.JSON to notes area on /notes page
	app.get('/api/notes', function (req, res) {
		readFileAsync('./db/db.json', 'utf8').then(function (data) {
			let notes = JSON.parse(data);
			res.json(notes);
		});
	});

	//Functionality to add new note using post method
	app.post('/api/notes', function (req, res) {
		let addNote = req.body;
		for (let i = 0; i < jsonData.length; i++) {
			addNote.id = i + 1;
		}
		jsonData.push(addNote);
		res.json(addNote);
		let jsonArray = JSON.stringify(jsonData);
		// Writes updated array back to the db.Json file
		writeFileAsync('./db/db.json', jsonArray).then(function () {
			console.log('JSON DB Notes Array Updated');
		});
	});

	//Functionality to delete the posts using the trashcan icon
	app.delete('/api/notes/:id', function (req, res) {
		//Read db.JSON file so we can find what needs to be removed using the delete ID
		readFileAsync('./db/db.json', 'utf8').then(function (data) {
			console.log(data);
			let arrayParse = JSON.parse(data);
			let deletedArray = arrayParse.filter((target) => target.id != req.params.id);
			let jsonArray = JSON.stringify(deletedArray);

			//*Writes Updated db.JSON file after note is removed
			writeFileAsync('./db/db.json', jsonArray).then(function () {
				console.log('JSON DB Notes Array Updated With Deleted Note');
			});
		});
		res.json(jsonData);
	});
};

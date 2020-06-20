const jsonData = require('../db/db.json');

const path = require('path');
const util = require('util');
const fs = require('fs');
const writeFileAsync = util.promisify(fs.writeFile);

module.exports = function (app) {
	//
	//Prints notes from db.JSON to notes area on /notes page
	app.get('/api/notes', function (req, res) {
		return res.json(jsonData);
	});

	//Functionality to add new note using post method
	app.post('/api/notes', function (req, res) {
		let addNote = req.body;
		for (let i = 0; i < jsonData.length; i++) {
			addNote.id = i + 1;
		}
		console.log(addNote);

		jsonData.push(addNote);
		console.log(jsonData);
		res.json(addNote);
		let jsonArray = JSON.stringify(jsonData);

		writeFileAsync('./db/db.json', jsonArray).then(function () {
			console.log('JSON DB Notes Array Updated');
		});
	});
	//Functionality to delete the posts using the trashcan icon
	app.Delete('/api/notes', function (req, res) {
		//
		//
	});
};

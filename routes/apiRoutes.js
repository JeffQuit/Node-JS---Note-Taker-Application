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

		console.log(addNote);

		writeFileAsync('./db/db.json', addNote).then(function () {
			console.log('Note Succesfully Added to Json File');
		});

		res.json(addNote);
	});
};

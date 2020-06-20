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
};

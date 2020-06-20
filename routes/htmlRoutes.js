const path = require('path');

// Exports function to the server.js file for routing the pages using the buttons via the HREF values * or /notes
module.exports = function (app) {
	app.get('/notes', function (req, res) {
		res.sendFile(path.join(__dirname, '../public/notes.html'));
	});

	// If no matching route is found default to home
	app.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, '../public/index.html'));
	});
};

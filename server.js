const express = require('express');
const compression = require('compression')
const app = express();

const PORT = process.env.PORT || 3004;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(compression())

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.listen(PORT, function () {
	console.log('App listening on PORT: ' + PORT);
});

const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.static('public'))
app.use(bodyParser.json());

app.post('/api/records/add', (req, res) => {
	const bodyData = req.body;
	console.log('TODO: add ', bodyData);
});

app.get('/api/records', (req, res) => {
	res.json([
		{
			text: 'first',
			ratio: 0.66
		},
		{
			text: 'second',
			ratio: 0.64
		}
	]);
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

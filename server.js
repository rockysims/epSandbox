require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Record = require("./models/Record");

//mongo setup
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
});
mongoose.connection.on('error', err => console.error('MongoDB connection error:', err));

//express setup
const app = express();
app.use(bodyParser.json());

//static setup
app.use(express.static('public'));

//api

app.post('/api/records', (req, res) => {
	const record = new Record(req.body);

	record.save()
		.then(recordData => {
			res.json(recordData);
		})
		.catch(reason => {
			res.status(500).json(reason);
		});
});

app.get('/api/records', (req, res) => {
	Record.find({})
		.then(records => {
			res.json(records);
		})
		.catch(reason => {
			res.status(500).json(reason);
		});
});

app.delete('/api/records', (req, res) => {
	const id = req.body.id;
	
	Record.findOneAndRemove({_id: id})
		.then(record => {
			res.json(record);
		})
		.catch(reason => {
			res.status(500).json(reason);
		});
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

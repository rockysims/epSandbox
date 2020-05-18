const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.static('public'))
app.use(bodyParser.json());

app.post('/api/records/add', (req, res) => {
	const bodyDataJson = JSON.stringify(req.body);
	
	const now = new Date(Date.now());
	const nowStr = now.toUTCString() + ' ' + now.getMilliseconds();
	const fileName = nowStr + '.txt';
	const filePath = `data/${fileName}`;
	fs.writeFileSync(filePath, bodyDataJson);

	res.json({
		fileName: fileName
	});
});

app.get('/api/records', (req, res) => {
	const data = [];

	const fileNames = fs.readdirSync('data/');
	for (let fileName of fileNames) {
		const filePath = 'data/' + fileName;
		const textData = fs.readFileSync(filePath, 'utf8');
		const jsonData = JSON.parse(textData);
		jsonData.fileName = fileName;
		data.push(jsonData);
	}

	res.json(data);
});

app.delete('/api/records/remove', (req, res) => {
	const bodyData = req.body;
	const fileName = bodyData.fileName;
	const filePath = `data/${fileName}`;
	fs.unlinkSync(filePath);

	const files = fs.readdirSync('data/');
	res.json({
		fileCount: files.length
	});
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

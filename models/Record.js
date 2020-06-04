const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);

const RecordSchema = new mongoose.Schema({
	data: {
		type: String,
		required: true
	},
	wins: {
		type: Number,
		required: true
	},
	loses: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('Record', RecordSchema);
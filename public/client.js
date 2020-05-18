document.addEventListener('DOMContentLoaded', () => {
	const inputDataElem = document.querySelector('.inputData');
	const inputWinsElem = document.querySelector('.inputWins');
	const inputLosesElem = document.querySelector('.inputLoses');
	const saveButtonElem = document.querySelector('.saveButton');
	const loadButtonElem = document.querySelector('.loadButton');
	const divElem = document.querySelector('.outputDiv');
	const inputFileElem = document.querySelector('.inputFile');
	const deleteButtonElem = document.querySelector('.deleteButton');

	saveButtonElem.addEventListener('click', () => {
		const recordData = {
			data: inputDataElem.value,
			wins: inputWinsElem.value,
			loses: inputLosesElem.value
		};

		fetch('/api/records', {
			method: 'post',
			body: JSON.stringify(recordData),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				divElem.innerHTML = 'Saved as ' + data.fileName;
			});
	});

	loadButtonElem.addEventListener('click', () => {
		fetch('/api/records', {
			method: 'get'
		})
			.then(res => res.json())
			.then(data => {
				let html = '';
				for (let datum of data) {
					html += '<div>';
					html += 	JSON.stringify(datum);
					html += '</div>';
				}
				divElem.innerHTML = html;
			});
	});

	deleteButtonElem.addEventListener('click', () => {
		const bodyData = {
			fileName: inputFileElem.value
		};
		
		fetch('/api/records', {
			method: 'delete',
			body: JSON.stringify(bodyData),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				divElem.innerHTML = 'Deleted file. ' + data.fileCount + ' remaining.';
			});
	});
});
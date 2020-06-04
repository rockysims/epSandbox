document.addEventListener('DOMContentLoaded', () => {
	const inputDataElem = document.querySelector('.inputData');
	const inputWinsElem = document.querySelector('.inputWins');
	const inputLosesElem = document.querySelector('.inputLoses');
	const postButtonElem = document.querySelector('.postButton');
	const loadButtonElem = document.querySelector('.loadButton');
	const divElem = document.querySelector('.outputDiv');
	const inputIdElem = document.querySelector('.inputId');
	const deleteButtonElem = document.querySelector('.deleteButton');

	postButtonElem.addEventListener('click', () => {
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
			.then(res => {
				return res.json().then(data => {
					if (res.ok) return data;
					else throw data;
				});
			})
			.then(data => {
				divElem.innerHTML = 'Saved record: ' + JSON.stringify(data);
			})
			.catch(reason => {
				divElem.innerHTML = 'Error: ' + JSON.stringify(reason);
			});
	});

	loadButtonElem.addEventListener('click', () => {
		fetch('/api/records', {
			method: 'get'
		})
			.then(res => {
				return res.json().then(data => {
					if (res.ok) return data;
					else throw data;
				});
			})
			.then(data => {
				let html = 'Found records:';
				for (let datum of data) {
					html += '<div>';
					html += 	JSON.stringify(datum);
					html += '</div>';
				}
				divElem.innerHTML = html;
			})
			.catch(reason => {
				divElem.innerHTML = 'Error: ' + JSON.stringify(reason);
			});
	});

	deleteButtonElem.addEventListener('click', () => {
		const bodyData = {
			id: inputIdElem.value
		};

		fetch('/api/records', {
			method: 'delete',
			body: JSON.stringify(bodyData),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => {
				return res.json().then(data => {
					if (res.ok) return data;
					else throw data;
				});
			})
			.then(data => {
				divElem.innerHTML = 'Deleted record: ' + JSON.stringify(data);
			})
			.catch(reason => {
				divElem.innerHTML = 'Error: ' + JSON.stringify(reason);
			});
	});
});
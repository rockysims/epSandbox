document.addEventListener('DOMContentLoaded', () => {
	const inputElem = document.querySelector('.inputBox');
	const saveButtonElem = document.querySelector('.saveButton');
	const loadButtonElem = document.querySelector('.loadButton');
	const divElem = document.querySelector('.outputDiv');

	saveButtonElem.addEventListener('click', () => {
		const inputStr = inputElem.value;

		const bodyData = {
			text: inputStr,
			ratio: 0.65
		};
		fetch('/api/records/add', {
			method: 'post',
			body: JSON.stringify(bodyData),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				divElem.innerHTML = JSON.stringify(data);
			});
	});

	loadButtonElem.addEventListener('click', () => {
		fetch('/api/records')
			.then(res => res.json())
			.then(data => {
				divElem.innerHTML = `${JSON.stringify(data)}`;
			});
	});
});
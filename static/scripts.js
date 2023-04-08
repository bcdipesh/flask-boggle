'use strict';

const userGuessForm = $('.user-guess-form');
const result = $('.result');

userGuessForm.on('submit', async (e) => {
	e.preventDefault();
	const userGuess = $('#guess').val();

	const response = await axios.post('/api/check-guess', {
		userGuess,
	});

	result.text(response.data.result);
});

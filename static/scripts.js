'use strict';

const userGuessForm = $('.user-guess-form');
const result = $('.result');
const score = $('.score');

userGuessForm.on('submit', async (e) => {
	e.preventDefault();
	result.text('Checking your guess...');
	const userGuess = $('#guess').val();

	const response = await axios.post('/api/check-guess', {
		userGuess,
	});

	result.text(`Your guess is ${response.data.result}`);
	score.text(response.data.total_score);
});

'use strict';

const userGuessForm = $('.user-guess-form');
const guessInput = $('#guess');
const result = $('.result');
const score = $('.score');
const highestScore = $('.highest-score');

const startTimer = () => {
	let timer = 60;

	const timerId = setInterval(() => {
		if (timer === 1) {
			$('.timer').text('Timeout!!');
		} else {
			$('.timer').text(`Time remaining: ${timer}s`);
		}
		--timer;
	}, 1000);

	return timerId;
};

const stopTimer = (timerId) => clearInterval(timerId);

const timerId = startTimer();

setTimeout(() => {
	stopTimer(timerId);
	guessInput.prop('disabled', true);
	guessInput.val('No Guess');
}, 60000);

userGuessForm.on('submit', async (e) => {
	e.preventDefault();
	result.text('Checking your guess...');
	const userGuess = guessInput.val();

	const response = await axios.post('/api/check-guess', {
		userGuess,
	});

	result.text(`Your guess is ${response.data.result}`);
	score.text(response.data.total_score);
	highestScore.text(response.data.highest_score);

	guessInput.prop('disabled', false);

	stopTimer(timerId);
	const _timerId = startTimer();

	setTimeout(() => {
		stopTimer(_timerId);
		guessInput.prop('disabled', true);
		guessInput.val('No Guess');
	}, 60000);
});

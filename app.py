from boggle import Boggle
from flask import Flask, render_template, session, request, jsonify

boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'flask boggle'


@app.route("/")
def display_home_page():
    """Display the home page of the app"""

    if not 'board' in session:
        game_board = boggle_game.make_board()
        session['board'] = game_board
    return render_template('index.html')


@app.route('/api/check-guess', methods=["POST"])
def check_user_guess():
    """Check user guess and return a result"""

    data = request.get_json()
    user_guess = data['userGuess']

    is_word_valid = boggle_game.check_valid_word(session['board'], user_guess)

    return jsonify(result=is_word_valid)

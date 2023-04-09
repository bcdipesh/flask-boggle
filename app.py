from boggle import Boggle
from flask import Flask, render_template, session, request, jsonify

boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'flask boggle'


@app.route("/")
def display_home_page():
    """Display the home page of the app"""

    game_board = boggle_game.make_board()
    session['board'] = game_board
    session['total_score'] = 0
    session['highest_score'] = session.get('highest_score', 0)
    session['times_visited'] = session.get('times_visited', 0) + 1

    return render_template('index.html')


@app.route('/api/check-guess', methods=["POST"])
def check_user_guess():
    """Check user guess and return a result"""

    data = request.get_json()
    user_guess = data['userGuess']

    is_word_valid = boggle_game.check_valid_word(session['board'], user_guess)

    if is_word_valid == 'ok':
        session['total_score'] += len(user_guess)

    if session['total_score'] > session['highest_score']:
        session['highest_score'] = session['total_score']

    return jsonify(result=is_word_valid, total_score=session['total_score'], highest_score=session['highest_score'])

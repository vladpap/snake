from flask import Flask, render_template, request, jsonify
import sqlite3


app = Flask(__name__)


# Инициализация базы данных
def init_db():
    conn = sqlite3.connect('scores.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS scores
        (id INTEGER PRIMARY KEY AUTOINCREMENT,
         player TEXT NOT NULL,
         score INTEGER NOT NULL,
         date TIMESTAMP DEFAULT CURRENT_TIMESTAMP)
    ''')
    conn.commit()
    conn.close()


# Создаем таблицу при запуске
init_db()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/scores', methods=['GET'])
def get_scores():
    conn = sqlite3.connect('scores.db')
    c = conn.cursor()
    c.execute('SELECT player, score FROM scores ORDER BY score DESC LIMIT 10')
    scores = [{'player': row[0], 'score': row[1]} for row in c.fetchall()]
    conn.close()
    return jsonify(scores)


@app.route('/api/scores', methods=['POST'])
def save_score():
    data = request.json
    conn = sqlite3.connect('scores.db')
    c = conn.cursor()
    c.execute('INSERT INTO scores (player, score) VALUES (?, ?)',
              (data['player'], data['score']))
    conn.commit()
    conn.close()
    return jsonify({'success': True})


if __name__ == '__main__':
    app.run(debug=True)

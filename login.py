from flask import Flask, render_template, request
from werkzeug.security import generate_password_hash, check_password_hash
import json
import os

app = Flask(__name__)

# Path to JSON file
users_file = 'users.json'

# Load users from JSON file (if exists)
if os.path.exists(users_file):
    with open(users_file, 'r') as f:
        users_db = json.load(f)
else:
    users_db = {}

@app.route('/')
def index():
    return render_template('profile.html')

@app.route('/login_user', methods=['POST'])
def login_user():
    email = request.form.get('logemail')
    password = request.form.get('logpass')

    user = users_db.get(email)
    if user and check_password_hash(user['password'], password):
        return f"Welcome {user['name']}! You are logged in."
    else:
        return "Invalid email or password. Please try again."

@app.route('/signup_user', methods=['POST'])
def signup_user():
    name = request.form.get('logname')
    email = request.form.get('logemail')
    password = request.form.get('logpass')

    if email in users_db:
        return "User already exists. Please log in."

    # Hash the password before storing it
    hashed_password = generate_password_hash(password)

    users_db[email] = {'name': name, 'password': hashed_password}

    # Save to JSON file
    with open(users_file, 'w') as f:
        json.dump(users_db, f)

    return f"User {name} signed up successfully! You can now log in."

if __name__ == '__main__':
    app.run(debug=True, port=5001)

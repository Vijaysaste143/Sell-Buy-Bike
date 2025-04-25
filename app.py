from flask import Flask, render_template, request
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('contact.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')  

@app.route('/save_message', methods=['POST'])
def save_message():
    name = request.form.get('name')
    email = request.form.get('email')
    subject = request.form.get('subject')
    message = request.form.get('message')

    comment_data = {
        "name": name,
        "email": email,
        "subject": subject,
        "message": message
    }

    try:
        with open('comments.json', 'a') as file:
            json.dump(comment_data, file)
            file.write('\n')
    except Exception as e:
        return f"Error saving message: {e}"

    return "Message saved successfully!"

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import fitz  # PyMuPDF
import google.generativeai as genai

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://ai-study-planner-eta.vercel.app/"}})

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Gemini API key
genai.configure(api_key="AIzaSyBXjfrz45INbe541MzXIqQqADAdjuJGAhg")
model = genai.GenerativeModel("gemini-1.5-pro")

# Predefined subject data
SUBJECTS_DATA = {
    "Applied Linear Algebra": {
        "modules": [
            "System of Linear Equations and Matrices",
            "Vector Spaces and Subspaces",
            "Linear Transformations",
            "Inner Product Spaces",
            "Applications of Inner Product Spaces"
        ],
        "youtube": "https://www.youtube.com/watch?v=1XlT3Y2oyAU&list=PLU6SqdYcYsfI7Ebw_j-Vy8YKHdbHKP9am"
    },
    "DSAA": {
        "modules": [
            "Introduction",
            "Stacks and Queues",
            "Trees and Graphs",
            "Searching and Sorting",
            "Graph Traversal"
        ],
        "youtube": "https://www.youtube.com/watch?v=AT14lCXuMKI&list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU"
    }
}

def extract_text_from_pdf(file_path):
    doc = fitz.open(file_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text


@app.route('/')
def home():
    return "Flask app is running"

@app.route('/generate-plan', methods=['POST'])
def generate_plan():
    subject = request.form['subject'].strip()
    syllabus_file = request.files['syllabus']
    filename = os.path.join(UPLOAD_FOLDER, syllabus_file.filename)
    syllabus_file.save(filename)

    text = extract_text_from_pdf(filename)
    subject_data = SUBJECTS_DATA.get(subject)

    if not subject_data:
        return jsonify({'error': f"Subject '{subject}' not found in system."}), 400

    required_modules = subject_data['modules']
    matched_modules = [module for module in required_modules if module.lower() in text.lower()]

    if len(matched_modules) != len(required_modules):
        missing_modules = list(set(required_modules) - set(matched_modules))
        return jsonify({
            'error': 'Module mismatch',
            'missing_modules': missing_modules
        }), 400

    # Construct batch prompt
    prompt = f"""
You are an expert tutor. Write a brief 3–4 line overview of the subject: "{subject}" for students.

Then, for each of the following modules, explain the concept clearly and simply, labeled and separated:

{chr(10).join(f"{i+1}. {mod}" for i, mod in enumerate(required_modules))}
    """

    try:
        response = model.generate_content(prompt)
        explanation_output = response.text.strip()
    except Exception as e:
        explanation_output = f"Error generating explanation: {str(e)}"

    # Create unified plan object
    plan = [{
        "module": subject,
        "youtube": subject_data["youtube"],
        "explanation": explanation_output
    }]

    return jsonify({'plan': plan})

if __name__ == '__main__':
    app.run(debug=True)

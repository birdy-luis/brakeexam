let questions = [];
let examQuestions = [];
let currentQuestionIndex = 0;

// Load JSON automatically
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    initExamSelector();
  })
  .catch(err => console.error('Failed to load questions:', err));

// Initialize the question count selector
function initExamSelector() {
  const container = document.getElementById('exam-container');
  container.innerHTML = `
    <h2>Select number of questions</h2>
    <button onclick="startExam(20)">20</button>
    <button onclick="startExam(50)">50</button>
    <button onclick="startExam(100)">100</button>
    <button onclick="startExam(200)">200</button>
  `;
}

// Start the exam with selected number of questions
function startExam(count) {
  examQuestions = shuffleArray(questions).slice(0, count);
  currentQuestionIndex = 0;
  showQuestion();
}

// Display the current question
function showQuestion() {
  const container = document.getElementById('exam-container');
  if (currentQuestionIndex >= examQuestions.length) {
    container.innerHTML = `<h2>Exam Finished!</h2><button onclick="initExamSelector()">Restart</button>`;
    return;
  }

  const q = examQuestions[currentQuestionIndex];
  container.innerHTML = `
    <h3>Question ${currentQuestionIndex + 1} of ${examQuestions.length}</h3>
    <p>${q.question}</p>
    ${q.options.map((opt, i) => `<button onclick="checkAnswer('${opt}', '${q.answer}')">${opt}</button>`).join('')}
    <div id="answer-reveal" style="margin-top:10px;"></div>
  `;
}

// Check answer and reveal
function checkAnswer(selected, correct) {
  const answerDiv = document.getElementById('answer-reveal');
  if (selected === correct) {
    answerDiv.innerHTML = `<p style="color:green;">Correct! ✅</p>`;
  } else {
    answerDiv.innerHTML = `<p style="color:red;">Wrong ❌. Correct answer: ${correct}</p>`;
  }
  currentQuestionIndex++;
  setTimeout(showQuestion, 1000);
}

// Utility to shuffle questions
function shuffleArray(array) {
  let copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

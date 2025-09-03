async function getQuestions() {
  try {
    // Llamada a OpenTDB para 5 preguntas de categoría "General Knowledge" en inglés
    const response = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple&encode=url3986");
    const data = await response.json();
    
    // Convertir las preguntas a un formato usable en la PWA
    const questions = data.results.map(q => {
      const choices = [...q.incorrect_answers, q.correct_answer];
      // Mezclar las opciones
      choices.sort(() => Math.random() - 0.5);
      return {
        question: decodeURIComponent(q.question),
        choices: choices.map(c => decodeURIComponent(c)),
        correct: choices.indexOf(decodeURIComponent(q.correct_answer))
      };
    });
    return questions;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}

let currentQuestion = 0;
let questions = [];

const questionContainer = document.getElementById("question-container");
const choicesContainer = document.getElementById("choices-container");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");

async function startQuiz() {
  questions = await getQuestions();
  if (questions.length === 0) {
    questionContainer.textContent = "No questions available.";
    return;
  }
  showQuestion();
}

function showQuestion() {
  feedback.textContent = "";
  const q = questions[currentQuestion];
  questionContainer.textContent = q.question;
  choicesContainer.innerHTML = "";
  q.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.onclick = () => checkAnswer(index);
    choicesContainer.appendChild(button);
  });
}

function checkAnswer(index) {
  const q = questions[currentQuestion];
  if (index === q.correct) {
    feedback.textContent = "Correct ✅";
  } else {
    feedback.textContent = "Incorrect ❌";
  }
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    questionContainer.textContent = "Quiz completed! 🎉";
    choicesContainer.innerHTML = "";
    nextBtn.style.display = "none";
  }
};

// Inicia el quiz
startQuiz();

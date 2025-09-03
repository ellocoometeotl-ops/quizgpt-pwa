const questions = [
  {
    question: "¿Cuál es la capital de Francia?",
    choices: ["París", "Londres", "Berlín", "Madrid"],
    correct: 0
  },
  {
    question: "¿Cuál es 2 + 2?",
    choices: ["3", "4", "5", "6"],
    correct: 1
  },
  {
    question: "¿Verdadero o falso: el sol es una estrella?",
    choices: ["Verdadero", "Falso"],
    correct: 0
  }
];

let currentQuestion = 0;

const questionContainer = document.getElementById("question-container");
const choicesContainer = document.getElementById("choices-container");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");

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
    feedback.textContent = "Correcto ✅";
  } else {
    feedback.textContent = "Incorrecto ❌";
  }
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    questionContainer.textContent = "¡Has completado el quiz! 🎉";
    choicesContainer.innerHTML = "";
    nextBtn.style.display = "none";
  }
};

showQuestion();

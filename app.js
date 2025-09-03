const questions = [
  {
    question: "What is the correct translation of 'apple'?",
    choices: ["Manzana", "Pera", "Naranja", "Banana"],
    correct: 0
  },
  {
    question: "Choose the correct sentence:",
    choices: ["She go to school", "She goes to school", "She going school", "She gone to school"],
    correct: 1
  },
  {
    question: "True or False: 'I has a book' is correct.",
    choices: ["True", "False"],
    correct: 1
  },
  {
    question: "Select the correct past tense of 'run':",
    choices: ["runed", "ran", "runned", "running"],
    correct: 1
  },
  {
    question: "What does 'beautiful' mean?",
    choices: ["Feo", "Hermoso", "Rápido", "Alto"],
    correct: 1
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

showQuestion();

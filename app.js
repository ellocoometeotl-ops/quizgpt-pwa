let currentQuestion = 0;
let questions = [];
let language = 'en'; // Idioma por defecto

const questionContainer = document.getElementById("question-container");
const choicesContainer = document.getElementById("choices-container");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const langBtn = document.getElementById("lang-btn"); // Botón para cambiar idioma

// Función para obtener preguntas de OpenTDB según el idioma
async function fetchQuestions() {
  try {
    // category=9 General Knowledge, difficulty=easy, type=multiple
    const response = await fetch(`https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple&encode=url3986`);
    const data = await response.json();
    
    questions = data.results.map(q => {
      const choices = [...q.incorrect_answers, q.correct_answer];
      choices.sort(() => Math.random() - 0.5);

      // Traducción ficticia, podés reemplazar con API real si querés
      let translation = language === 'es' ? "(traducción al español)" : "";

      return {
        question: decodeURIComponent(q.question) + " " + translation,
        choices: choices.map(c => decodeURIComponent(c)),
        correct: choices.indexOf(decodeURIComponent(q.correct_answer))
      };
    });

    currentQuestion = 0;
    showQuestion();
  } catch (error) {
    console.error("Error fetching questions:", error);
    questionContainer.textContent = "No hay preguntas disponibles.";
  }
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
    questionContainer.textContent = "¡Has completado el quiz! 🎉";
    choicesContainer.innerHTML = "";
    nextBtn.style.display = "none";
  }
};

// Cambiar idioma al hacer clic
langBtn.onclick = () => {
  language = language === 'en' ? 'es' : 'en';
  langBtn.textContent = language === 'en' ? "EN" : "ES";
  fetchQuestions();
};

// Inicia el quiz
fetchQuestions();

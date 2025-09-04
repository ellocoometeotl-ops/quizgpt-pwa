let currentQuestion = 0;
let questions = [];
let language = 'en';

const questionContainer = document.getElementById("question-container");
const choicesContainer = document.getElementById("choices-container");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const langBtn = document.getElementById("lang-btn");

// Función para traducir texto usando LibreTranslate
async function translateText(text, targetLang) {
  try {
    const response = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: "en",
        target: targetLang,
        format: "text"
      }),
      headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    return data.translatedText;
  } catch (err) {
    console.error("Error translating:", err);
    return text; // Si falla, devuelve el texto original
  }
}

async function fetchQuestions() {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple&encode=url3986");
    const data = await response.json();

    questions = data.results.map(q => {
      const choices = [...q.incorrect_answers, q.correct_answer];
      choices.sort(() => Math.random() - 0.5);

      return {
        question_en: decodeURIComponent(q.question),
        question_es: null,
        choices_en: choices.map(c => decodeURIComponent(c)),
        choices_es: Array(choices.length).fill(null),
        correct: choices.indexOf(decodeURIComponent(q.correct_answer))
      };
    });

    currentQuestion = 0;
    showQuestion();
  } catch (error) {
    console.error(error);
    questionContainer.textContent = "No hay preguntas disponibles.";
  }
}

async function showQuestion() {
  feedback.textContent = "";
  const q = questions[currentQuestion];

  if (language === 'es') {
    if (!q.question_es) q.question_es = await translateText(q.question_en, 'es');
    for (let i = 0; i < q.choices_en.length; i++) {
      if (!q.choices_es[i]) q.choices_es[i] = await translateText(q.choices_en[i], 'es');
    }
  }

  questionContainer.textContent = language === 'en' ? q.question_en : q.question_es;

  choicesContainer.innerHTML = "";
  const choices = language === 'en' ? q.choices_en : q.choices_es;
  choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.onclick = () => checkAnswer(index);
    choicesContainer.appendChild(button);
  });
}

function checkAnswer(index) {
  const q = questions[currentQuestion];
  feedback.textContent = index === q.correct ? "Correct ✅" : "Incorrect ❌";
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

langBtn.onclick = () => {
  language = language === 'en' ? 'es' : 'en';
  langBtn.textContent = language === 'en' ? "EN" : "ES";
  showQuestion();
};

fetchQuestions();

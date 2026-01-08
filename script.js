const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which language runs in a web browser?",
    choices: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    choices: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "What does HTML stand for?",
    choices: [
      "Hypertext Markup Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
      "None of the above",
    ],
    answer: "Hypertext Markup Language",
  },
  {
    question: "Which year was JavaScript launched?",
    choices: ["1996", "1995", "1994", "none of the above"],
    answer: "1995",
  },
];

const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// load saved answers from sessionStorage
let userAnswers = JSON.parse(sessionStorage.getItem("userAnswers")) || [];

function renderQuestions() {
  questionsDiv.innerHTML = "";

  questions.forEach((q, index) => {
    const qDiv = document.createElement("div");
    qDiv.textContent = q.question;

    q.choices.forEach(choice => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${index}`;
      input.value = choice;

      // 🔴 IMPORTANT FOR CYPRESS
      if (userAnswers[index] === choice) {
        input.checked = true;
        input.setAttribute("checked", "true");
      }

      input.addEventListener("click", () => {
        userAnswers[index] = choice;
        sessionStorage.setItem("userAnswers", JSON.stringify(userAnswers));
        renderQuestions(); // re-render to maintain checked attribute
      });

      qDiv.appendChild(document.createElement("br"));
      qDiv.appendChild(input);
      qDiv.append(choice);
    });

    questionsDiv.appendChild(qDiv);
  });
}

submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, index) => {
    if (userAnswers[index] === q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score.toString());
});

// initial render
renderQuestions();

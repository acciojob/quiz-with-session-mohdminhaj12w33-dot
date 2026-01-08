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
    choices: ["1996", "1995", "1994", "None of the above"],
    answer: "1995",
  },
];

const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load progress from sessionStorage
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions
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

      // Restore checked state
      if (progress[index] === choice) {
        input.checked = true;
        input.setAttribute("checked", "true"); // required for Cypress
      }

      input.addEventListener("click", () => {
        progress[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(progress));
        renderQuestions(); // re-render to preserve checked attribute
      });

      qDiv.appendChild(document.createElement("br"));
      qDiv.appendChild(input);
      qDiv.append(choice);
    });

    questionsDiv.appendChild(qDiv);
  });
}

// Submit quiz
submitBtn.addEventListener("click", () => {
  let score = 0;

  questions.forEach((q, index) => {
    if (progress[index] === q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score.toString());
});

// Initial render
renderQuestions();

// Restore score if already submitted
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
}

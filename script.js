//your JS code here.

// ✅ MUST EXIST before renderQuestions()
let userAnswers = JSON.parse(sessionStorage.getItem("userAnswers")) || [];

const questions = [
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
    question: "What year was JavaScript launched?",
    choices: ["1996", "1995", "1994", "none of the above"],
    answer: "1995",
  },
  {
    question: "Which company developed JavaScript?",
    choices: ["Netscape", "Google", "Microsoft", "Apple"],
    answer: "Netscape",
  },
];

const questionsDiv = document.getElementById("questions");
const scoreDiv = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// 🔹 Render Questions
function renderQuestions() {
  questionsDiv.innerHTML = "";

  questions.forEach((q, index) => {
    const qDiv = document.createElement("div");
    qDiv.innerHTML = `<p>${q.question}</p>`;

    q.choices.forEach(choice => {
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${index}`;
      input.value = choice;

      if (userAnswers[index] === choice) {
        input.checked = true;
      }

      input.addEventListener("change", () => {
        userAnswers[index] = choice;
        sessionStorage.setItem("userAnswers", JSON.stringify(userAnswers));
      });

      qDiv.appendChild(input);
      qDiv.append(choice);
      qDiv.appendChild(document.createElement("br"));
    });

    questionsDiv.appendChild(qDiv);
  });
}

// 🔹 Calculate Score
submitBtn.addEventListener("click", () => {
  let score = 0;

  userAnswers.forEach((ans, i) => {
    if (ans === questions[i].answer) score++;
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score.toString());
});

// 🔹 Initial render
renderQuestions();

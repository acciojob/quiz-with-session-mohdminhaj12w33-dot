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

      // ✅ IMPORTANT FOR CYPRESS
      if (userAnswers[index] === choice) {
        input.checked = true;
        input.setAttribute("checked", "true");
      } else {
        input.removeAttribute("checked");
      }

      input.addEventListener("click", () => {
        userAnswers[index] = choice;
        sessionStorage.setItem("userAnswers", JSON.stringify(userAnswers));

        // re-render to update checked attributes
        renderQuestions();
      });

      qDiv.appendChild(input);
      qDiv.append(choice);
      qDiv.appendChild(document.createElement("br"));
    });

    questionsDiv.appendChild(qDiv);
  });
}

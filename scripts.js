const quizData = [
  {
    question: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Hyderabad", "Chennai"],
    answer: "Delhi",
  },
  {
    question: "Which language runs in the browser?",
    options: ["Python", "C", "Java", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
];

let timeLeft = 10;
let timerId = null;

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionEl = document.getElementById("options");
const nextbtn = document.getElementById("next-btn");
const result = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

restartBtn.addEventListener("click", restartQuiz);

function loadQuestion() {
  const data = quizData[currentQuestion];
  questionEl.textContent = data.question;
  optionEl.innerHTML = "";
  nextbtn.classList.add("hidden");
  timeLeft = 10;
  document.getElementById("timer-number").textContent = `${timeLeft}`;

  data.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => {
      clearInterval(timerId);
      checkAnswer(option);
    };
    optionEl.appendChild(btn);
  });
  document.getElementById("time-up").classList.add("hidden");
  startTimer();
}

function startTimer() {
  clearInterval(timerId);
  document.getElementById("time-up").classList.add("hidden");

  timeLeft = 10;
  updateCircle(timeLeft);

  timerId = setInterval(() => {
    timeLeft--;
    document.getElementById("timer-number").textContent = `${timeLeft}`;
    updateCircle(timeLeft);

    if (timeLeft === 0) {
      clearInterval(timerId);
      document.getElementById("time-up").classList.remove("hidden");
      checkAnswer(null);
    }
  }, 1000);
}

function checkAnswer(selected) {
  // console.log(currentQuestion);
  const correct = quizData[currentQuestion].answer;
  const buttons = optionEl.querySelectorAll("button");

  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.backgroundColor = "green";
      btn.style.color = "#fff";
    } else if (btn.textContent === selected) {
      btn.style.backgroundColor = "red";
      btn.style.color = "#fff";
    }
  });
  if (selected === correct) score++;
  // currentQuestion++;
  // console.log(currentQuestion);
  // if (currentQuestion < quizData.length) {
  //   loadQuestion();
  // } else {
  //   showResult();
  // }
  nextbtn.classList.remove("hidden");
}

function updateCircle(time) {
  const fullDash = 283; // total stroke length
  const offset = fullDash - (time / 10) * fullDash;
  document.getElementById("circle-progress").style.strokeDashoffset = offset;
}

function showResult() {
  document.getElementById("quiz-box").classList.add("hidden");
  result.classList.remove("hidden");
  result.textContent = `Your score:${score}/${quizData.length}`;
}

nextbtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
  restartBtn.classList.remove("hidden");
});

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  result.classList.add("hidden");
  restartBtn.classList.add("hidden");
  document.getElementById("quiz-box").classList.remove("hidden");
  loadQuestion();
}

loadQuestion();

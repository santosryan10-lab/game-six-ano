// Banco de Dados de Matemática - 6º Ano
const mathQuizData = [
    {
        question: "Quanto é 15 × 4?",
        options: ["50", "60", "55", "65"],
        correct: 1 // Resposta: 60
    },
    {
        question: "Qual o resultado de 144 ÷ 12?",
        options: ["11", "14", "12", "10"],
        correct: 2 // Resposta: 12
    },
    {
        question: "Se uma pizza tem 8 pedaços e você comeu 2, qual fração representa o que você comeu?",
        options: ["2/8", "1/2", "8/2", "4/8"],
        correct: 0 // Resposta: 2/8
    },
    {
        question: "Qual é o valor da expressão: 20 + 5 × 3?",
        options: ["75", "35", "45", "28"],
        correct: 1 // Resposta: 35 (lembrando que multiplica primeiro!)
    },
    {
        question: "Se você comprar 3 cadernos por R\$ 7,00 cada, quanto vai pagar no total?",
        options: ["R\$ 14,00", "R\$ 20,00", "R\$ 22,00", "R\$ 21,00"],
        correct: 3 // Resposta: R\$ 21,00
    }
];

// Variáveis de Controle
let currentQuestionIndex = 0;
let score = 0;

// Elementos do DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressText = document.getElementById('progress');
const scoreText = document.getElementById('score');
const finalScoreText = document.getElementById('final-score');
const finalMessage = document.getElementById('final-message');

// Eventos de Clique
startBtn.addEventListener('click', startMathQuiz);
nextBtn.addEventListener('click', loadNextQuestion);
restartBtn.addEventListener('click', restartMathQuiz);

// Inicializa o Jogo
function startMathQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    updatePlacar();
    displayQuestion();
}

// Renderiza a Pergunta na Tela
function displayQuestion() {
    clearPreviousState();
    const currentData = mathQuizData[currentQuestionIndex];
    
    // Atualiza cabeçalhos
    progressText.innerText = `Conta: ${currentQuestionIndex + 1}/${mathQuizData.length}`;
    questionText.innerText = currentData.question;

    // Gera os botões das alternativas matemáticos
    currentData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => checkAnswer(index, button));
        optionsContainer.appendChild(button);
    });
}

function clearPreviousState() {
    nextBtn.classList.add('hidden');
    optionsContainer.innerHTML = '';
}

// Validação da Resposta Selecionada
function checkAnswer(selectedIndex, selectedButton) {
    const currentData = mathQuizData[currentQuestionIndex];
    const allButtons = optionsContainer.querySelectorAll('.option-btn');

    // Trava os botões após a escolha
    allButtons.forEach(btn => btn.classList.add('disabled'));

    if (selectedIndex === currentData.correct) {
        selectedButton.classList.add('correct');
        score += 20; // 20 pontos por acerto
        updatePlacar();
    } else {
        selectedButton.classList.add('wrong');
        // Exibe a resposta certa piscando em verde
        allButtons[currentData.correct].classList.add('correct');
    }

    nextBtn.classList.remove('hidden');
}

function updatePlacar() {
    scoreText.innerText = `Pontos: ${score}`;
}

// Avança ou Finaliza
function loadNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < mathQuizData.length) {
        displayQuestion();
    } else {
        showMathFinalResults();
    }
}

// Tela de Resultados Matemáticos com Feedbacks Divertidos
function showMathFinalResults() {
    quizScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    finalScoreText.innerText = score;

    if (score === 100) {
        finalMessage.innerText = "Calculadora Humana! Você acertou todas as operações! 🧮🧠✨";
    } else if (score >= 60) {
        finalMessage.innerText = "Muito bem! Sua lógica matemática está super afiada! 📐👍";
    } else {
        finalMessage.innerText = "Treinar te tornará mais forte! Tente novamente para vencer os números! 📉✏️";
    }
}

// Reinicia o Jogo
function restartMathQuiz() {
    endScreen.classList.add('hidden');
    startMathQuiz();
}

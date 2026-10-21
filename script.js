// Banco de Dados de Perguntas (Ciências - 6º Ano: Sistema Solar)
const quizData = [
    {
        question: "Qual é a estrela localizada no centro do nosso Sistema Solar?",
        options: ["A Lua", "O Sol", "Marte", "A Estrela Cadente"],
        correct: 1
    },
    {
        question: "Qual é o planeta conhecido como o 'Planeta Vermelho'?",
        options: ["Júpiter", "Vênus", "Marte", "Mercúrio"],
        correct: 2
    },
    {
        question: "Qual é o planeta em que nós vivemos, famoso por ter muita água líquida?",
        options: ["Terra", "Saturno", "Urano", "Netuno"],
        correct: 0
    },
    {
        question: "Qual desses planetas é famoso por seus grandes e lindos anéis?",
        options: ["Mercúrio", "Saturno", "Terra", "Marte"],
        correct: 1
    },
    {
        question: "O movimento que a Terra faz ao redor do próprio eixo e que gera o dia e a noite chama-se:",
        options: ["Translação", "Gravidade", "Eclipse", "Rotação"],
        correct: 3
    }
];

// Variáveis de Estado do Jogo
let currentQuestionIndex = 0;
let score = 0;

// Mapeamento dos Elementos do DOM
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

// Eventos de Inicialização
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', goToNextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Função para Iniciar o Jogo
function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    updateScoreText();
    loadQuestion();
}

// Função para Carregar a Pergunta Atual
function loadQuestion() {
    resetQuestionState();
    const currentQuestion = quizData[currentQuestionIndex];
    
    // Atualiza Textos
    progressText.innerText = `Pergunta: ${currentQuestionIndex + 1}/${quizData.length}`;
    questionText.innerText = currentQuestion.question;

    // Cria os botões das alternativas dinamicamente
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(index, button));
        optionsContainer.appendChild(button);
    });
}

// Limpa o estado anterior das alternativas e esconde o botão "Próxima"
function resetQuestionState() {
    nextBtn.classList.add('hidden');
    optionsContainer.innerHTML = '';
}

// Função executada ao clicar em uma alternativa
function selectOption(selectedIndex, selectedButton) {
    const currentQuestion = quizData[currentQuestionIndex];
    const allButtons = optionsContainer.querySelectorAll('.option-btn');

    // Desabilita todos os botões para evitar cliques repetidos
    allButtons.forEach(btn => btn.classList.add('disabled'));

    // Verifica se a resposta está correta
    if (selectedIndex === currentQuestion.correct) {
        selectedButton.classList.add('correct');
        score += 20; // Cada acerto vale 20 pontos (total 100)
        updateScoreText();
    } else {
        selectedButton.classList.add('wrong');
        // Mostra visualmente qual era a correta para ajudar no aprendizado
        allButtons[currentQuestion.correct].classList.add('correct');
    }

    // Exibe o botão para avançar
    nextBtn.classList.remove('hidden');
}

// Atualiza o texto do placar
function updateScoreText() {
    scoreText.innerText = `Pontos: ${score}`;
}

// Avança para a próxima pergunta ou encerra o jogo
function goToNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showEndScreen();
    }
}

// Exibe a tela final com feedbacks personalizados baseado no desempenho
function showEndScreen() {
    quizScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    finalScoreText.innerText = score;

    if (score === 100) {
        finalMessage.innerText = "Incrível! Você é um Astronauta Mestre! Acertou tudo! 🚀✨";
    } else if (score >= 60) {
        finalMessage.innerText = "Muito bom! Você conhece muito bem o nosso Sistema Solar! 🌍🛰️";
    } else {
        finalMessage.innerText = "Bom esforço! Que tal revisar a matéria e tentar de novo para melhorar sua pontuação? 📚☄️";
    }
}

// Reinicia o jogo do zero
function restartQuiz() {
    endScreen.classList.add('hidden');
    startQuiz();
}

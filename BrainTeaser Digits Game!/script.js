const questions = [
    { question: "If the hidden number is multiplied by 2 and then 10 is subtracted, the result is 50. What is the number?", options: [25, 35, 45, 50], correctAnswer: 25 },
    { question: "The sum of my digits is 9, and I am greater than 30 but less than 60. Who am I?", options: [39, 48, 57, 51], correctAnswer: 39 },
    { question: "If you divide me by 5, you get a whole number, but I'm not divisible by 10. What number could I be?", options: [25, 30, 35, 40], correctAnswer: 35 },
    { question: "I am a two-digit number. My tens digit is double my ones digit. What number am I?", options: [12, 24, 36, 48], correctAnswer: 24 },
    { question: "I’m not divisible by 2, but if you add 1, I become divisible by 3. What number could I be?", options: [5, 7, 11, 15], correctAnswer: 5 },
    { question: "Multiply me by 3, and the result is between 90 and 120. Guess me!", options: [30, 32, 33, 35], correctAnswer: 33 },
    { question: "I am greater than 50 and less than 70. I am a prime number. Who am I?", options: [51, 53, 59, 67], correctAnswer: 53 },
    { question: "I am a two-digit number. The difference between my digits is 4. What number could I be?", options: [14, 25, 35, 44], correctAnswer: 25 },
    { question: "I am part of the Fibonacci sequence and less than 50. What number am I?", options: [21, 34, 41, 50], correctAnswer: 34 },
    { question: "I am an odd number, but if you remove one letter from me, I become even. What number am I?", options: [7, 9, 11, 13], correctAnswer: 7 },
    { question: "I am a four-digit number. The sum of my digits is 18, and the product of my digits is 162. What number am I?", options: [2889, 3699, 4689, 5799], correctAnswer: 3699 },
    { question: "I am a prime number greater than 100 but less than 200. The sum of my digits is 11. Who am I?", options: [103, 113, 127, 131], correctAnswer: 131 },
    { question: "I am the smallest number that is divisible by both 12 and 18. What number am I?", options: [36, 72, 144, 180], correctAnswer: 36 },
    { question: "The product of my digits is 48, and I am a two-digit number. Who am I?", options: [38, 48, 64, 72], correctAnswer: 48 },
    { question: "I am a number divisible by 6, but not by 12. What number could I be?", options: [18, 24, 30, 36], correctAnswer: 18 },
    { question: "I am a perfect square and a perfect cube, but not both. What number am I?", options: [64, 125, 216, 729], correctAnswer: 64 },
    { question: "I am a two-digit number. The sum of my digits is 9, and the difference between my digits is 3. What number could I be?", options: [24, 42, 51, 63], correctAnswer: 42 },
    { question: "I am a two-digit number. My tens digit is three times my ones digit, and the difference between my digits is 6. Who am I?", options: [36, 72, 63, 84], correctAnswer: 36 },
    { question: "I am a four-digit number. The sum of my digits is 25, and the difference between my hundreds and tens digit is 3. What number am I?", options: [7998, 8997, 8996, 9876], correctAnswer: 7998 },
    { question: "I am a number that when divided by 2 gives a remainder of 1, when divided by 3 gives a remainder of 2, and when divided by 5 gives a remainder of 4. What number am I?", options: [29, 49, 59, 69], correctAnswer: 29 }
];

let currentQuestionIndex = 0;
let coins = 0;
let level = 1; // Easy = 1, Medium = 2, Hard = 3
let isGameOver = false;

const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const storeButton = document.getElementById('storeButton');
const levelElement = document.getElementById('level');
const coinsElement = document.getElementById('coins');
const questionTextElement = document.getElementById('questionText');
const optionsContainer = document.getElementById('options');
const hintMessageElement = document.getElementById('hintMessage');
const resultMessageElement = document.getElementById('resultMessage');
const storeCard = document.getElementById('storeCard');
const hintButtonStore = document.getElementById('hintButtonStore');
const skipButtonStore = document.getElementById('skipButtonStore');

// Start Game
function startGame() {
    isGameOver = false;
    currentQuestionIndex = 0;
    coins = 0;
    level = 1; // Reset to easy
    updateUI();
    loadQuestion();
    startButton.style.display = 'none';
    restartButton.style.display = 'none';
    storeButton.style.display = 'block';
}

// Update UI
function updateUI() {
    coinsElement.textContent = `Coins: ${coins}`;

    let levelText = '';
    let levelColor = '';

    if (currentQuestionIndex < 7) {
        level = 1;  // Easy
        levelText = 'Easy';
        levelColor = 'green';
    } else if (currentQuestionIndex < 14) {
        level = 2;  // Medium
        levelText = 'Medium';
        levelColor = 'orange';
    } else {
        level = 3;  // Hard
        levelText = 'Hard';
        levelColor = 'red';
    }

    levelElement.textContent = `Level: ${levelText}`;
    levelElement.style.color = levelColor;


    levelElement.textContent = `Level: ${['Easy', 'Medium', 'Hard'][level - 1]}`;

    const questionNumberElement = document.getElementById('questionNumber');
    questionNumberElement.textContent = `Question: ${currentQuestionIndex + 1} / ${questions.length}`;
}


// Load Question
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        handleGameOver();
        return;
    }
    let question = questions[currentQuestionIndex];

    questionTextElement.textContent = question.question;
    optionsContainer.innerHTML = '';

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-outline-primary', 'btn-option');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

// Check Answer
function checkAnswer(selectedOption) {
    let question = questions[currentQuestionIndex];
    
    // Pehle dono classes ko remove karo
    resultMessageElement.classList.remove('text-success', 'text-danger');
    
    if (selectedOption === question.correctAnswer) {
        resultMessageElement.textContent = 'Correct! You earned 10 coins.';
        resultMessageElement.classList.add('text-success');
        coins += 10; // Reward coins
        currentQuestionIndex++;
        
        if (currentQuestionIndex >= questions.length) {
            handleGameOver();
        } else {
            loadQuestion();
        }
        updateUI();
    } else {
        resultMessageElement.textContent = 'Wrong! Try again.';
        resultMessageElement.classList.add('text-danger');
    }
}


function handleGameOver() {
    isGameOver = true;
    resultMessageElement.textContent = 'Game Over! You finished the game.';
    restartButton.style.display = 'block';
    storeButton.style.display = 'none';
}

restartButton.onclick = startGame;

// Store Functionality
storeButton.onclick = () => {
    storeCard.style.display = 'block';
};

// Hint and Skip in Store
hintButtonStore.onclick = () => {
    if (coins >= 10) {
        coins -= 10; // Deduct 10 coins for a hint

        const hints = [
            'Think about how subtraction and multiplication work together.',
            'The number is between 30 and 60, and the sum of the digits is 9.',
            'The number is divisible by 5 but not by 10. Look for odd numbers.',
            'The tens digit is double the ones digit.',
            'It’s an odd number. Adding 1 makes it divisible by 3.',
            'Multiply numbers by 3 to get a result between 90 and 120.',
            'The number is prime and lies between 50 and 70.',
            'Look for a number where the digits differ by 4.',
            'This number is part of the Fibonacci sequence (e.g., 13, 21, 34).',
            'It’s an odd number. Remove one letter from its spelling to get an even number.',
            'The sum of the digits is 18, and their product is 162.',
            'Find a prime number between 100 and 200 with digits summing to 11.',
            'The number is divisible by both 12 and 18 (try LCM).',
            'Think of two digits that multiply to 48.',
            'This number is divisible by 6 but not by 12.',
            'It’s a perfect square and cube. Find small numbers fitting both!',
            'The sum of digits is 9, and the difference is 3.',
            'The tens digit is three times the ones digit.',
            'Digits sum to 25, and the hundreds digit minus the tens digit is 3.',
            'The number leaves a remainder of 1 when divided by 2 and 2 when divided by 3.'
        ];

        // Get the hint for the current question or show a default message
        const hintMessage = hints[currentQuestionIndex] || 'No hint available for this question.';
        
        hintMessageElement.textContent = hintMessage;
        updateUI();
    } else {
        hintMessageElement.textContent = 'You don\'t have enough coins for a hint.';
    }
};

skipButtonStore.onclick = () => {
    if (coins >= 20) {
        coins -= 20; // Deduct 20 coins for a skip
        currentQuestionIndex++; // Skip to the next question
        loadQuestion();
        updateUI();
    } else {
        hintMessageElement.textContent = 'You don\'t have enough coins to skip the question.';
    }
};

// Start the game
startButton.onclick = startGame;

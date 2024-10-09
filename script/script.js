const sonic = document.querySelector('.sonic');
const gameOver = document.querySelector('.game-over');
const robo = document.querySelector('.robo');
const restartButton = document.querySelector('.restart');
const cloud = document.querySelector('.cloud');
const gameBoard = document.querySelector('.game-board');
const bgAudio = document.getElementById('bg-audio');
const gameOverAudio = document.getElementById('game-over-audio');
const arvores = document.querySelectorAll('.arvores');
const scoreDisplay = document.querySelector('.score'); // Elemento para exibir a pontuação
const finalScoreDisplay = document.querySelector('.final-score'); // Elemento para exibir a pontuação final

let jumpCount = 0; 
let isGameOver = false; 
let isJumping = false; 
let currentBackgroundIndex = 0; 

const sonicRunLeft = 'img/sonic-left.gif'; 
const sonicRunRight = 'img/sonic2.gif'; 
let isRunningLeft = false; 

const backgroundImages = [
    'url("img/level-1.jpg")',
    'url("img/level-2.jpg")',
    'url("img/level-3.jpg")',
    'url("img/level-4.jpg")',
    'url("img/level-5.jpg")',
    'url("img/level-6.gif")',
    'url("img/level-7.gif")',
];

const sonicImages = [
    'img/jump.gif'
];

let score = 0; // Variável para armazenar a pontuação

const changeBackground = () => {
    gameBoard.style.backgroundImage = backgroundImages[currentBackgroundIndex];
}

const checkBackgroundChange = () => {
    if (jumpCount % 10 === 0 && jumpCount > 0) {
        increaseRobotSpeed();
        currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
        changeBackground();
    }
}

const increaseRobotSpeed = () => {
    const currentAnimation = window.getComputedStyle(robo).animationDuration;
    const currentDuration = parseFloat(currentAnimation);
    const newDuration = currentDuration * 0.8; 
    robo.style.animationDuration = `${newDuration}s`;

    arvores.forEach(arvore => {
        const currentArvoreAnimation = window.getComputedStyle(arvore).animationDuration;
        const currentArvoreDuration = parseFloat(currentArvoreAnimation);
        const newArvoreDuration = currentArvoreDuration * 0.7; 
        arvore.style.animationDuration = `${newArvoreDuration}s`;
    });
}

const updateScore = () => {
    score++;
    scoreDisplay.textContent = `Pontuação: ${score}`; // Atualiza a exibição da pontuação
};

const changeSonicImage = () => {
    sonic.src = sonicImages[Math.floor(Math.random() * sonicImages.length)];
    setTimeout(() => {
        sonic.src = isRunningLeft ? sonicRunLeft : sonicRunRight;
    }, 500);
}

const jump = () => {
    if (isGameOver || isJumping) return; 
    isJumping = true; 
    sonic.classList.add('jump');
    setTimeout(() => {
        sonic.classList.remove('jump');
        isJumping = false; 
    }, 500);
    jumpCount++;
    checkBackgroundChange();
    changeSonicImage();
    updateScore(); // Atualiza a pontuação ao pular

    }

const handleGameOver = () => {
    isGameOver = true; 
    bgAudio.pause(); 
    gameOverAudio.play(); 
    robo.style.animation = 'none';
    sonic.src = '';

    const gameOverText = document.querySelector('.game-over-text');
    gameOverText.innerHTML = ""; 

    const message = "GAME OVER";
    message.split('').forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.classList.add('letter');
        span.style.animationDelay = `${index * 0.1}s`; 
        gameOverText.appendChild(span);
    });

    finalScoreDisplay.textContent = `Pontuação Final: ${score}`; // Mostra a pontuação final

    gameOver.style.visibility = 'visible'; 
    
    setTimeout(() => {
        const letters = document.querySelectorAll('.letter');
        letters.forEach(letter => {
            letter.style.opacity = '1'; 
            letter.style.transform = 'none'; 
        });
    }, message.length * 100 + 500); 
}

const moveObstacles = () => {
    const obstacles = document.querySelectorAll('.obstacle'); 
    obstacles.forEach(obstacle => {
        let obstaclePosition = obstacle.offsetLeft;

        if (obstaclePosition <= -50) {
            obstacle.style.left = `${gameBoard.offsetWidth}px`; 
        } else {
            obstacle.style.left = `${obstaclePosition - 5}px`; 
        }
    });
};

const loop = setInterval(() => {
    moveObstacles(); 

    const roboPosition = robo.offsetLeft;
    const sonicPosition = sonic.offsetLeft; 

    if (!isJumping && sonicPosition >= roboPosition && sonicPosition <= roboPosition + 50) {
        handleGameOver();
    }

    const obstacles = document.querySelectorAll('.obstacle'); 
    obstacles.forEach(obstacle => {
        const obstaclePosition = obstacle.offsetLeft;

        if (sonicPosition + 50 >= obstaclePosition && sonicPosition <= obstaclePosition + 50) {
            handleGameOver(); 
        }
    });
});

const restart = () => {
    score = 0; // Reseta a pontuação
    scoreDisplay.textContent = 'Pontuação: 0'; // Reseta a exibição da pontuação
    location.reload(); 
}

restartButton.addEventListener('click', restart);

document.addEventListener('keydown', (event) => {
    const sonicPosition = sonic.offsetLeft;

    if (event.code === 'ArrowRight' && sonicPosition < gameBoard.offsetWidth - 50) {
        sonic.src = sonicRunRight; 
        sonic.style.left = `${sonicPosition + 10}px`;
        sonic.style.bottom = '0px'; 
    } else if (event.code === 'ArrowLeft' && sonicPosition > 0) {
        sonic.src = sonicRunLeft; 
        sonic.style.left = `${sonicPosition - 10}px`;
        sonic.style.bottom = '-15px'; 
        isRunningLeft = true; 
    }

    if (event.code === 'Space' && !isGameOver) {
        jump();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowLeft') {
        sonic.src = sonicRunRight; 
        isRunningLeft = false; 
        sonic.style.bottom = '0px'; 
    }
});

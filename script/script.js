const sonic = document.querySelector('.sonic');
const gameOver = document.querySelector('.game-over');
const robo = document.querySelector('.robo');
const restartButton = document.querySelector('.restart');
const cloud = document.querySelector('.cloud');
const gameBoard = document.querySelector('.game-board');
const bgAudio = document.getElementById('bg-audio');
const gameOverAudio = document.getElementById('game-over-audio'); // Novo áudio
const arvores = document.querySelectorAll('.arvores');

let jumpCount = 0; // Contador de pulos
let isGameOver = false; // Controla o estado do jogo
let isJumping = false; // Controla se o Sonic está pulando
let currentBackgroundIndex = 0; // Índice da imagem de fundo atual

const backgroundImages = [
    'url("img/paisagem1.jpg")',
    'url("img/paisagem3.jpg")',
    'url("img/paisagem4.jpg")',
    'url("img/paisagem6.jpg")',
    'url("img/paisagem7.gif")',
    'url("img/paisagem5.jpg")',
    'url("img/paisagem10.gif")',
];

const sonicImages = [
    'img/jump.gif'
];

// Adicione novos obstáculos
const obstacles = document.querySelectorAll('.obstacle');

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
    const newDuration = currentDuration * 0.8; // Diminui a duração em 20%
    robo.style.animationDuration = `${newDuration}s`;

    // Acelera as árvores também
    arvores.forEach(arvore => {
        const currentArvoreAnimation = window.getComputedStyle(arvore).animationDuration;
        const currentArvoreDuration = parseFloat(currentArvoreAnimation);
        const newArvoreDuration = currentArvoreDuration * 0.8; // Diminui a duração em 20%
        arvore.style.animationDuration = `${newArvoreDuration}s`;
    });
}

const changeSonicImage = () => {
    sonic.src = sonicImages[Math.floor(Math.random() * sonicImages.length)];
    setTimeout(() => {
        sonic.src = 'img/sonic2.gif'; // Imagem de corrida
    }, 500);
}

const jump = () => {
    if (isGameOver || isJumping) return; // Não permite pular se o jogo estiver acabado ou se já estiver pulando
    isJumping = true; // Marca que o Sonic está pulando
    sonic.classList.add('jump');
    setTimeout(() => {
        sonic.classList.remove('jump');
        isJumping = false; // Permite pular novamente após o pulo
    }, 500);
    jumpCount++;
    checkBackgroundChange();
    changeSonicImage();
}

const handleGameOver = () => {
    isGameOver = true; // Para o jogo
    bgAudio.pause(); // Para a música de fundo
    gameOverAudio.play(); // Toca o áudio de Game Over
    robo.style.animation = 'none';
    sonic.src = 'img/game-over.png';
    gameOver.style.visibility = 'visible';
    const gameOverText = document.querySelector('.game-over-text');
    gameOverText.style.visibility = 'visible'; // Torna o texto visível
}

// Movimentação dos obstáculos
const moveObstacles = () => {
    obstacles.forEach(obstacle => {
        let obstaclePosition = obstacle.offsetLeft;

        // Mova o obstáculo para a esquerda
        if (obstaclePosition <= -50) {
            obstacle.style.left = `${gameBoard.offsetWidth}px`; // Reseta para a direita
        } else {
            obstacle.style.left = `${obstaclePosition - 5}px`; // Mova para a esquerda
        }
    });
};

const loop = setInterval(() => {
    moveObstacles(); // Chame a função de movimento dos obstáculos

    const roboPosition = robo.offsetLeft;
    const sonicPosition = sonic.offsetLeft; // Posição do Sonic

    // Verifique a colisão com o robô
    if (!isJumping && sonicPosition >= roboPosition && sonicPosition <= roboPosition + 50) {
        handleGameOver();
    }

    // Verifique a colisão com os obstáculos
    obstacles.forEach(obstacle => {
        const obstaclePosition = obstacle.offsetLeft;

        // Ajuste a verificação de colisão
        if (sonicPosition + 50 >= obstaclePosition && sonicPosition <= obstaclePosition + 50) {
            handleGameOver(); // Game Over ao colidir com o obstáculo
        }
    });
});

const restart = () => {
    location.reload(); // Recarrega a página
}

restartButton.addEventListener('click', restart);
document.addEventListener('keydown', (event) => {
    const sonicPosition = sonic.offsetLeft;

    // Mover para a direita
    if (event.code === 'ArrowRight' && sonicPosition < gameBoard.offsetWidth - 50) {
        sonic.style.left = `${sonicPosition + 10}px`;
    }
    
    // Mover para a esquerda
    else if (event.code === 'ArrowLeft' && sonicPosition > 0) {
        sonic.style.left = `${sonicPosition - 10}px`;
    }

    // Pular
    if (event.code === 'Space' && !isGameOver) {
        jump();
    }
});

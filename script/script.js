const sonic = document.querySelector('.sonic');
const gameOver = document.querySelector('.game-over');
const robo = document.querySelector('.robo');
const restartButton = document.querySelector('.restart');
const cloud = document.querySelector('.cloud');
const gameBoard = document.querySelector('.game-board');
const bgAudio = document.getElementById('bg-audio');
const gameOverAudio = document.getElementById('game-over-audio');
const arvores = document.querySelectorAll('.arvores');

let jumpCount = 0; // Contador de pulos
let isGameOver = false; // Controla o estado do jogo
let isJumping = false; // Controla se o Sonic está pulando
let currentBackgroundIndex = 0; // Índice da imagem de fundo atual

const sonicRunLeft = 'img/sonic-left.gif'; // Nova imagem do Sonic correndo para a esquerda
const sonicRunRight = 'img/sonic2.gif'; // Imagem do Sonic correndo para a direita
let isRunningLeft = false; // Controla se Sonic está correndo para a esquerda

const backgroundImages = [
    'url("img/level-1.jpg")',
    'url("img/level-2.jpg")',
    'url("img/level-3.jpg")',
    'url("img/level-4.jpg")',
    'url("img/level-5.gif")',
    'url("img/level-6.jpg")',
    'url("img/level-7.gif")',
];

const sonicImages = [
    'img/jump.gif'
];

// Adicionando novos obstáculos
const obstacles = document.querySelectorAll('.obstacle');

// Função para mudar o fundo do jogo
const changeBackground = () => {
    gameBoard.style.backgroundImage = backgroundImages[currentBackgroundIndex];
}

// Função para verificar se é hora de mudar o fundo
const checkBackgroundChange = () => {
    if (jumpCount % 10 === 0 && jumpCount > 0) {
        increaseRobotSpeed();
        currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
        changeBackground();
    }
}

// Função para aumentar a velocidade do robô e das árvores
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

// Função para mudar a imagem do Sonic ao pular
const changeSonicImage = () => {
    sonic.src = sonicImages[Math.floor(Math.random() * sonicImages.length)];
    setTimeout(() => {
        sonic.src = isRunningLeft ? sonicRunLeft : sonicRunRight; // Retorna à imagem correta após o pulo
    }, 500);
}

// Função de pular
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

// Função para lidar com o Game Over
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

// Função para movimentação dos obstáculos
const moveObstacles = () => {
    obstacles.forEach(obstacle => {
        let obstaclePosition = obstacle.offsetLeft;

        // Mova o obstáculo para a esquerda
        if (obstaclePosition <= -50) {
            obstacle.style.left = `${gameBoard.offsetWidth}px`; // Reseta para a direita
        } else {
            obstacle.style.left = `${obstaclePosition - 5}px`; // Move para a esquerda
        }
    });
};

// Loop principal do jogo
const loop = setInterval(() => {
    moveObstacles(); // Chama a função de movimento dos obstáculos

    const roboPosition = robo.offsetLeft;
    const sonicPosition = sonic.offsetLeft; // Posição do Sonic

    // Verifica a colisão com o robô
    if (!isJumping && sonicPosition >= roboPosition && sonicPosition <= roboPosition + 50) {
        handleGameOver();
    }

    // Verifica a colisão com os obstáculos
    obstacles.forEach(obstacle => {
        const obstaclePosition = obstacle.offsetLeft;

        // Ajuste a verificação de colisão
        if (sonicPosition + 50 >= obstaclePosition && sonicPosition <= obstaclePosition + 50) {
            handleGameOver(); // Game Over ao colidir com o obstáculo
        }
    });
});

// Função para reiniciar o jogo
const restart = () => {
    location.reload(); // Recarrega a página
}

// Evento para o botão de reinício
restartButton.addEventListener('click', restart);

// Evento para movimentar o Sonic com as teclas
document.addEventListener('keydown', (event) => {
    const sonicPosition = sonic.offsetLeft;

    // Mover para a direita
    if (event.code === 'ArrowRight' && sonicPosition < gameBoard.offsetWidth - 50) {
        sonic.src = sonicRunRight; // Altera a imagem para correr para a direita
        sonic.style.left = `${sonicPosition + 10}px`;
        sonic.style.bottom = '0px'; // Garante que Sonic esteja no chão
    }

    // Mover para a esquerda
    else if (event.code === 'ArrowLeft' && sonicPosition > 0) {
        sonic.src = sonicRunLeft; // Altera a imagem para correr para a esquerda
        sonic.style.left = `${sonicPosition - 10}px`;
        sonic.style.bottom = '-15px'; // Garante que Sonic esteja no chão
        isRunningLeft = true; // Marca que Sonic está correndo para a esquerda
    }

    // Pular
    if (event.code === 'Space' && !isGameOver) {
        jump();
    }
});

// Evento para soltar a tecla
document.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowLeft') {
        sonic.src = sonicRunRight; // Retorna a imagem do Sonic para a corrida normal
        isRunningLeft = false; // Marca que Sonic não está mais correndo para a esquerda
        sonic.style.bottom = '0px'; // Garante que Sonic esteja no chão
    }
});

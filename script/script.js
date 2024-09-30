const sonic = document.querySelector('.sonic');
const gameOver = document.querySelector('.game-over');
const robo = document.querySelector('.robo');
const restartButton = document.querySelector('.restart');
const cloud = document.querySelector('.cloud');
const gameBoard = document.querySelector('.game-board');
const bgAudio = document.getElementById('bg-audio');

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

const changeBackground = () => {
    gameBoard.style.backgroundImage = backgroundImages[currentBackgroundIndex];
}

const checkBackgroundChange = () => {
    if (jumpCount % 10 === 0 && jumpCount > 0) {
        increaseRobotSpeed();
        currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
        changeBackground();
    }

    if (jumpCount === 30) {
        changeSonicImage();
        jumpCount = 0; // Reinicia o contador de pulos
    }
}

const changeRobotImage = () => {
    robo.src = 'img/shadow.gif'; // Altere para o caminho da imagem do Shadow
}

const increaseRobotSpeed = () => {
    const currentAnimation = window.getComputedStyle(robo).animationDuration;
    const currentDuration = parseFloat(currentAnimation);
    const newDuration = currentDuration * 0.8; // Diminui a duração em 20%
    robo.style.animationDuration = `${newDuration}s`;
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
    robo.style.animation = 'none';
    sonic.src = 'img/game-over.png';
    gameOver.style.visibility = 'visible';
    const gameOverText = document.querySelector('.game-over-text');
    gameOverText.style.visibility = 'visible'; // Torna o texto visível
}

const loop = setInterval(() => {
    const roboPosition = robo.offsetLeft;
    const sonicPosition = sonic.offsetLeft + 50; // Largura do Sonic

    // Verifica colisão apenas se Sonic não estiver pulando
    if (!isJumping && sonicPosition >= roboPosition && sonicPosition <= roboPosition + 50) {
        handleGameOver();
    }

    // Lógica existente para Game Over
    if (roboPosition <= 100 && roboPosition > 0 && sonicPosition < 60) {
        handleGameOver();
    }
});

const restart = () => {
    location.reload(); // Recarrega a página
}

restartButton.addEventListener('click', restart);
document.addEventListener('keydown', (event) => {
    const sonicPosition = sonic.offsetLeft;

    if (event.code === 'ArrowRight' && sonicPosition < gameBoard.offsetWidth - 50) {
        sonic.style.left = `${sonicPosition + 10}px`;
    } else if (event.code === 'ArrowLeft' && sonicPosition > 0) {
        sonic.style.left = `${sonicPosition - 10}px`;
    }

    if (event.code === 'Space' && !isGameOver) {
        jump();
    }
});

// Se quiser manter suporte para toque, você pode adicionar novamente
// document.addEventListener('touchstart', () => {
//     if (!isGameOver) {
//         jump();
//     }
// });

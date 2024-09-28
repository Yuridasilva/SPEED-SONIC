const sonic = document.querySelector('.sonic');
const gameOver = document.querySelector('.game-over');
const robo = document.querySelector('.robo');
const robo2 = document.querySelector('.robo2');
const restartButton = document.querySelector('.restart');
const cloud = document.querySelector('.cloud');
const gameBoard = document.querySelector('.game-board'); // Div que contém a imagem de fundo do jogo



let jumpCount = 0; // Contador de pulos
let currentBackgroundIndex = 0; // Índice da imagem de fundo atual
const backgroundImages = [
    'url("img/paisagem1.jpg")',
    'url("img/paisagem7.gif")',
    'url("img/paisagem3.jpg")',
    'url("img/paisagem4.jpg")',
    'url("img/paisagem6.jpg")',
    'url("img/paisagem5.jpg")',
    'url("img/paisagem7.gif")',
    'url("img/paisagem8.jpg")',
    'url("img/paisagem10.gif")',

    // Adicione quantas imagens de fundo desejar
];

// Lista de imagens do Sonic
const sonicImages = [
    'img/jump.gif',
    'img/jump1.gif',
    // Adicione quantas imagens do Sonic desejar
];

// Função para mudar a imagem de fundo do jogo
const changeBackground = () => {
    gameBoard.style.backgroundImage = backgroundImages[currentBackgroundIndex];
}

// Função para verificar se o contador atingiu um múltiplo de 10 e mudar o fundo, se necessário
const checkBackgroundChange = () => {
    if (jumpCount % 10 === 0 && jumpCount > 0) {
        // Aumenta a velocidade do robô
        increaseRobotSpeed();

        // Atualiza o índice da imagem de fundo
        currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
        // Muda a imagem de fundo
        changeBackground();
    }

    // Verifica se pulou 30 vezes para alterar a imagem do robô e do Sonic
    if (jumpCount === 30) {
        changeSonicImage();
        changeRobotImage();
        jumpCount = 0; // Reinicia o contador de pulos
    }
}

// Função para aumentar a velocidade do robô
const increaseRobotSpeed = () => {
    // Aumenta a velocidade do robô aqui, por exemplo:
    const currentAnimation = window.getComputedStyle(robo).animationDuration;
    const currentDuration = parseFloat(currentAnimation);
    const newDuration = currentDuration * 0.8; // Diminui a duração em 20%
    robo.style.animationDuration = `${newDuration}s`;
}

// Função para alterar a imagem do Sonic
const changeSonicImage = () => {
    // Seleciona aleatoriamente uma imagem do Sonic
    sonic.src = sonicImages[Math.floor(Math.random() * sonicImages.length)];
    // Volta para a imagem de corrida após 0.5s
    setTimeout(() => {
        sonic.src = 'img/sonic2.gif'; // Assumindo que 'img/sonic2.gif' é a imagem de corrida
    }, 500);
}

const increaseRobotSize = () => {
    robo.style.width = '150px';  // Ajuste o tamanho conforme necessário
    robo.style.height = '150px'; // Ajuste o tamanho conforme necessário
};

// Função para alterar a imagem do robô
const changeRobotImage = () => {
    // Lógica para trocar a imagem do robô
    // Por exemplo:
    robo.src = 'img/shadow.gif'; // Altere para o caminho da nova imagem do robô
    increaseRobotSize(); // Aumenta o tamanho quando a imagem muda
}

const jump = () => {
    sonic.classList.add('jump');
    setTimeout(() => {
        sonic.classList.remove('jump');
    }, 500);
    // Incrementa o contador de pulos
    jumpCount++;
    // Verifica se é necessário mudar o fundo e a imagem do robô e do Sonic
    checkBackgroundChange();
    // Altera a imagem do Sonic
    changeSonicImage();
}

const loop = setInterval(() => {
    const roboPosition = robo.offsetLeft;
    const sonicPosition = +window.getComputedStyle(sonic).bottom.replace('px', '');
    const cloudPosition = +window.getComputedStyle(cloud).left.replace('px', '');

    if (roboPosition <= 100 && roboPosition > 0 && sonicPosition < 60) {
        robo.style.animation = 'none';
        robo.style.left = `${roboPosition}px`;

        sonic.style.animation = 'none';
        sonic.style.bottom = `${sonicPosition}px`;

        sonic.src = 'img/game-over.png';
        sonic.style.width = '180px';
        sonic.style.marginLeft = '35px';

        cloud.style.animation = 'cloud 20s infinite linear';
        cloud.style.left = `${cloudPosition}px`;

        gameOver.style.visibility = 'visible';

        clearInterval(loop);
    }
});

const restart = () => {
    location.reload();
}

document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);

restartButton.addEventListener('click', restart);

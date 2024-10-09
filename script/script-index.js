const audio = document.getElementById("bg-audio");//configuração do audio
const startButton = document.getElementById("start-button");// botao de start ao game
const settingsButton = document.getElementById("settings-button");//configuração dos botões
const closeSettingsButton = document.getElementById("close-settings");//fecha a o botao responsavel pela configuraçao
const volumeControl = document.getElementById("volume");//responsavel pelo volume do game 
const loadingMessage = document.getElementById("loading-message");//tempo de translasão para outro site
const exitButton = document.getElementById("exit-button");//botao para sair do game

function redirectToGame() {
    // Mostra a mensagem de carregamento e o spinner
    loadingMessage.classList.remove("hidden");
    loadingMessage.style.opacity = 1;

    // Adiciona a animação de desvanecer
    document.body.classList.add("fade-out");

    // Aguarda a animação terminar antes de redirecionar
    setTimeout(function() {
        window.location.href = "sonic.html"; // Redireciona para o jogo
    }, 500); // Tempo deve ser igual ao da animação
}

startButton.addEventListener("click", redirectToGame);

settingsButton.addEventListener("click", function() {
    document.getElementById("settings-menu").classList.toggle("hidden");
});

closeSettingsButton.addEventListener("click", function() {
    document.getElementById("settings-menu").classList.add("hidden");
});

// Controle de volume
volumeControl.addEventListener("input", function() {
    audio.volume = this.value / 100; // Define o volume de 0 a 1
    localStorage.setItem("volume", this.value); // Salva o volume no localStorage
});

// Aplicar volume salvo ao carregar
window.onload = function() {
    const savedVolume = localStorage.getItem("volume");
    if (savedVolume) {
        audio.volume = savedVolume / 100; // Aplica o volume salvo
        volumeControl.value = savedVolume; // Atualiza o controle deslizante
    }
};

// Instruções
document.getElementById('instructions-button').addEventListener('click', function() {
    document.getElementById('instructions-menu').classList.remove('hidden');
});

document.getElementById('close-instructions').addEventListener('click', function() {
    document.getElementById('instructions-menu').classList.add('hidden');
});

// Sair do Jogo
exitButton.addEventListener("click", function() {
    if (confirm("Você realmente deseja sair do jogo?")) {
        window.close(); // Tenta fechar a janela
        // Se não funcionar, você pode redirecionar
        // window.location.href = "index.html"; // Altere para sua página inicial se precisar
    }
});

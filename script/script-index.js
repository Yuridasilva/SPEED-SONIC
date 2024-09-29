document.getElementById("start-button").addEventListener("click", function() {
    window.location.href = "sonic.html"; // Redireciona para o jogo
});

document.getElementById("settings-button").addEventListener("click", function() {
    document.getElementById("settings-menu").classList.toggle("hidden");
});

document.getElementById("close-settings").addEventListener("click", function() {
    document.getElementById("settings-menu").classList.add("hidden");
});

const audio = document.getElementById("bg-audio");
document.getElementById("volume").addEventListener("input", function() {
    audio.volume = this.value / 100; // Define o volume de 0 a 1
});

document.getElementById("volume").addEventListener("input", function() {
    audio.volume = this.value / 100;
    localStorage.setItem("volume", this.value); // Salva o volume no localStorage
});

window.onload = function() {
    const savedVolume = localStorage.getItem("volume");
    if (savedVolume) {
        audio.volume = savedVolume / 100; // Aplica o volume salvo
        document.getElementById("volume").value = savedVolume; // Atualiza o controle deslizante
    }
};

document.getElementById("start-button").addEventListener("click", function() {
    // Adiciona a animação de desvanecer
    document.body.classList.add("fade-out");

    // Aguarda a animação terminar antes de redirecionar
    setTimeout(function() {
        window.location.href = "sonic.html"; // Redireciona para o jogo
    }, 500); // Tempo deve ser igual ao da animação
});

document.getElementById("start-button").addEventListener("click", function() {
    // Mostra a mensagem de carregamento
    document.getElementById("loading-message").classList.remove("hidden");
    document.getElementById("loading-message").style.opacity = 1;

    // Adiciona a animação de desvanecer
    document.body.classList.add("fade-out");

    // Aguarda a animação terminar antes de redirecionar
    setTimeout(function() {
        window.location.href = "sonic.html"; // Redireciona para o jogo
    }, 500); // Tempo deve ser igual ao da animação
});

document.getElementById("start-button").addEventListener("click", function() {
    // Mostra a mensagem de carregamento e o spinner
    document.getElementById("loading-message").classList.remove("hidden");
    document.getElementById("loading-message").style.opacity = 1;

    // Adiciona a animação de desvanecer
    document.body.classList.add("fade-out");

    // Aguarda a animação terminar antes de redirecionar
    setTimeout(function() {
        window.location.href = "sonic.html"; // Redireciona para o jogo
    }, 500); // Tempo deve ser igual ao da animação
});

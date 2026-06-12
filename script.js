document.addEventListener('DOMContentLoaded', () => {
    const btnStart = document.getElementById('btn-start');
    const landingScreen = document.getElementById('landing-screen');
    const mainContent = document.getElementById('main-content');
    const btnReveal = document.getElementById('btn-reveal');
    const specialMessage = document.getElementById('special-message');
    const playPauseBtn = document.getElementById('play-pause');
    const music = document.getElementById('background-music');

    // Troca de tela
    btnStart.addEventListener('click', () => {
        landingScreen.classList.remove('active');
        mainContent.classList.add('active');
        // Tentar dar play na música (pode ser bloqueado pelo navegador até interação)
        music.play().catch(e => console.log("Música aguardando interação"));
    });

    // Revelar mensagem
    btnReveal.addEventListener('click', () => {
        specialMessage.classList.remove('blurred');
        btnReveal.style.display = 'none';
    });

    // Controle de música simples
    playPauseBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            playPauseBtn.textContent = '⏸';
        } else {
            music.pause();
            playPauseBtn.textContent = '▶';
        }
    });

    // Contador de Tempo (Configure a data aqui)
    const startDate = new Date('2022-01-01T00:00:00'); // <--- COLOQUE A DATA DO INÍCIO AQUI

    function updateTimer() {
        const now = new Date();
        const diff = now - startDate;

        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('years').textContent = years;
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }

    setInterval(updateTimer, 1000);
    updateTimer();
});

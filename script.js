document.addEventListener('DOMContentLoaded', () => {
    const btnStart = document.getElementById('btn-start');
    const landingScreen = document.getElementById('landing-screen');
    const mainContent = document.getElementById('main-content');
    const btnReveal = document.getElementById('btn-reveal');
    const specialMessage = document.getElementById('special-message');
    const playPauseBtn = document.getElementById('play-pause');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnShuffle = document.getElementById('btn-shuffle');
    const btnRepeat = document.getElementById('btn-repeat');
    const music = document.getElementById('background-music');
    const musicTitle = document.getElementById('music-title');
    const musicArtist = document.getElementById('music-artist');
    const progressBar = document.querySelector('.progress');
    const currentTimeLabel = document.querySelector('.time span:first-child');
    const remainingTimeLabel = document.querySelector('.time span:last-child');

    // Playlist de músicas.
    // Para adicionar novas músicas, coloque o arquivo em assets/music e adicione o nome aqui.
    // Extensões recomendadas: .mp3, .ogg, .wav. O mais compatível para web é .mp3.
    const playlist = [
        'carta-branca-flavio-ferrari-voce-tem-carta-branca-nesse-meu-coracao.mp3',
        'juanes-para-tu-amor.mp3',
        'amor-i-love-you.mp3',
        'fly-me-to-the-moon-por-lorenza-pozza.mp3'
    ];

    let currentIndex = 0;
    let isShuffle = false;
    let isRepeat = false;

    function formatTitle(filename) {
        const name = filename.replace(/\.[^/.]+$/, '');
        return name.replace(/[-_]/g, ' ').replace(/^.*\//, '');
    }

    function updateTrackInfo() {
        const fileName = playlist[currentIndex];
        music.src = `assets/music/${fileName}`;
        musicTitle.textContent = formatTitle(fileName);
        musicArtist.textContent = 'Nossa playlist';
    }

    function updateButtons() {
        btnShuffle.classList.toggle('active', isShuffle);
        btnRepeat.classList.toggle('active', isRepeat);
    }

    function formatTime(time) {
        if (isNaN(time) || time === Infinity) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    function updateProgress() {
        if (!music.duration) return;
        const percent = (music.currentTime / music.duration) * 100;
        progressBar.style.width = `${percent}%`;
        currentTimeLabel.textContent = formatTime(music.currentTime);
        remainingTimeLabel.textContent = `-${formatTime(music.duration - music.currentTime)}`;
    }

    function playTrack() {
        music.play().catch(() => {
            console.log('Música aguardando interação do usuário');
        });
        playPauseBtn.textContent = '⏸';
    }

    function pauseTrack() {
        music.pause();
        playPauseBtn.textContent = '▶';
    }

    function setTrack(index) {
        currentIndex = (index + playlist.length) % playlist.length;
        updateTrackInfo();
    }

    function nextTrack() {
        if (isShuffle) {
            let nextIndex = Math.floor(Math.random() * playlist.length);
            if (playlist.length > 1) {
                while (nextIndex === currentIndex) {
                    nextIndex = Math.floor(Math.random() * playlist.length);
                }
            }
            setTrack(nextIndex);
        } else {
            setTrack(currentIndex + 1);
        }
        playTrack();
    }

    function prevTrack() {
        setTrack(currentIndex - 1);
        playTrack();
    }

    btnStart.addEventListener('click', () => {
        landingScreen.classList.remove('active');
        mainContent.classList.add('active');
        updateTrackInfo();
        playTrack();
    });

    btnReveal.addEventListener('click', () => {
        specialMessage.classList.remove('blurred');
        btnReveal.style.display = 'none';
    });

    playPauseBtn.addEventListener('click', () => {
        if (music.paused) {
            playTrack();
        } else {
            pauseTrack();
        }
    });

    btnPrev.addEventListener('click', prevTrack);
    btnNext.addEventListener('click', nextTrack);
    btnShuffle.addEventListener('click', () => {
        isShuffle = !isShuffle;
        updateButtons();
    });
    btnRepeat.addEventListener('click', () => {
        isRepeat = !isRepeat;
        updateButtons();
    });

    music.addEventListener('timeupdate', updateProgress);

    music.addEventListener('ended', () => {
        if (isRepeat) {
            playTrack();
        } else {
            nextTrack();
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
const btnShare = document.getElementById('btn-share');

if (btnShare) {
    btnShare.addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Nosso Presente Especial ❤️',
                    text: 'Olha só o que eu preparei para nós!',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Erro ao compartilhar:', err);
            }
        } else {
            // Fallback caso o navegador não suporte (copiar link)
            navigator.clipboard.writeText(window.location.href);
            alert('Link copiado para a área de transferência!');
        }
    });
}
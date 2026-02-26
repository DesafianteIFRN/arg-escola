/* esse código é responsável por um joguinho de clicar no alvo que aparece em posições aleatórias, acumulando pontos até chegar a 1000 e vencer o jogo */
/* esse codigo também não foi feito por mim, usei um codigo pronto e adaptei para o desafio que eu queria fazer, o código original pode ser encontrado aqui: https://codepen.io */



document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('start');
    const restartBtn = document.getElementById('restart');
    const target = document.getElementById('target');
    const targetArea = document.getElementById('target-area');
    const scoreEl = document.getElementById('score');
    const finalBox = document.getElementById('final');

    let score = 0;
    let running = false;
    let mover;
    let timerInterval;
    let timeLeft = 20;
    const timerEl = document.createElement('div'); // will be assigned later

    function updateScore(delta) {
        score += delta;
        scoreEl.textContent = 'Pontos: ' + score;
        if (score >= 1000) {
            finishGame();
        }
    }

    function randomPosition() {
        const pad = 10;
        const areaRect = targetArea.getBoundingClientRect();
        const x = Math.floor(Math.random() * (areaRect.width - target.offsetWidth - pad * 2)) + pad;
        const y = Math.floor(Math.random() * (areaRect.height - target.offsetHeight - pad * 2)) + pad;
        return {x, y};
    }

    function moveTarget() {
        const pos = randomPosition();
        target.style.left = pos.x + 'px';
        target.style.top = pos.y + 'px';
    }

    function spawnLoop() {
        moveTarget();
        mover = setInterval(moveTarget, 900);
    }

    target.addEventListener('click', function() {
        if (!running) return;
        // base points 50-150, then apply 0.7 multiplier
        const raw = Math.floor(Math.random() * 101) + 50; // 50-150
        const points = Math.floor(raw * 0.7);
        updateScore(points);
        target.style.transform = 'scale(0.9)';
        setTimeout(() => target.style.transform = '', 120);
        moveTarget();
    });

    startBtn.addEventListener('click', function() {
        if (running) return;
        running = true;
        startBtn.disabled = true;
        restartBtn.disabled = false;
        finalBox.classList.add('hidden');
        spawnLoop();
        startTimer();
    });

    function restartGame() {
        running = false;
        startBtn.disabled = false;
        restartBtn.disabled = true;
        clearInterval(mover);
        clearInterval(timerInterval);
        score = 0;
        timeLeft = 20;
        scoreEl.textContent = 'Pontos: 0';
        timerEl.textContent = 'Tempo: 20s';
        finalBox.classList.add('hidden');
        moveTarget();
    }

    restartBtn.addEventListener('click', restartGame);


    function finishGame() {
        running = false;
        clearInterval(mover);
        clearInterval(timerInterval);
        finalBox.classList.remove('hidden');
        finalBox.innerHTML = `
            <p>Parabéns! Você alcançou 1000 pontos.</p>
            <p>Aqui está o link final: <a id="final-link" href="https://forms.gle/m2QbQSywf5TDouo1A" target="_blank">Abrir link</a></p>
        `;
        startBtn.disabled = true;
        restartBtn.disabled = false;
    }

    // initialise timer element
    timerEl.id = 'timer';
    timerEl.textContent = 'Tempo: 20s';
    scoreEl.after(timerEl);

    // initial state
    restartBtn.disabled = true;
    moveTarget();

    function startTimer() {
        timeLeft = 20;
        timerEl.textContent = 'Tempo: ' + timeLeft + 's';
        timerInterval = setInterval(() => {
            timeLeft--;
            timerEl.textContent = 'Tempo: ' + timeLeft + 's';
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                if (score < 1000) {
                    gameOver();
                }
            }
        }, 1000);
    }

    function gameOver() {
        running = false;
        clearInterval(mover);
        finalBox.classList.remove('hidden');
        finalBox.innerHTML = `<p>Game Over! Você não chegou a 1000 pontos.</p>`;
        startBtn.disabled = false;
        restartBtn.disabled = true;
        setTimeout(restartGame, 3000);
    }

});

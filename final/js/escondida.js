/* Este script posiciona o span de forma aleatória, mas garantindo que fiquem longe do centro da tela onde o texto principal está localizado. */
/*esse script não foi feito por mim, usei um codigo pronto e adaptei para o desafio que eu queria criar, o código original pode ser encontrado aqui: https://codepen.io */

document.addEventListener('DOMContentLoaded', function() {
    const spans = document.querySelectorAll('.escondida');
    const texto = document.querySelector('.texto');
    const rect = texto ? texto.getBoundingClientRect() : {left:0, top:0, width:0, height:0};
    const centerX = rect.left + rect.width / 2 + window.scrollX;
    const centerY = rect.top + rect.height / 2 + window.scrollY;
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    spans.forEach(span => {
        span.style.position = 'absolute';
        span.style.zIndex = '9999';
        span.style.color = '#111';

        let x, y, attempts = 0;
        const minDist = Math.max(200, Math.min(vw, vh) / 3);
        while (attempts < 200) {
            x = Math.floor(Math.random() * (vw - 60));
            y = Math.floor(Math.random() * (vh - 20)) + window.scrollY;
            const dx = x - centerX;
            const dy = y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > minDist) break;
            attempts++;
        }
        span.style.left = x + 'px';
        span.style.top = y + 'px';

        span.addEventListener('click', function() {
            window.location.href = '../tempo/tempo.html';
        });
    });
});

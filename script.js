const canvas = document.getElementById('skullBox');
const ctx = canvas.getContext('2d');

// Define the canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Seleciona a imagem no HTML
const skull = document.getElementById('skullImage');

// Propriedades da imagem
const skullImage = {
    x: 100,
    y: 100,
    width: 120,
    height: 120,
    dx: 4,
    dy: 4,
    shadowColor: getRandomColor()
};

// Função para gerar cores aleatórias para a sombra
function getRandomColor() {
    return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}

// Função para desenhar a imagem e sombra no canvas
function drawLogo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.shadowColor = skullImage.shadowColor;
    ctx.shadowBlur = 40;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.drawImage(skull, skullImage.x, skullImage.y, skullImage.width, skullImage.height);
}

// Função que atualiza a animação
const fps = 60;
let lastFrameTime = 0;

function update(timestamp) {
    if (timestamp - lastFrameTime < 1000 / fps) {
        requestAnimationFrame(update);
        return;
    }
    lastFrameTime = timestamp;

    // Atualiza as posições do skull
    skullImage.x += skullImage.dx;
    skullImage.y += skullImage.dy;

    // Colisões com as bordas do canvas
    if (skullImage.x + skullImage.width >= canvas.width || skullImage.x <= 0) {
        skullImage.dx *= -1;
        skullImage.shadowColor = getRandomColor();
    }

    if (skullImage.y + skullImage.height >= canvas.height || skullImage.y <= 0) {
        skullImage.dy *= -1;
        skullImage.shadowColor = getRandomColor();
    }

    // Desenha a imagem e atualiza a animação
    drawLogo();
    requestAnimationFrame(update);
}

// Espera até que a imagem seja carregada para começar a animação
skull.onload = () => {
    // Iniciar a animação
    requestAnimationFrame(update);
};

// Redimensionar o canvas quando a janela mudar de tamanho
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

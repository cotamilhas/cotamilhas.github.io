const canvas = document.getElementById('skullBox');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const skullImage = {
    x: 100,
    y: 100,
    width: 120,
    height: 120,
    dx: 4,
    dy: 4,
    shadowColor: getRandomColor()
};

const skull = new Image();
skull.src = 'image.png';

function getRandomColor() {
    return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}

function drawLogo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.shadowColor = skullImage.shadowColor;
    ctx.shadowBlur = 40;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.drawImage(skull, skullImage.x, skullImage.y, skullImage.width, skullImage.height);
}

const fps = 60;
let lastFrameTime = 0;

function update(timestamp) {
    if (timestamp - lastFrameTime < 1000 / fps) {
        requestAnimationFrame(update);
        return;
    }
    lastFrameTime = timestamp;

    skullImage.x += skullImage.dx;
    skullImage.y += skullImage.dy;

    if (skullImage.x + skullImage.width >= canvas.width || skullImage.x <= 0) {
        skullImage.dx *= -1;
        skullImage.shadowColor = getRandomColor();
    }

    if (skullImage.y + skullImage.height >= canvas.height || skullImage.y <= 0) {
        skullImage.dy *= -1;
        skullImage.shadowColor = getRandomColor();
    }

    drawLogo();
    requestAnimationFrame(update);
}

skull.onload = () => {
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');
    offCanvas.width = skullImage.width;
    offCanvas.height = skullImage.height;
    offCtx.drawImage(skull, 0, 0, offCanvas.width, offCanvas.height);
    skull.src = offCanvas.toDataURL();

    requestAnimationFrame(update);
};

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

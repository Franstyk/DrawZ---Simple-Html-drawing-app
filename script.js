const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clearButton');
const colorPicker = document.getElementById('colorPicker');
const lineWidthInput = document.getElementById('lineWidth');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Function to start drawing
function startDrawing(x, y) {
    isDrawing = true;
    [lastX, lastY] = [x, y];
}

// Function to draw on the canvas
function draw(x, y) {
    if (!isDrawing) return;
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = lineWidthInput.value;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    [lastX, lastY] = [x, y];
}

// Function to stop drawing
function stopDrawing() {
    isDrawing = false;
    ctx.closePath();
}

// Event listeners for mouse events
canvas.addEventListener('mousedown', (e) => {
    startDrawing(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
    draw(e.offsetX, e.offsetY);
});

canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Event listeners for touch events
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent scrolling
    const touch = e.touches[0];
    startDrawing(touch.clientX - canvas.getBoundingClientRect().left, touch.clientY - canvas.getBoundingClientRect().top);
});

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Prevent scrolling
    const touch = e.touches[0];
    draw(touch.clientX - canvas.getBoundingClientRect().left, touch.clientY - canvas.getBoundingClientRect().top);
});

canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

// Clear the canvas when the button is clicked
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score-value');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
    { x: 10, y: 10 }
];
let food = { x: 5, y: 5 };
let dx = 0;
let dy = 0;
let score = 0;
let gameInterval;
let gameStarted = false;

async function updateLeaderboard() {
    const tableBody = document.getElementById('scoreTableBody');
    tableBody.innerHTML = '';
    
    try {
        const response = await fetch('/api/scores');
        const scores = await response.json();
        
        scores.forEach((score, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${score.player}</td>
                <td>${score.score}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching scores:', error);
    }
}

function startGame() {
    if (gameStarted) return;
    
    gameStarted = true;
    snake = [{ x: 10, y: 10 }];
    score = 0;
    scoreElement.textContent = score;
    dx = 0;
    dy = 0;
    placeFood();
    gameInterval = setInterval(gameLoop, 100);
}

function gameLoop() {
    if (hasGameEnded()) {
        clearInterval(gameInterval);
        gameStarted = false;
        alert('Game Over! Score: ' + score);
        return;
    }

    moveSnake();
    draw();
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        placeFood();
    } else {
        snake.pop();
    }
}

function draw() {
    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
    
    // Ensure food doesn't appear on snake
    while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    }
}

function hasGameEnded() {
    // Check wall collisions
    if (snake[0].x < 0 || snake[0].x >= tileCount || 
        snake[0].y < 0 || snake[0].y >= tileCount) {
        saveScore();
        return true;
    }

    // Check self collision
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            saveScore();
            return true;
        }
    }

    return false;
}

async function saveScore() {
    if (score > 0) {
        const playerName = prompt('Введите ваше имя:', 'Player');
        if (playerName) {
            try {
                await fetch('/api/scores', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        player: playerName,
                        score: score
                    })
                });
                updateLeaderboard();
            } catch (error) {
                console.error('Error saving score:', error);
            }
        }
    }
}

document.addEventListener('keydown', (event) => {
    if (!gameStarted) return;
    
    switch (event.key) {
        case 'ArrowUp':
            if (dy !== 1) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown':
            if (dy !== -1) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft':
            if (dx !== 1) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx !== -1) { dx = 1; dy = 0; }
            break;
    }
});

// Initial draw
draw(); 

updateLeaderboard(); 
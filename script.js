const main = document.querySelector('.main');
const levelHTMLGap = document.querySelector('#level');
const scoreHTMLGap = document.querySelector('#score');

//Настройка скорости игры
let gameSpeed = 400;
let score = 0;
let level = 1;

//Создаем матрицу поля
let playField = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

//Активная фигурка
let activeTetro = {
    x: 3,
    y: 0,
    shape: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ]
}

const figures = {
    0: [[1, 1, 1],
    [0, 1, 0],
    [0, 0, 0]],

    1: [[1, 1],
    [1, 1]],

    2: [[0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]],

    3: [[1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]],

    4: [[0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],],

    5: [[0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]],

    6: [[0, 0, 1],
    [0, 0, 1],
    [0, 1, 1]]
}

const getNewTetroShape = function () {
    let randomFigureNumber = Math.floor(Math.random() * 7);
    activeTetro.shape = figures[randomFigureNumber];
    // console.log(figures[randomFigureNumber]);
}

let mainInnerHTML = '';

const draw = function () {
    mainInnerHTML = '';
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] === 1) {
                mainInnerHTML += '<div class="cell moovingCell"></div>'
            } else if (playField[y][x] === 2) {
                mainInnerHTML += '<div class="cell fixedCell"></div>'
            }
            else {
                mainInnerHTML += '<div class="cell"></div>';
            }
        }
    }
    main.innerHTML = mainInnerHTML;
}

const fixTetro = function () {
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] === 1) {
                playField[y][x] = 2;
            }
        }
        gameSpeed = gameSpeed === 35 ? 400 - 20 * (level - 1) : gameSpeed;
    }

    checkLines();

    // Добавляем новую фигурку на поле -- вынесено в отдельную функцию

    // playField[0] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
    // playField[1] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]

    // playField[0] = [0, 0, 0, 1, 1, 0, 0, 0, 0, 0]
    // playField[1] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]


}
const rotateTetro = function () {
    const prevTetroShape = activeTetro.shape;

    activeTetro.shape = activeTetro.shape[0].map((val, index) =>
        activeTetro.shape.map((row) => row[index]).reverse()
    )
    if (hasCollisions()) {
        activeTetro.shape = prevTetroShape;
    }
}

const removePrevActiveTetro = function () {
    for (let y = playField.length - 1; y >= 0; y--) {
        for (let x = playField[y].length - 1; x >= 0; x--) {
            if (playField[y][x] === 1) {
                playField[y][x] = 0;
            }
        }
    }
}

const addActiveTetro = function () {
    removePrevActiveTetro();
    for (let y = 0; y < activeTetro.shape.length; y++) {
        for (let x = 0; x < activeTetro.shape[y].length; x++) {
            if (activeTetro.shape[y][x]) {
                playField[activeTetro.y + y][activeTetro.x + x] = activeTetro.shape[y][x]
            }
        }
    }
}

const hasCollisions = function () {
    for (let y = 0; y < activeTetro.shape.length; y++) {
        for (let x = 0; x < activeTetro.shape[y].length; x++) {
            if (activeTetro.shape[y][x] &&
                (playField[activeTetro.y + y] === undefined ||
                    playField[activeTetro.y + y][activeTetro.x + x] === undefined ||
                    playField[activeTetro.y + y][activeTetro.x + x] === 2)) {
                return true;
            }
        }
    }
    return false;
}


const moveTetroInTime = function () {
    moveTetroDown();
    addActiveTetro();
    draw();
    setTimeout(moveTetroInTime, gameSpeed);
}

addActiveTetro();
draw();
setTimeout(moveTetroInTime, gameSpeed);

const moveTetroDown = function () {
    activeTetro.y += 1;
    if (hasCollisions()) {
        activeTetro.y -= 1;
        fixTetro();
        getNewTetroShape();
        activeTetro.y = 0;
        activeTetro.x = 3;
    }
}
//Движение фигурки по полю
window.addEventListener(
    "keydown",
    (event) => {
        switch (event.code) {
            case 'ArrowLeft':
                //Фигурка двигается ВЛЕВО
                // moveTetroLeft();
                activeTetro.x -= 1;
                if (hasCollisions()) {
                    activeTetro.x += 1;
                }
                break;
            case 'ArrowRight':
                //Фигурка двигается ВПРАВО
                // moveTetroRight();
                activeTetro.x += 1;
                if (hasCollisions()) {
                    activeTetro.x -= 1;
                }
                break;
            case 'ArrowDown':
                //Двигаем фигурку ВНИЗ быстрее
                gameSpeed = 35;
                // moveTetroDown();
                break;
            case 'ArrowUp':
                rotateTetro();
            default:
                break;
        }
        addActiveTetro();
        draw();
    },
)

// Проверка, заполнен ли ряд
const checkLines = function () {
    let canRemoveLine = true,
        filledLines = 0;
    for (let y = playField.length - 1; y >= 0; y--) {
        for (let x = playField[y].length - 1; x >= 0; x--) {
            if (playField[y][x] == 2) {
                canRemoveLine = true;
            }
            else {
                canRemoveLine = false;
                break;
            }
        }
        if (canRemoveLine) {
            playField.splice(y, 1);
            playField = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                ...playField
            ];
            y++;
            filledLines++;
        }
    }
    score += filledLines > 0 ? (10 * level * (filledLines + ((filledLines % 5) - 1) * 4)) : 0;
    scoreHTMLGap.innerHTML = score;
    if (score / (500 * level) > level) {
        level++;
        gameSpeed -= 20;
        levelHTMLGap.innerHTML = level;
    }
}

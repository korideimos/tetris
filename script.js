//КОНСТАНТЫ

//Константы доступа
const main = document.querySelector('.main');
const levelHTMLGap = document.querySelector('#level');
const scoreHTMLGap = document.querySelector('#score');
const nextTetroHTMLGap = document.querySelector('#next-tetro')

//Переменные игры
let gameSpeed = 400;
let score = 0;
let level = 1;

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


let activeTetro = {
    x: 4,
    y: 0,
    shape: [],
    nextShape: []
}

//ФУНКЦИИ

//Для отображения -- поле
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

//Для отображения -- новая форма фигуры
const getNewTetroShape = function () {
    let randomFigureNumber = Math.floor(Math.random() * 7);
    activeTetro.shape = activeTetro.nextShape;
    activeTetro.nextShape = figures[randomFigureNumber];
}


//Для отображения -- фиксированная фигура
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
}

//Для отображения -- удаление предыдущего положения активной фигуры
const removePrevActiveTetro = function () {
    for (let y = playField.length - 1; y >= 0; y--) {
        for (let x = playField[y].length - 1; x >= 0; x--) {
            if (playField[y][x] === 1) {
                playField[y][x] = 0;
            }
        }
    }
}

//Для отображения -- активная фигура
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

//Для отображения -- следующая фигура

let nextTetroInnerHTML = '';

const drawNextTetro = function () {
    nextTetroInnerHTML = ''
    for (let y = 0; y < activeTetro.nextShape.length; y++) {
        for (let x = 0; x < activeTetro.nextShape[y].length; x++) {
            if (activeTetro.nextShape[y][x]) {
                nextTetroInnerHTML += '<div class="cell moovingCell"></div>';
            } else {
                nextTetroInnerHTML += '<div class="cell"></div>';
            }
        }
        nextTetroInnerHTML += '<br></br>';
    }
    nextTetroHTMLGap.innerHTML = nextTetroInnerHTML;
}

//Для действий -- поворот
const rotateTetro = function () {
    const prevTetroShape = activeTetro.shape;


    //Первый map -- берем индекс элементов, которые нужно поместить в строчку под номером index
    //Второй map -- берем значение из каждой строчки под номером index
    //Из n столбцов берем i'тое значение и из них формируеи i'тую строку

    //Для корректнорого поворота фигуры нужно каждую строку отзеркалить
    activeTetro.shape = activeTetro.shape[0].map((val, index) =>
        activeTetro.shape.map((row) => row[index]).reverse()
    )
    if (hasCollisions()) {
        activeTetro.shape = prevTetroShape;
    }
}

//Для действий -- продвижение вниз
const moveTetroDown = function () {
    activeTetro.y += 1;
    if (hasCollisions()) {
        activeTetro.y -= 1;
        fixTetro();
        getNewTetroShape();
        drawNextTetro();
        activeTetro.y = 0;
        activeTetro.x = 3;
    }
}

//Для действий -- продвижение вниз по времени
const moveTetroInTime = function () {
    moveTetroDown();
    addActiveTetro();
    draw();
    setTimeout(moveTetroInTime, gameSpeed);
}

//Для действий -- передвижение фигурки при помощи клавиатуры
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



//Проверка -- для выявления ошибок
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

//Проверка --  заполнен ли ряд
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


//Основная -- запуск игры
const startNewGame = function () {
    getNewTetroShape();
    getNewTetroShape();
    addActiveTetro();
    draw();
    drawNextTetro();
    setTimeout(moveTetroInTime, gameSpeed);
    gameSpeed = 400;
    score = 0;
    level = 1;
}

//Основная -- запуск игры
const gameOver = function () {

}


startNewGame();
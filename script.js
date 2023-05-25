const main = document.querySelector('.main');

//Настройка скорости игры
let gameSpeed = 400;

//Создаем матрицу поля
let playField = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
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

const canTetroMoveDown = function () {
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] === 1) {
                if ((y === playField.length - 1) || (playField[y + 1][x] === 2)) {
                    return false;
                }
            }
        }
    }
    return true;
}

const fixTetro = function () {
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] === 1) {
                playField[y][x] = 2;
            }
        }
    }
    gameSpeed = 400;

    checkLines();

    // Добавляем новую фигурку на поле
    playField[0] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
    playField[1] = [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]


}

const moveTetroDown = function () {
    if (canTetroMoveDown()) {
        for (let y = playField.length - 1; y >= 0; y--) {
            for (let x = playField[y].length - 1; x >= 0; x--) {
                if (playField[y][x] === 1) {
                    playField[y + 1][x] = 1;
                    playField[y][x] = 0;
                }
            }
        }
    }
    else { fixTetro() }
}


draw();


const moveTetroInTime = function () {
    moveTetroDown()
    draw();
    setTimeout(moveTetroInTime, gameSpeed);
}

setTimeout(moveTetroInTime, gameSpeed);


//Движение фигурки по полю
window.addEventListener(
    "keydown",
    (event) => {
        switch (event.code) {
            case 'ArrowLeft':
                //Фигурка двигается ВЛЕВО
                moveTetroLeft();
                break;
            case 'ArrowRight':
                //Фигурка двигается ВПРАВО
                moveTetroRight();
                break;
            case 'ArrowDown':
                //Двигаем фигурку ВНИЗ быстрее
                gameSpeed = 40;
                moveTetroDown();
                break;
            default:
                break;
        }
        draw();
    },
)
//Возможно ли движение ВЛЕВО
const canTetroMoveLeft = function () {
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] === 1) {
                if ((playField[y][x - 1] === 2) || (x === 0)) {
                    return false;
                }
            }
        }
    }
    return true;
}

//Фигурка двигается ВЛЕВО
const moveTetroLeft = function () {
    console.log(canTetroMoveLeft());
    if (canTetroMoveLeft()) {
        for (let y = 0; y < playField.length; y++) {
            for (let x = 0; x < playField[y].length; x++) {
                if (playField[y][x] === 1) {
                    playField[y][x - 1] = 1;
                    playField[y][x] = 0;
                }
            }
        }
    }
}

//Возможно ли движение ВПРАВО
const canTetroMoveRight = function () {
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] === 1) {
                if ((playField[y][x + 1] === 2) || (x === playField[0].length - 1)) {
                    return false;
                }
            }
        }
    }
    return true;
}

//Фигурка двигается ВПРАВО
const moveTetroRight = function () {
    console.log(canTetroMoveRight());
    if (canTetroMoveRight()) {
        for (let y = 0; y < playField.length; y++) {
            for (let x = playField[y].length - 1; x >= 0; x--) {
                if (playField[y][x] === 1) {
                    playField[y][x + 1] = 1;
                    playField[y][x] = 0;
                }
            }
        }
    }
}


// Проверка, заполнен ли ряд
const checkLines = function () {
    let canRemoveLine = true;
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
        }
    }
}

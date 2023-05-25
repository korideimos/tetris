const main = document.querySelector('.main');

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
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let mainInnerHTML = '';
let gameSpeed = 400;

const draw = function () {
    mainInnerHTML = '';
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] === 1) {
                mainInnerHTML += '<div class="cell moovingCell"></div>'
            }
            else {
                mainInnerHTML += '<div class="cell"></div>';
            }
        }
    }
    // }console.log(mainInnerHTML);
    main.innerHTML = mainInnerHTML;
}

const canTetroMoveDown = function () {
    for (let y = 0; y < playField.length; y++) {
        for (let x = 0; x < playField[y].length; x++) {
            if (playField[y][x] === 1) {
                if (y === playField.length - 1) {
                    return false;
                }
            }
        }
    }
    return true;
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
}


draw();


const moveTetroInTime = function () {
    moveTetroDown()
    draw();
    setTimeout(moveTetroInTime, gameSpeed);
}

setTimeout(moveTetroInTime, gameSpeed);
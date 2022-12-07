"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var gameStarted = false;
const btnStart = document.getElementById('start');
const colors = [
    document.getElementById('color-0'),
    document.getElementById('color-1'),
    document.getElementById('color-2'),
    document.getElementById('color-3'),
    document.getElementById('start')
];
const sounds = [
    new Audio('./assets/sounds/sound0.wav'),
    new Audio('./assets/sounds/sound1.wav'),
    new Audio('./assets/sounds/sound2.wav'),
    new Audio('./assets/sounds/sound3.wav'),
    new Audio('./assets/sounds/error.mp3')
];
const score = document.getElementById('genius_score');
const error = document.getElementById('modal-error');
let positions = [], mPositions = [];
const configs = () => __awaiter(void 0, void 0, void 0, function* () {
    colors.map((color, idx) => {
        color === null || color === void 0 ? void 0 : color.addEventListener('click', event => setPosition(event));
    });
});
const setPosition = (event) => __awaiter(void 0, void 0, void 0, function* () {
    let position = event.currentTarget.getAttribute('source');
    sounds[position].play();
    mPositions.push(parseInt(position));
    let currentPosition = mPositions.length - 1;
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        if (positions[currentPosition] !== mPositions[currentPosition]) {
            sounds[4].play();
            //COLOCAR O MODAL
        }
        else {
            if (currentPosition === position.length - 1) {
                setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                    if (score) {
                        score.innerText = position.length;
                    }
                    yield loadPosition();
                }), 500);
            }
        }
    }), 1000);
});
const iluminatePosition = () => __awaiter(void 0, void 0, void 0, function* () {
    let i = 0;
    let interval = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let item = positions[i];
        yield sounds[item].play();
        yield ((_a = colors[item]) === null || _a === void 0 ? void 0 : _a.classList.add(`genius_item-${item}_active`));
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            yield ((_b = colors[item]) === null || _b === void 0 ? void 0 : _b.classList.remove(`genius_item${item}_active`));
        }), 700);
        i++;
        if (i === positions.length) {
            clearInterval(interval);
        }
    }), 2000);
});
const defineHeight = () => {
    const elements = document.querySelectorAll('.genius_item, genius_restart');
    elements.forEach((element) => {
        element.style.height = `${element.offsetWidth}px`;
        if (element.id === 'start') {
            element.style.marginTop = `-${element.offsetWidth / 2}px`;
            element.style.marginLeft = `-${element.offsetWidth / 2}px`;
        }
    });
};
window.addEventListener('resize', () => {
    defineHeight();
});
defineHeight();
const startGame = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!gameStarted) {
        gameStarted = true;
        if (btnStart) {
            btnStart.disabled = true;
            btnStart.innerText = 'Game started!!!';
            loadPosition();
        }
    }
});
const loadPosition = () => __awaiter(void 0, void 0, void 0, function* () {
    let aleatory = 0;
    if (positions.length >= 4) {
        aleatory = Math.floor(Math.random() * 4);
    }
    else {
        if (positions.length > 0) {
            aleatory = positions[positions.length - 1] + 1;
        }
    }
    positions.push(aleatory);
    yield iluminatePosition();
    mPositions = [];
});
const restart = () => {
    gameStarted = false;
    if (btnStart) {
        btnStart.disabled = false;
        btnStart.innerText = 'Start Genius!!!';
    }
};
const lost = (bootstrap, element) => {
    const modal = new bootstrap.Modal(element, {});
    modal.show();
};
window.addEventListener('load', () => {
    configs();
});

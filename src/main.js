/*
Group Member:
    Larry Li
    Yufeng Xie
    Jiaying Hou

Gmae Title:
    Loafing Time
*/

let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                y: 230
            }
        }
    },
    scene: [Load,Game,Scene2, Menu, Menu2, Play,Scene1, Credits, Instru, GameOver, Victory, Pause]
};

let game = new Phaser.Game(config);

//reserve keyboard variables
let keySPACE, keyUP, keyDOWN, keyF, keyR, keyQ, keyA, keyD, keyS, keyW, keyM;
let input;
//define Game Settings
// game.settings = {
//     initialLevel: 0,
//     initialSpeed: 1,
// }

// define globals
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let reason;
let time;
let gameScore;
let sanity;
let gameStatus;
let completeness;
let playGame;
let watch;
let indoor;
let currentScene;
let randomNum;
let performance1;
let performance2;
let performance3;
let played1 = false;
let played2 = false;
let played3 = false;
let newGame = true;

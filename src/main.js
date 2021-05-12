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
    scene: [Load, Menu, Play, Credits, Instru]
};

let game = new Phaser.Game(config);

//reserve keyboard variables
let keySPACE, keyUP, keyDOWN, keyF, keyR, keyQ, keyA, keyD, keyS, keyW;

//define Game Settings
// game.settings = {
//     initialLevel: 0,
//     initialSpeed: 1,
// }

// define globals
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        //load imgs
        this.load.path = './assets/img/';
        // this.load.image([
        //     // { key: 'ground' },
        // ]);

        // this.load.spritesheet('anims_fox', 'anims_fox.png', {
        //     frameWidth: 112.5,
        //     frameHeight: 49,
        //     starFrame: 0,
        //     endFrame: 3
        // });

        //load sounds
        this.load.path = './assets/audio/';
        // this.load.audio('jump_music', 'jump.mp3');
    }


    create() {
        if (window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('menuScene');
    }
}
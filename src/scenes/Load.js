class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBar.x = 240;
        progressBox.x = 240;
        progressBar.y = 80;
        progressBox.y = 80;
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 270, 320, 50);

        var width = game.config.width;
        var height = game.config.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        this.load.on('progress', function (value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(250, 280, 300 * value, 30);
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });
        //load imgs
        this.load.path = './assets/image/';
        this.load.image('WorkArea', 'WorkArea.png');
        this.load.image([
            { key: 'game-screen' },
            { key: 'work-screen' },
            { key: 'watching-colleague' },
            { key: 'angry-colleague' }

        ]);

        // this.load.spritesheet('anims_fox', 'anims_fox.png', {
        //     frameWidth: 112.5,
        //     frameHeight: 49,
        //     starFrame: 0,
        //     endFrame: 3
        // });

        //load sounds
        this.load.path = './assets/audio/';
        this.load.audio('select_music', 'select.mp3');
        this.load.audio('whatrudoing', 'whatrudoing.mp3');
        this.load.audio('wuuut', 'wuuut.mp3');
        this.load.audio('bgm', 'jiaying330 - slug.mp3');
        this.load.audio('workBgm', 'workBgm.mp3');
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
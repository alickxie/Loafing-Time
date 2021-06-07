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
        this.load.image('glass-panel', 'glassPanel.png');
        this.load.image('hand', 'hand.png');
        this.load.image([
            { key: 'classroom' },
            { key: 'teacher' },
            { key: 'arm' },
            { key: 'desk1' },
            { key: 'desk2' },
            { key: 'teacher1' },
            { key: 'trashCan-Base' },
            { key: 'trashCan-Left' },
            { key: 'trashCan-Right' },
            { key: 'trashBall' },
            { key: 'noeating' },
            { key: 'scene2(version2)' },
            { key: 'teacher-opMouse' },
            { key: 'girl' },
            { key: 'girl_angry' },
            { key: 'trashCan' },
            { key: 'kid' },
            { key: 'square' }
        ]);
        this.load.image([
            { key: 'eating' },
            { key: 'noeating' },
            {key: 'teacher2_angry' },
            {key: 'teacher2_speaking' },
            {key: 'teacher2_speaking2'}
        ]);
        
        this.load.path = './assets/image/office/';
        this.load.image('WorkArea', 'office.png');
        this.load.image([
            { key: 'game-screen' },
            { key: 'work-screen' },
            { key: 'boss_front_peak' },
            { key: 'boss_back' },
            { key: 'boss_angry' },
            { key: 'boss_front' },
            { key: 'windowBackground' },
            { key: 'door1' },
            { key: 'collegeback' },
            { key: 'college_peak' },
            { key: 'college_angry' },
            { key: 'manager' },
            { key: 'manager_angry' },
            { key: 'roadBackground' }
        ]);
        this.load.spritesheet('door_open', 'door_anims.png', {
            frameWidth: 192,
            frameHeight: 520,
            starFrame: 0,
            endFrame: 3
        });
        this.load.spritesheet('door_close', 'door_anims.png', {
            frameWidth: 192,
            frameHeight: 520,
            starFrame: 0,
            endFrame: 3
        });

         // Load Buttons Images
         this.load.path = './assets/image/Buttons/';
         this.load.image([
             { key: 'playButton' },
             { key: 'playButton(Pressed)' },
             { key: 'creditsButton' },
             { key: 'creditsButton(Pressed)' },
             { key: 'highschoolButton' },
             { key: 'highschoolButton(Pressed)' },
             { key: 'kindergartenButton' },
             { key: 'kindergartenButton(Pressed)' },
             { key: 'menuButton' },
             { key: 'menuButton(Pressed)' },
             { key: 'nextButton' },
             { key: 'nextButton(Pressed)' },
             { key: 'officeButton' },
             { key: 'officeButton(Pressed)' },
             { key: 'pauseButton' },
             { key: 'pauseButton(Pressed)' },
             { key: 'retryButton' },
             { key: 'retryButton(Pressed)' },
             { key: 'spaceButton' }
         ]);

        //load sounds
        this.load.path = './assets/audio/';
        this.load.audio('select_music', 'select.mp3');
        this.load.audio('whatrudoing', 'whatrudoing.mp3');
        this.load.audio('wuuut', 'wuuut.mp3');
        this.load.audio('bgm', 'jiaying330 - slug.mp3');
        this.load.audio('workBgm', 'workBgm.mp3');
        this.load.audio('throw', 'throw.mp3');
        this.load.audio('Kindergarten', 'Kindergarten.mp3');
        this.load.audio('High_school', 'High_school.mp3');
        this.load.audio('teacher', 'teacher.mp3');
        this.load.audio('teacher2', 'teacher2.mp3');
        this.load.audio('girl', 'girl.mp3');
        this.load.audio('goal1', 'goal1.mp3');
        this.load.audio('goal2', 'goal2.mp3');
        this.load.audio('good', 'good.mp3');
        this.load.audio('great', 'great.mp3');
        this.load.audio('miss', 'miss.mp3');
        this.load.audio('a', 'a.mp3');
        this.load.audio('b', 'b.mp3');
        this.load.audio('c', 'c.mp3');
        this.load.audio('d', 'd.mp3');
        this.load.audio('i', 'i.mp3');
        this.load.audio('l', 'l.mp3');
        this.load.audio('o', 'o.mp3');
        this.load.audio('u', 'u.mp3');
        this.load.audio('zh', 'zh.mp3');
        this.load.audio('chips1', 'chips1.mp3');
        this.load.audio('chips2', 'chips2.mp3');
        this.load.audio('chips3', 'chips3.mp3');
        this.load.audio('victory1', 'victory1.mp3');
        this.load.audio('victory2', 'victory2.mp3');
        this.load.audio('victory3', 'victory3.mp3');

        // this.load.audio('hit1', 'hit1.mp3');
        // this.load.audio('hit', 'hit.mp3');
        // this.load.audio([
        //     {key : 'a',},
        //     {key : 'b'},
        //     {key : 'c'},
        //     {key : 'd'},
        //     {key : 'girl'},
        //     {key : 'goal1'},
        //     {key : 'goal2'},
        //     {key : 'good'},
        //     {key : 'great'},
        //     {key : 'hit1'},
        //     {key : 'LetsGo'},
        //     {key : 'miss'},
        //     {key : 'teacher'},
        //     {key : 'teacher2'},
        //     {key : 'throw'}
        // ])
    }


    create() {
        if (window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }
        
        // go to Title scene
        // played1 = true;
        // played2 = true;
        // played3 = true;
        // this.scene.start("instruScene"); 
        this.scene.start('menuScene');   
        // this.scene.start("playScene");   
    }
}
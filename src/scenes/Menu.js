class Menu extends Phaser.Scene {

    constructor() {
        super("menuScene");

    }

    create() {
        //UI
        this.add.image(0, 0, 'GameBg').setOrigin(0, 0);
        this.bgm2 = this.sound.add('High_school', { mute: false, volume: 0.35, rate: 1.0, loop: true });
        this.bgm2.play();
        this.events.on('pause', () => { this.bgm2.stop() });
        this.events.on('shutdown', () => { this.bgm2.stop() });
        this.events.on('resume', () => { this.bgm2.play() });
        
        //The Play Button
        this.input.setDefaultCursor('url(/assets/image/hand.png), pointer');
        const { width, height } = this.scale
        const playButton = this.add.image(width * 0.5, height * 0.75, 'playButton')
            .setDisplaySize(170, 90).setInteractive()
            .on('pointerover', () => { playButton.alpha = 0.7 })
            .on('pointerout', () => { playButton.alpha = 1.0 })
            .on('pointerup', () => {
                playButton.setTexture('playButton(Pressed)');
                this.sound.play("select_music", { volume: 2.0 });

                this.clock = this.time.delayedCall(250, () => {
                    if (played1 * played2 * played3 == true) {
                        this.scene.start("menuScene2");
                    }
                    this.scene.start("instruScene");
                }, null, this);
            });

        // Credits button
        const creditsButton = this.add.image(640, 610, 'creditsButton')
            .setDisplaySize(128, 40).setInteractive()
            .on('pointerover', () => { creditsButton.alpha = 0.7 })
            .on('pointerout', () => { creditsButton.alpha = 1.0 })
            .on('pointerup', () => {
                creditsButton.setTexture('creditsButton(Pressed)');
                this.sound.play("select_music", { volume: 2.0 });

                this.clock = this.time.delayedCall(250, () => {
                    this.scene.start("creditScene");
                }, null, this);
            });


    }

    update() {
    }
}

class Menu2 extends Phaser.Scene {

    constructor() {
        super("menuScene2");
    }

    create() {
        this.add.image(0, 0, 'GameBg').setOrigin(0, 0);
        this.bgm2 = this.sound.add('High_school', { mute: false, volume: 0.35, rate: 1.0, loop: true });
        this.bgm2.play();
        this.events.on('pause', () => { this.bgm2.stop() });
        this.events.on('shutdown', () => { this.bgm2.stop() });
        this.events.on('resume', () => { this.bgm2.play() });
        

        //menu text UI
        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;

        // Adding the Title text
        // this.add.text(centerX, centerY - 100, 'Loafing Time', menuConfig).setOrigin(0.5);

        //place cursor
        this.input.setDefaultCursor('url(/assets/image/hand.png), pointer');
        // play Kindergarten Level button
        const kingarButton = this.add.image(centerX, centerY + 50, 'kindergartenButton')
            .setDisplaySize(128, 44).setInteractive()
            .on('pointerover', () => { kingarButton.alpha = 0.8 })
            .on('pointerout', () => { kingarButton.alpha = 1.0 })
            .on('pointerup', () => {
                kingarButton.setTexture('kindergartenButton(Pressed)');
                this.sound.play("select_music", { volume: 2.0 });

                this.clock = this.time.delayedCall(250, () => {
                    this.scene.start("playScene1");
                }, null, this);
            });

        // play Highschool Level button
        const highButton = this.add.image(centerX, centerY + 110, 'highschoolButton')
            .setDisplaySize(128, 44).setInteractive()
            .on('pointerover', () => { highButton.alpha = 0.8 })
            .on('pointerout', () => { highButton.alpha = 1.0 })
            .on('pointerup', () => {
                highButton.setTexture('highschoolButton(Pressed)');
                this.sound.play("select_music", { volume: 2.0 });

                this.clock = this.time.delayedCall(250, () => {
                    this.scene.start("playScene2");
                }, null, this);
            });

        // play Office Level button
        const officeButton = this.add.image(centerX, centerY + 170, 'officeButton')
            .setDisplaySize(128, 44).setInteractive()
            .on('pointerover', () => { officeButton.alpha = 0.8 })
            .on('pointerout', () => { officeButton.alpha = 1.0 })
            .on('pointerup', () => {
                officeButton.setTexture('officeButton(Pressed)');
                this.sound.play("select_music", { volume: 2.0 });

                this.clock = this.time.delayedCall(250, () => {
                    this.scene.start("playScene3");
                }, null, this);
            });
    }

    update() {
    }
}

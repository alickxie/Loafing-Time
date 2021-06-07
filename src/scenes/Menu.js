class Menu extends Phaser.Scene {

    constructor() {
        super("menuScene");

    }

    create() {
        //UI
        let menuConfig = {
            fontFamily: 'Minecraftia',
            fontSize: '130px',
            color: '#FFFF00',
            stroke: '#99BF0D',
            strokeThickness: 5,
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //menu text UI
        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;

        // Adding the Title text
        this.add.text(centerX, centerY - 100, 'Loafing Time', menuConfig).setOrigin(0.5);

        //The Play Button
        this.input.setDefaultCursor('url(/assets/image/hand.png), pointer');
        const { width, height } = this.scale
        const playButton = this.add.image(width * 0.5, height * 0.65, 'playButton')
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

        // Get the keyboard
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    }

    update() {
    }
}

class Menu2 extends Phaser.Scene {

    constructor() {
        super("menuScene2");
    }

    create() {
        //UI
        let menuConfig = {
            fontFamily: 'Pangolin',
            fontSize: '130px',
            color: '#FFFF00',
            stroke: '#99BF0D',
            strokeThickness: 5,
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //menu text UI
        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;

        // Adding the Title text
        this.add.text(centerX, centerY - 100, 'Loafing Time', menuConfig).setOrigin(0.5);

        //place background
        this.input.setDefaultCursor('url(/assets/image/hand.png), pointer');
        const { width, height } = this.scale
        const playButton = this.add.image(width * 0.5, height * 0.6, 'glass-panel')
            .setDisplaySize(150, 50).setInteractive()
            .on('pointerover', () => { playButton.alpha = 0.5 })
            .on('pointerout', () => { playButton.alpha = 1.0 })
            .on('pointerup', () => {
                this.sound.play("select_music", { volume: 2.0 });
                this.scene.start("playScene1");
            });

        this.add.text(playButton.x, playButton.y, 'Kindergarten')
            .setOrigin(0.5)

        // Settings button
        const settingsButton = this.add.image(playButton.x, playButton.y + playButton.displayHeight + 10, 'glass-panel')
            .setDisplaySize(150, 50).setInteractive()
            .on('pointerover', () => { settingsButton.alpha = 0.5 })
            .on('pointerout', () => { settingsButton.alpha = 1.0 })
            .on('pointerup', () => {
                this.sound.play("select_music", { volume: 2.0 });
                this.scene.start("playScene2");
            });

        this.add.text(settingsButton.x, settingsButton.y, 'High School')
            .setOrigin(0.5)

        // Credits button
        const creditsButton = this.add.image(settingsButton.x, settingsButton.y + settingsButton.displayHeight + 10, 'glass-panel')
            .setDisplaySize(150, 50).setInteractive()
            .on('pointerover', () => { creditsButton.alpha = 0.5 })
            .on('pointerout', () => { creditsButton.alpha = 1.0 })
            .on('pointerup', () => {
                this.sound.play("select_music", { volume: 2.0 });
                this.scene.start("playScene");
            });

        this.add.text(creditsButton.x, creditsButton.y, 'Office')
            .setOrigin(0.5)

        // Get the key
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    update() {

    }
}

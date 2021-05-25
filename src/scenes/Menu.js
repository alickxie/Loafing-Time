class Menu extends Phaser.Scene {

    constructor() {
        super("menuScene");

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
        let canvas = this.sys.canvas;
        canvas.style.cursor = 'none';
        let CSSString = 'cursor-hand'
        this.input.cursor = CSSString;
        this.cursor = this.add.sprite(this.input.x, this.input.y, 'cursor-hand').setOrigin(0.5);
        // Play button
        const { width, height } = this.scale
        const playButton = this.add.image(width * 0.5, height * 0.6, 'glass-panel')
            .setDisplaySize(150, 50).setInteractive()
            .on('pointerover', () => { playButton.alpha = 0.5 })
            .on('pointerout', () => { playButton.alpha = 1.0 })
            .on('pointerup', () => {
                this.sound.play("select_music", { volume: 2.0 });
                this.scene.start("playScene");
            });

        this.add.text(playButton.x, playButton.y, 'Play')
            .setOrigin(0.5)

        // Settings button
        const settingsButton = this.add.image(playButton.x, playButton.y + playButton.displayHeight + 10, 'glass-panel')
            .setDisplaySize(150, 50).setInteractive()
            .on('pointerover', () => { settingsButton.alpha = 0.5 })
            .on('pointerout', () => { settingsButton.alpha = 1.0 })
            .on('pointerup', () => {
                this.sound.play("select_music", { volume: 2.0 });
                this.scene.start("instruScene");
            });

        this.add.text(settingsButton.x, settingsButton.y, 'instruction')
            .setOrigin(0.5)

        // Credits button
        const creditsButton = this.add.image(settingsButton.x, settingsButton.y + settingsButton.displayHeight + 10, 'glass-panel')
            .setDisplaySize(150, 50).setInteractive()
            .on('pointerover', () => { creditsButton.alpha = 0.5 })
            .on('pointerout', () => { creditsButton.alpha = 1.0 })
            .on('pointerup', () => {
                this.sound.play("select_music", { volume: 2.0 });
                this.scene.start("creditScene");
            });

        this.add.text(creditsButton.x, creditsButton.y, 'Credits')
            .setOrigin(0.5)

        // Get the key
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    update() {
        //scroll the background
        // this.background.tilePositionX += 1;
        this.cursor.x = this.input.x;
        this.cursor.y = this.input.y;
    }
}

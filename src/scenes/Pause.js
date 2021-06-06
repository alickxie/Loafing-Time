class Pause extends Phaser.Scene {
    constructor() {
        super("Pause");
    }

    create() {
        let creditConfig = {
            color: '#CD00CD',
            fontFamily: 'Pangolin',
            fontSize: '22px',
            stroke: '#FFFFFF',
            strokeThickness: 3,
            align: 'left',
            fixedWidth: 0,
        }

        // this.add.text(centerX, centerY, '[ Game Paused]', creditConfig).setOrigin(0.5);

        const pauseButton = this.add.image(centerX, centerY, 'glass-panel')
            .setDisplaySize(150, 50).setInteractive()
            .on('pointerover', () => { pauseButton.alpha = 0.5 })
            .on('pointerout', () => { pauseButton.alpha = 1.0 })
            .on('pointerup', () => {
                this.sound.play("select_music", { volume: 2.0 });
                this.scene.resume(currentScene);
                this.scene.stop();
            });

        this.add.text(pauseButton.x, pauseButton.y, 'Continue')
            .setOrigin(0.5).setColor('#ff');

        this.add.text(centerX, 420, '[ Press (M) to Menu]', creditConfig).setOrigin(0.5);
        this.add.text(centerX, 380, '[ Press (R) for Retry]', creditConfig).setOrigin(0.5);

        creditConfig = {
            color: '#CD00CD',
            fontFamily: 'Pangolin',
            fontSize: '50px',
            stroke: '#FFFFFF',
            strokeThickness: 3,
            align: 'left',
            fixedWidth: 0,
        }
        this.add.text(centerX, 300, '[ Game Paused ]', creditConfig).setOrigin(0.5);

        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.sound.play("select_music", { volume: 2.0 });
            this.scene.start("menuScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.play("select_music", { volume: 2.0 });
            this.scene.start(currentScene);
        }
    }
}
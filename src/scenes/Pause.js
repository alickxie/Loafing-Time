class Pause extends Phaser.Scene {
    constructor() {
        super("Pause");
    }

    create() {
        // Add continueButton
        const continueButton = this.add.image(centerX, centerY+30, 'continueButton')
            .setDisplaySize(150, 50).setInteractive()
            .on('pointerover', () => { continueButton.alpha = 0.7 })
            .on('pointerout', () => { continueButton.alpha = 1.0 })
            .on('pointerup', () => {
                this.sound.play("select_music", { volume: 2.0 });
                continueButton.setTexture('continueButton(Pressed)');
                this.clock = this.time.delayedCall(250, () => {
                    this.scene.resume(currentScene);
                    this.scene.stop();
                }, null, this);
            });
        
        // Add retryButton
        const retryButton = this.add.image(centerX, centerY + 100, 'retryButton')
            .setDisplaySize(150, 50).setInteractive()
            .on('pointerover', () => { retryButton.alpha = 0.7 })
            .on('pointerout', () => { retryButton.alpha = 1.0 })
            .on('pointerup', () => {
                retryButton.setTexture('retryButton(Pressed)');
                this.sound.play("select_music", { volume: 2.0 });

                this.clock = this.time.delayedCall(250, () => {
                    this.scene.start(currentScene);
                }, null, this);
            });

        // The font type    
        let creditConfig = {
            color: '#7f1bcc',
            fontFamily: 'Minecraftia',
            fontSize: '50px',
            stroke: '#000000',
            strokeThickness: 5,
            align: 'left',
            fixedWidth: 0,
        }
        this.add.text(centerX, 300, '[ Game  Paused ]', creditConfig).setOrigin(0.5);
    }

    update() {
    }
}
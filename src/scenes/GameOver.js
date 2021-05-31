class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    create() {
        Scene1.score = 0;
        Scene1.t = 0;
        Scene1.fire = false;
        Scene1.warn = 0;
        Scene1.temper = 0;
        watch = false;
        // reason = 'No Reason';
        sanity = 100;
        time = 0;

        let creditConfig = {
            color: '#CD00CD',
            fontFamily: 'Pangolin',
            fontSize: '22px',
            stroke: '#FFFFFF',
            strokeThickness: 3,
            align: 'left',
            fixedWidth: 0,
        }
        let i = this.add.text(centerX, 550, '[   Menu   ]', creditConfig)
            .setOrigin(0.5)

        const menuButton = this.add.image(centerX, 550, 'glass-panel')
            .setDisplaySize(200, 30).setInteractive()
            .on('pointerover', () => { menuButton.alpha = 0.5; i.alpha = 0.7 })
            .on('pointerout', () => { menuButton.alpha = 1.0; i.alpha = 1.0 })
            .on('pointerup', () => {
                this.sound.play("select_music", { volume: 2.0 });
                this.scene.start("menuScene");
            });


        let ii = this.add.text(centerX, 600, '[   Retry   ]', creditConfig)
            .setOrigin(0.5)

        const retryButton = this.add.image(centerX, 600, 'glass-panel')
            .setDisplaySize(200, 30).setInteractive()
            .on('pointerover', () => { retryButton.alpha = 0.5; ii.alpha = 0.7 })
            .on('pointerout', () => { retryButton.alpha = 1.0; ii.alpha = 1.0  })
            .on('pointerup', () => {
                this.sound.play("select_music", { volume: 2.0 });
                this.scene.start(currentScene);
            });



        creditConfig = {
            color: '#CD00CD',
            fontFamily: 'Pangolin',
            fontSize: '50px',
            stroke: '#FFFFFF',
            strokeThickness: 3,
            align: 'left',
            fixedWidth: 0,
        }
        this.add.text(centerX, 300, '[ Game Over ]', creditConfig).setOrigin(0.5);
        this.add.text(centerX, 250, reason, creditConfig).setOrigin(0.5);

    }

    update() {

    }
}
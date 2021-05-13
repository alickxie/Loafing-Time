class Victory extends Phaser.Scene {
    constructor() {
        super("Victory");
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

        this.add.text(centerX, 420, '[ Press (Space) to the Menu]', creditConfig).setOrigin(0.5);
        this.add.text(centerX, 400, '[ Press (R) to the restart this game]', creditConfig).setOrigin(0.5);
        creditConfig = {
            color: '#CD00CD',
            fontFamily: 'Pangolin',
            fontSize: '50px',
            stroke: '#FFFFFF',
            strokeThickness: 3,
            align: 'left',
            fixedWidth: 0,
        }
        this.add.text(centerX, 300, '[ Victory! ]', creditConfig).setOrigin(0.5);
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
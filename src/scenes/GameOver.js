class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
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
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.sound.play("select_music", { volume: 2.0 });
            this.scene.start("menuScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyR)){
            this.sound.play("select_music", { volume: 2.0 });
            this.scene.start(currentScene);
        }
    }
}
class Credits extends Phaser.Scene {
    constructor() {
        super("creditScene");
    }

    create() {
        //place background
        // this.background = this.add.tileSprite(0, 0, 800, 480, 'forest').setOrigin(0.0);
        //UI and text
        let titleConfig = {
            fontFamily: 'Pangolin',
            fontSize: '32px',
            color: '#FFFFFF',
            align: 'right',
        }
        let text1Config = {
            fontFamily: 'Pangolin',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'right',
        }
        let creditConfig = {
            color: '#CD00CD',
            fontFamily: 'Pangolin',
            fontSize: '22px',
            stroke: '#FFFFFF',
            strokeThickness: 3,
            align: 'left',
            fixedWidth: 0,
        }


        //add credits
        this.add.text(centerX, centerY - 230, 'Game Designer:', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 190, 'Yufeng Xie,  Larry Li,  Jiaying Hou', text1Config).setOrigin(0.5);

        this.add.text(centerX, centerY -130, 'Programmer:', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY -90, 'Yufeng Xie,  Larry Li', text1Config).setOrigin(0.5);

        this.add.text(centerX, centerY - 30, 'Sound Effect:', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 10, 'Larry Li', text1Config).setOrigin(0.5);

        this.add.text(centerX, centerY + 70, 'Art:', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 110, 'Jiaying Hou, Yufeng Xie', text1Config).setOrigin(0.5);

        this.add.text(centerX, centerY + 170, 'Music:', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 210, 'Jiaying Hou', text1Config).setOrigin(0.5);

        //type space to play
        this.add.text(centerX, centerY + 280, '[ Press (M) to Return ]', creditConfig).setOrigin(0.5);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update() {
        //scroll the background
        // this.background.tilePositionX += 1;

        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.sound.play("select_music", { volume: 2.0 });
            this.scene.start("menuScene");
        }
    }
}
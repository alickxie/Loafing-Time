class Instru extends Phaser.Scene {
    constructor() {
        super("instruScene");
    }


    create() {
        //place background
        // this.background = this.add.tileSprite(0, 0, 800, 480, 'forest').setOrigin(0.0);
        //UI and text
        let instruConfig = {
            color: '#000000',
            fontFamily: 'Pangolin',
            fontSize: '42px',
            stroke: '#FFFFFF',
            strokeThickness: 3,
            align: 'left',
            fixedWidth: 0,
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

        let credit2Config = {
            color: '#000000',
            fontFamily: 'Pangolin',
            fontSize: '24px',
            stroke: '#FFFFFF',
            strokeThickness: 3,
            align: 'left',
            fixedWidth: 0,
        }
        //add instructions
        let menu1Config = { fontFamily: 'Pangolin', fontSize: '50px', color: '#ffff00', stroke: '#000000', strokeThickness: 3, padding: { top: 5, bottom: 5, }, fixedWidth: 0 }
        this.add.text(centerX, centerY - 200, 'Its Loafing Time!', menu1Config).setOrigin(0.5);

        this.add.text(centerX, centerY - 100, 'Control: ', instruConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 50, 'Hold (Space) to play "game"', credit2Config).setOrigin(0.5);
        this.add.text(centerX, centerY , 'Release (Space) to work', credit2Config).setOrigin(0.5);

        this.add.text(centerX, centerY + 80, 'Goal:', instruConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 120, 'Avoid being catach while playing game at work.', credit2Config).setOrigin(0.5);

        //type space to play
        this.add.text(centerX, centerY + 220, '[ Press (M) to the Menu]', creditConfig).setOrigin(0.5);
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
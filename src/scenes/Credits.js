class Credits extends Phaser.Scene {
    constructor() {
        super("creditScene");
    }

    create() {
        //place background
        // this.background = this.add.tileSprite(0, 0, 800, 480, 'forest').setOrigin(0.0);

        //UI and text
        let titleConfig = {
            fontFamily: 'Fipps',
            fontSize: '28px',
            color: '#FFFFFF',
            align: 'right',
        }
        let text1Config = {
            fontFamily: 'Minecraftia',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'right',
        }

        //add credits
        this.add.text(centerX, centerY - 230, 'Game Designer:', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 170, 'Yufeng Xie,  Larry Li,  Jiaying Hou', text1Config).setOrigin(0.5);

        this.add.text(centerX, centerY - 130, 'Programmer:', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - 70, 'Yufeng Xie,  Larry Li', text1Config).setOrigin(0.5);

        this.add.text(centerX, centerY - 30, 'Sound Effect:', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 30, 'Larry Li', text1Config).setOrigin(0.5);

        this.add.text(centerX, centerY + 70, 'Art:', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 130, 'Jiaying Hou, Yufeng Xie', text1Config).setOrigin(0.5);

        this.add.text(centerX, centerY + 170, 'Music:', titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + 230, 'Jiaying Hou', text1Config).setOrigin(0.5);

        // Credits button
        const menuButton = this.add.image(centerX, centerY + 300, 'menuButton')
            .setDisplaySize(128, 40).setInteractive()
            .on('pointerover', () => { menuButton.alpha = 0.5 })
            .on('pointerout', () => { menuButton.alpha = 1.0 })
            .on('pointerup', () => {
                menuButton.setTexture('menuButton(Pressed)');
                this.sound.play("select_music", { volume: 2.0 });

                this.clock = this.time.delayedCall(250, () => {
                    this.scene.start("menuScene");
                }, null, this);
            });
    }

    update() {
    }
}
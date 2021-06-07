class Game extends Phaser.Scene {

    constructor() {
        super("gameScene");

    }

    create() {
            
        // });
        this.add.image(0,0,'GameBg').setOrigin(0,0);
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
        // this.add.text(centerX, centerY - 100, 'Loafing Time', menuConfig).setOrigin(0.5);

        //The Play Button
        this.input.setDefaultCursor('url(/assets/image/hand.png), pointer');
        const { width, height } = this.scale
        const playButton = this.add.image(width * 0.5, height * 0.75, 'playButton')
            .setDisplaySize(170, 90).setInteractive()
            .on('pointerover', () => { playButton.alpha = 0.7 })
            .on('pointerout', () => { playButton.alpha = 1.0 })
            .on('pointerup', () => {
                playButton.setTexture('playButton(Pressed)');
                this.sound.play("select_music", { volume: 2.0 });

                this.clock = this.time.delayedCall(250, () => {
                    this.scene.start("menuScene");
                }, null, this);
            });

    }

    update() {
    }
}
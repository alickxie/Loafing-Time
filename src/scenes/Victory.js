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
        //enddings:
        this.anims.create({
            key: 'end',
            frames: this.anims.generateFrameNumbers('end1_animation', {
                start: 0,
                end: 8,
                first: 0
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'loafing_God',
            frames: this.anims.generateFrameNumbers('loafingGod_anims', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'normal',
            frames: this.anims.generateFrameNumbers('normal_person_anims', {
                start: 0,
                end: 7,
                first: 0
            }),
            frameRate: 4,
            repeat: -1
        });
        let mean = (performance1+performance2+performance3)/3;
        if(mean<=20){
            this.back = this.add.sprite(0,0,'end1').setOrigin(0,0);
            this.back.anims.play('end');
            this.add.text(centerX, 350, '[ You Are A cooporate-slave]', creditConfig).setOrigin(0.5);
        }else if(mean>20 && mean<=70){
            this.back = this.add.sprite(0,0,'normal').setOrigin(0,0);
            this.back.anims.play('normal');
            this.add.text(centerX, 350, '[ You Are Just A Normal]', creditConfig).setOrigin(0.5);
        }else if(mean>70 && mean<=105){
            this.back = this.add.sprite(0,0,'loafing_God').setOrigin(0,0);
            this.back.anims.play('loafing_God');
            this.add.text(centerX, 350, '[ You Are THE LOOOAFING GOD!!!]', creditConfig).setOrigin(0.5);
        }
       

        const menuButton = this.add.image(centerX, 550, 'menuButton')
            .setDisplaySize(150, 50).setInteractive()
            .on('pointerover', () => { menuButton.alpha = 0.7 })
            .on('pointerout', () => { menuButton.alpha = 1.0 })
            .on('pointerup', () => {
                menuButton.setTexture('menuButton(Pressed)');
                this.sound.play("select_music", { volume: 2.0 });
                played1 = false;
                played2 = false;
                played3 = false;
                this.clock = this.time.delayedCall(250, () => {
                    this.scene.start("menuScene");
                }, null, this);
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
        
        this.add.text(centerX, 300, '[ Your Final Score:'+(performance1+performance2+performance3) +']', creditConfig).setOrigin(0.5);

    }

    update() {
    }
}
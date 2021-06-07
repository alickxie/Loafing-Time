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
            fontSize: '50px',
            stroke: '#FFFFFF',
            strokeThickness: 3,
            align: 'left',
            fixedWidth: 0,
        }
        this.anims.create({
            key: 'kin',
            frames: this.anims.generateFrameNumbers('kin_anims', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'high',
            frames: this.anims.generateFrameNumbers('high_anims', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'office',
            frames: this.anims.generateFrameNumbers('office_anims', {
                start: 0,
                end: 1,
                first: 0
            }),
            frameRate: 1,
            repeat: -1
        });

        if(currentScene =='playScene1'){
            this.backGround = this.add.sprite(0,0,'transition(1)').setOrigin(0,0).setAlpha(0.8);
            this.backGround.anims.play('kin');
            this.add.text(centerX, 400, '[ Kindergarten Score: '+performance1+' ]', creditConfig).setOrigin(0.5);
            if(performance1>=0 && performance1<20){
                this.add.text(centerX, 150, 'Gotcha! You need some practice, Kid!', creditConfig).setOrigin(0.5);
            }else if(performance1>=20 && performance1<60){
                this.add.text(centerX, 150, 'Almost, almost!', creditConfig).setOrigin(0.5);
            }else if(performance1>=60 && performance1<=105){
                this.add.text(centerX, 150, 'Well-Done! Sharp-Shooter!', creditConfig).setOrigin(0.5);
            }
        }
        if(currentScene =='playScene2'){
            this.backGround = this.add.sprite(0,0,'transition(2)').setOrigin(0,0).setAlpha(0.8);
            this.backGround.anims.play('high');
            this.add.text(centerX, 400, '[ High School Score: '+performance2+' ]', creditConfig).setOrigin(0.5);
            if(performance2>=0 && performance2<20){
                this.add.text(centerX, 150, 'Shuuuu! Silence! Boy!', creditConfig).setOrigin(0.5);
            }else if(performance2>=20 && performance2<60){
                this.add.text(centerX, 150, 'You almost had it all~', creditConfig).setOrigin(0.5);
            }else if(performance2>=60 && performance2<=105){
                this.add.text(centerX, 150, 'Good job! You ate them all!', creditConfig).setOrigin(0.5);
            }
        }
        if(currentScene =='playScene'){
            this.backGround = this.add.sprite(0,0,'transition(2)').setOrigin(0,0).setAlpha(0.8);
            this.backGround.anims.play('office');
            this.add.text(centerX, 400, '[ Adult Score: '+performance3+' ]', creditConfig).setOrigin(0.5);
            if(performance3>=0 && performance3<20){
                this.add.text(centerX, 150, 'OHHH, you might got fired for that! Man!', creditConfig).setOrigin(0.5);
            }else if(performance3>=20 && performance3<60){
                this.add.text(centerX, 150, 'You almost killed that dragon!', creditConfig).setOrigin(0.5);
            }else if(performance3>=60 && performance3<=105){
                this.add.text(centerX, 150, 'Wow, immpresive! Congrats!', creditConfig).setOrigin(0.5);
            }
            
        }

        const menuButton = this.add.image(centerX, 500, 'menuButton')
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

        const nextButton = this.add.image(centerX, 645, 'nextButton')
        .setDisplaySize(150, 50).setInteractive()
        .on('pointerover', () => { nextButton.alpha = 0.7 })
        .on('pointerout', () => { nextButton.alpha = 1.0 })
        .on('pointerup', () => {
            nextButton.setTexture('nextButton(Pressed)');
            this.sound.play("select_music", { volume: 2.0 });
            this.clock = this.time.delayedCall(250, () => {
                if(played1==true&&played2==true&&played3==true){
                    
                    this.scene.start('Victory');
                }else{
                    this.scene.start('instruScene');
                }
            }, null, this);
        });
        const retryButton = this.add.image(centerX, 575, 'retryButton')
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


        
        // this.add.text(centerX, 300, '[ Game Over ]', creditConfig).setOrigin(0.5);
        this.add.text(centerX, 250, reason, creditConfig).setOrigin(0.5);

    }

    update() {

    }
}
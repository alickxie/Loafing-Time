class Scene1 extends Phaser.Scene {
    constructor() {
        super("playScene1");


    }

    create() {
        this.score = 0;
        this.t = 0;
        this.fire = false;
        this.warn = 0;
        this.temper = 0;
        watch = false;
        reason = 'No Reason';
        sanity = 100;
        time = 0;
        this.turn = false;


        this.pointer = this.input.activePointer;
        currentScene = "playScene1";
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.mouse = this.input.mousePointer;

        this.Box = this.add.graphics();
        this.Bar = this.add.graphics();




        this.background = this.add.sprite(1, 0, 'classroom').setScale(1.0).setOrigin(0.0).setDepth(-1)
            .setInteractive().on('pointerup', () => {
                console.log("x:", this.input.x, "y:", this.input.y)
            });
        // this.arm = this.add.sprite();
        this.arm = this.add.sprite(1167, 496, 'arm').setOrigin(0, 1);

        this.desk = this.physics.add.sprite(175, 380, 'desk1').setOrigin(0, 0).setScale(1.82);
        this.desk.setImmovable(true);
        this.desk.body.setAllowGravity(false);
        this.base = this.physics.add.sprite(397, 710, 'trashCan-Base').setOrigin(0, 0).setScale(1.82);
        this.base.setImmovable(true);
        this.base.body.setAllowGravity(false);

        this.left = this.physics.add.sprite(394, 667, 'trashCan-Left').setOrigin(0.5, 0.5).setScale(1.82);
        // this.left.setAngle(-13.5);
        this.left.setVisible(false);
        this.left.setImmovable(true);
        this.left.body.setAllowGravity(false);
        this.right = this.physics.add.sprite(478, 667, 'trashCan-Right').setOrigin(0.5, 0.5).setScale(1.82);
        // this.right.setAngle(13.5);
        this.right.setVisible(false);
        this.right.setImmovable(true);
        this.right.body.setAllowGravity(false);

        //teacher:
        this.teacher = this.add.sprite(87, 117, 'teacher').setOrigin(0.0).setScale(1.1);
        this.teacher.setAlpha(0.0);

        //student
        this.student = this.add.sprite(748, 380, 'teacher').setOrigin(0.0).setScale(1.1);
        this.student.setAlpha(0.0);
        
        //blocks:
        this.checker = this.physics.add.sprite(397, 660, 'trashCan-Base').setOrigin(0, 0).setScale(1.5);
        this.checker.setImmovable(true);
        this.checker.setVisible(false);
        this.checker.body.setAllowGravity(false);
        this.airBlock2 = this.physics.add.sprite(80, 118, 'desk1').setOrigin(0, 0).setScale(0.95, 1.81);
        this.airBlock2.alpha = 0.7;
        this.airBlock2.setImmovable(true);
        this.airBlock2.body.setAllowGravity(false);
        this.airBlock2.setVisible(false);
        this.airBlock1 = this.physics.add.sprite(745, 380, 'desk1').setOrigin(0, 0).setScale(0.95, 1.81);
        this.airBlock1.alpha = 0.7;
        this.airBlock1.setImmovable(true);
        this.airBlock1.body.setAllowGravity(false);
        this.airBlock1.setVisible(false);
        this.airBlock = this.physics.add.sprite(560, 530, 'desk1').setOrigin(0, 0).setScale(1.8, 0.5);
        this.airBlock.alpha = 0.7;
        this.airBlock.setImmovable(true);
        this.airBlock.body.setAllowGravity(false);
        this.airBlock.setVisible(false);

        this.Box.fillStyle(0x222222, 0.8);
        this.Box.fillRect(1190, 30, 50, 320);

        sanity = 100;
        time = 0;

        this.SanityText = this.add.text(520, 50, `Class Over In: ${sanity}`, {
            fontFamily: 'Pangolin',
            fontSize: '30px',
            color: '#FF0000 ',
            stroke: '#6CBA8E',
            strokeThickness: 2
        });

        this.ScoreText = this.add.text(900, 50, `Score: ${this.score} / 10`, {
            fontFamily: 'Pangolin',
            fontSize: '30px',
            color: '#FF0000 ',
            stroke: '#6CBA8E',
            strokeThickness: 2
        });

        this.WarningText = this.add.text(200, 50, `Warning: ${this.warn} / 3`, {
            fontFamily: 'Pangolin',
            fontSize: '30px',
            color: '#FF0000 ',
            stroke: '#6CBA8E',
            strokeThickness: 2
        });

        // The looping timer to call out the collegaue checking event
        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.rando,
            callbackScope: this,
            loop: true
        });
    }

    // rando function to get random number from (0-9)
    rando() {
        randomNum = Math.floor(Math.random() * 20);
    }


    // Teacher turn around
    turnAround() {
        // console.log('jinqu')
        this.turn = true;
        this.teacher.alpha = 1;
        watch = true;
        this.time.delayedCall(2000, () => {
            this.teacher.setAlpha(0.0);
            watch = false;
            this.turn = false;
        }, null, this);
    }

    update() {
        if(this.warn>0){
            this.WarningText.setText('Warning: ' + this.warn + '/ 3');
        }

        // Arm rotate & Strength Bar
        if (keySPACE.isDown) {
            this.fire = true;
            this.t += 10;
            if (this.t >= 1500) {
                this.t = 1500;
            }

            this.Bar.fillStyle(0x00ff00, 1);
            this.Bar.fillRect(1195, 340, 40, -this.t / 5);
            let angle = Phaser.Math.Angle.Between(this.arm.x, this.arm.y, this.input.x, this.input.y);
            this.arm.alpha = 1;
            this.arm.setRotation(angle - 60);
        }

        if (randomNum == 5 &&!this.turn){
            console.log("Here");
            this.turnAround();
        }

        // Catch by teacher
        if (watch == true && this.fire == true) {
            console.log('Warnning')
            this.warn += 1;
            
            if (this.warn >= 3) {
                reason = "caught by teacher"
                this.scene.start("GameOver");
            }
            watch = false;
        }

        // ClassMate report
        if (this.temper == 11) {
            reason = "classmate report to teacher"
            this.scene.start("GameOver");
        } else if (this.temper == 7) {
            this.warn += 1;
            this.temper += 1;
            console.log('Warnning')
            this.turnAround();
        } else if (this.temper == 3) {
            this.temper += 1;
            this.warn += 1;
            console.log('Warnning')
            this.turnAround();
        }

        // Ball physics
        if (Phaser.Input.Keyboard.JustUp(keySPACE)) {
            this.fire = false;
            if (!this.checker.enableBody()) {
                this.checker.enableBody();
            }
            this.trashBall = this.physics.add.sprite(1270, 360, 'trashBall').setScale(0.2).setBounce(0.2);
            this.physics.add.collider(this.desk, this.trashBall);
            this.physics.add.collider(this.left, this.trashBall);
            this.physics.add.collider(this.right, this.trashBall);
            this.physics.add.collider(this.base, this.trashBall);
            this.physics.add.collider(this.airBlock, this.trashBall);
            this.physics.add.collider(this.airBlock1, this.trashBall, () => {
                this.student.alpha = 1;
                indoor = true;
                console.log('Yu Men')
                this.temper += 1;
                this.time.delayedCall(2000, () => {
                    this.student.setAlpha(0.0);
                    indoor = false;
                }, null, this);
            });
            this.physics.add.collider(this.airBlock2, this.trashBall, () => {
                this.turnAround();
            });
            this.physics.add.overlap(this.checker, this.trashBall, () => {
                this.score += 1;
                this.ScoreText.setText('Score: ' + this.score + ' / 10');
                console.log(this.score);
                this.checker.disableBody();
            }, null, this);

            this.trashBall.setGravity(0, 1500);
            this.physics.moveTo(this.trashBall, this.input.x, this.input.y, this.t * 2);


            this.Bar.clear();
            this.arm.alpha = 0;
            this.t = 0;
        }

        if (this.score >= 10) {
            this.scene.start("Victory");
        }

        if (sanity < 1) {
            reason = "Time Out!";
            this.scene.start("GameOver");
        }

        time++;
        if (time >= 100) {
            sanity -= 1;
            time -= 100;
            this.SanityText.setText('Class Over In: ' + sanity);
        }
    }
}
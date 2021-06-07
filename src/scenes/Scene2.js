class Scene2 extends Phaser.Scene {
    constructor() {
        super("playScene2");

    }

    create() {
        played2 = true;
        currentScene = "playScene2";
        this.value = 0;
        this.awareness = 0;
        this.completeness = 0;
        //open mouth
        this.open = false;
        // Add Keybind into the scene
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //add bgm
        this.bgm2 = this.sound.add('High_school', { mute: false, volume: 0.35, rate: 1.0, loop: true });
        this.bgm2.play();
        this.events.on('pause', () => { this.bgm2.stop() });
        this.events.on('shutdown', () => { this.bgm2.stop() });
        this.events.on('resume', () => { this.bgm2.play() });
        // Add different sprite image into the scene
        this.background = this.add.sprite(0, 0, 'scene2(version2)').setScale(1.0).setOrigin(0.0)
            .setInteractive().on('pointerup', () => {
                console.log("x:", this.input.x, "y:", this.input.y);
            });
        this.player = this.add.sprite(648, 360, 'noeating').setScale(1.0).setOrigin(0.5, 0.5);
        this.teacherOP = this.add.sprite(648, 389, 'teacher2_speaking').setScale(1).setOrigin(0.5, 0.5);

        //Add checkBox to the world
        this.middleBox = this.physics.add.sprite(645+20, 480, 'square').setScale(0.05, 0.2);
        this.middleBox.setAlpha(0.3);
        this.middleBox.setImmovable(true);
        this.middleBox.body.setAllowGravity(false);

        this.leftBox = this.physics.add.sprite(602+20, 480, 'square').setScale(0.05, 0.2);
        this.leftBox.setAlpha(0.3);
        this.leftBox.setImmovable(true);
        this.leftBox.body.setAllowGravity(false);

        this.rightBox = this.physics.add.sprite(688+20, 480, 'square').setScale(0.05, 0.2);
        this.rightBox.setAlpha(0.3);
        this.rightBox.setImmovable(true);
        this.rightBox.body.setAllowGravity(false);

        this.killBox = this.physics.add.sprite(580+20, 480, 'square').setScale(0.05, 0.2);
        this.killBox.setAlpha(0);
        this.killBox.setImmovable(true);
        this.killBox.body.setAllowGravity(false);

        // Add text UI into the scene
        this.completenessText = this.add.text(150, 560, `Finish Chips: %${this.completeness}`, {
            fontFamily: 'Pangolin',
            fontSize: '30px',
            color: '#FF0000 ',
            stroke: '#6CBA8E',
            strokeThickness: 2
        });
        this.awarenessText = this.add.text(950, 560, `Awareness: ${this.awareness} / 10`, {
            fontFamily: 'Pangolin',
            fontSize: '30px',
            color: '#FF0000 ',
            stroke: '#6CBA8E',
            strokeThickness: 2
        });

        //add beat
        this.beat = this.physics.add.sprite(1300, 480, 'square').setScale(0.05).setAlpha(0);

        // Speed
        this.beatSpeed = -400;
        // Add group of beats
        this.beatGroup = this.add.group({
            runChildUpdate: true
        });
        // let firstBeat = new Beat(this, 0).setScale(0.05).setAlpha(0.0);
        // this.beatGroup.add(firstBeat);

        // The loop function to generate different random number.
        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.rando,
            callbackScope: this,
            loop: true
        });
        const pauseButton = this.add.image(100, 50, 'glass-panel')
            .setDisplaySize(150, 50).setInteractive()
            .on('pointerover', () => { pauseButton.alpha = 0.5 })
            .on('pointerout', () => { pauseButton.alpha = 1.0 })
            .on('pointerup', () => {
                this.sound.play("select_music", { volume: 2.0 });

                this.scene.launch('Pause')
                this.scene.pause();
            });

        this.add.text(pauseButton.x, pauseButton.y, 'Pause')
            .setOrigin(0.5).setColor('#ff');

        const settingsButton = this.add.image(100, 120, 'glass-panel')
            .setDisplaySize(150, 50).setInteractive()
            .on('pointerover', () => { settingsButton.alpha = 0.5 })
            .on('pointerout', () => { settingsButton.alpha = 1.0 })
            .on('pointerup', () => {
                this.sound.play("select_music", { volume: 2.0 });
                this.scene.start("menuScene");
            });

        this.add.text(settingsButton.x, settingsButton.y, 'Menu')
            .setOrigin(0.5).setColor('#ff');
    }

    // Function to add beat on the world
    addBeats(x, y) {
        let beat = new Beat(this, this.beatSpeed, x, y).setScale(0.05);
        this.beatGroup.add(beat);
    }

    rando() {
        randomNum = Math.floor(Math.random() * 6);
        console.log(randomNum);
    }

    update() {
        this.status = this.beatGroup.getFirstAlive();
        // Eating action of the player
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {

            this.player.setTexture('eating');
            this.value = 0;
            //chips
            let r = Math.floor((Math.random() * 3));
                if (r == 0) {
                    this.sound.play("chips1", { volume: 1.0, rate: 1.3 });
                } else if (r == 1) {
                    this.sound.play("chips2", { volume: 1.0, rate: 1.3 });
                } else if (r == 2) {
                    this.sound.play("chips3", { volume: 1.0, rate: 1.5 });
                }

            if (this.physics.collide(this.middleBox, this.status)) {
                this.value = 10;
                this.sound.play("great", { volume: 1.0, rate: 1.1, fontSize: 150 });
                let i = this.add.text(this.status.x, this.status.y - 50, "Great!", { fontFamily: 'Courier', fontSize: 30 });
                this.time.delayedCall(200, () => {
                    i.destroy();
                }, null, this);
                this.completeness += this.value;
                this.completenessText.setText('Chips Left: ' + '%' + this.completeness);
                this.beatGroup.remove(this.status);
                this.status.destroy();

            } else if (this.physics.collide(this.leftBox, this.status)) {
                this.value = 5;
                this.sound.play("good", { volume: 1.0, rate: 1.1, fontSize: 150 });
                let i = this.add.text(this.status.x, this.status.y - 50, "Good!", { fontFamily: 'Courier', fontSize: 30 });
                this.time.delayedCall(200, () => {
                    i.destroy();
                }, null, this);
                this.completeness += 5;
                this.completenessText.setText('Chips Left: ' + '%' + this.completeness);
                this.beatGroup.remove(this.status);
                this.status.destroy();

            } else if (this.physics.collide(this.rightBox, this.status)) {
                this.value = 5;
                this.sound.play("good", { volume: 1.0, rate: 1.1, });
                let i = this.add.text(this.status.x, this.status.y - 50, "Good!", { fontFamily: 'Courier', fontSize: 30 });
                this.time.delayedCall(200, () => {
                    i.destroy();
                }, null, this);
                this.completeness += 5;
                this.completenessText.setText('Chips Left: ' + '%' + this.completeness);
                this.beatGroup.remove(this.status);
                this.status.destroy();


            } else {
                this.sound.play("miss", { volume: 0.3, rate: 1.5 });
                let i = this.add.text(930, 400, "Miss!", { fontFamily: 'Courier', fontSize: 100 });
                this.time.delayedCall(200, () => {
                    i.destroy();
                }, null, this);
                this.awareness += 1;
                this.awarenessText.setText('Awareness: ' + this.awareness + '/10');
            }


        } else if (Phaser.Input.Keyboard.JustUp(keySPACE)) {

            this.player.setTexture('noeating');
        }
        if (this.physics.collide(this.killBox, this.status)) {
            this.beatGroup.kill(this.status);
            console.log('killed')
        }


        // Teacher speak out loud
        if (randomNum == 5) {
            // this.beatGroup.remove(this.firstBeat);
            this.addBeats(1300, 480);
            randomNum = 0;
        }

        // Teacher speak out loud
        if (randomNum == 3) {
            // this.beatGroup.remove(this.firstBeat);
            this.addBeats(1300, 480);
            this.addBeats(1330, 480);
            this.addBeats(1360, 480);
            this.addBeats(1390, 480);

            randomNum = 0;
        }

        // Check if the beatbar overlap with the checkboxs
        //spaceDown
        if (this.physics.overlap(this.middleBox, this.beatGroup.getFirstAlive())) {
            this.teacherOP.setTexture('teacher2_speaking');
            if (this.beatGroup.getFirstAlive().score == false) {
                let r = Math.floor((Math.random() * 9));
                this.beatGroup.getFirstAlive().score = true;
                // console.log('r: ', r);
                if (r == 0) {
                    this.sound.play("a", { volume: 1.0, rate: 1 });
                } else if (r == 1) {
                    this.sound.play("b", { volume: 1.0, rate: 1 });
                } else if (r == 2) {
                    this.sound.play("c", { volume: 1.0, rate: 1 });
                } else if (r == 3) {
                    this.sound.play("d", { volume: 1.0, rate: 1 });
                } else if (r == 4) {
                    this.sound.play("i", { volume: 1.0, rate: 1 });
                } else if (r == 5) {
                    this.sound.play("l", { volume: 1.0, rate: 1 });
                } else if (r == 6) {
                    this.sound.play("o", { volume: 1.0, rate: 1 });
                } else if (r == 7) {
                    this.sound.play("u", { volume: 1.0, rate: 1 });
                } else if (r == 8) {
                    this.sound.play("zh", { volume: 1.0, rate: 1 });
                }
            }
        } else {
            this.teacherOP.setTexture('teacher2_speaking2');
        }

        // End Condition
        if (this.awareness >= 10) {
            reason = "caught by teacher"
            performance2 = this.completeness;
            this.scene.start("GameOver");
        }
        if (this.completeness >= 100) {
            performance2 = this.completeness;
            reason = "Victory"
            this.scene.start("GameOver");
        }
    }
}
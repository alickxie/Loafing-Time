class Scene2 extends Phaser.Scene {
    constructor() {
        super("playScene2");

    }

    create() {
        played2 = true;
        currentScene = "playScene2";
        time = 0;
        this.value = 0;
        this.awareness = 0;
        this.completeness = 0;
        //open mouth
        this.open = false;
        // Add Keybind into the scene
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //End Time
        this.overTime = 100;

        this.background = this.add.sprite(0, 0, 'scene2(version2)').setScale(1.0).setOrigin(0.0)
            .setInteractive().on('pointerup', () => {
                // console.log("x:", this.input.x, "y:", this.input.y);
            });
        this.musicBar = this.add.sprite(0, 480, 'musicBar').setScale(1.0, 0.8).setOrigin(0, 0).setAlpha(0.5);
        this.player = this.add.sprite(648, 360, 'noeating').setScale(1.0).setOrigin(0.5, 0.5);
        this.teacherOP = this.add.sprite(648, 389, 'teacher2_speaking').setScale(1).setOrigin(0.5, 0.5);

        //Add checkBox to the world
        this.middleBox = this.physics.add.sprite(645 + 20, 550, 'square').setScale(0.05, 0.2);
        this.middleBox.setAlpha(0);
        this.middleBox.setImmovable(true);
        this.middleBox.body.setAllowGravity(false);

        this.leftBox = this.physics.add.sprite(602 + 20, 550, 'square').setScale(0.05, 0.2);
        this.leftBox.setAlpha(0);
        this.leftBox.setImmovable(true);
        this.leftBox.body.setAllowGravity(false);

        this.rightBox = this.physics.add.sprite(688 + 20, 550, 'square').setScale(0.05, 0.2);
        this.rightBox.setAlpha(0);
        this.rightBox.setImmovable(true);
        this.rightBox.body.setAllowGravity(false);

        this.killBox = this.physics.add.sprite(580 + 20, 550, 'square').setScale(0.05, 0.2);
        this.killBox.setAlpha(0);
        this.killBox.setImmovable(true);
        this.killBox.body.setAllowGravity(false);

        // Add text UI into the scene
        this.completenessText = this.add.text(560, 360, `Finish Chips: %${this.completeness}`, {
            fontFamily: 'Minecraftia',
            fontSize: '20px',
            color: '#7f1bcc',
            stroke: '#6CBA8E',
            strokeThickness: 2
        });
        this.awarenessText = this.add.text(890, 600, `Awareness: ${this.awareness} / 5`, {
            fontFamily: 'Minecraftia',
            fontSize: '20px',
            color: '#7f1bcc',
            stroke: '#6CBA8E',
            strokeThickness: 2
        });
        // Add the sanity text to the scene
        this.overTimeText = this.add.text(190, 600, `TimeLeft: ${this.overTime} s`, {
            fontFamily: 'Minecraftia',
            fontSize: '20px',
            color: '#7f1bcc',
            stroke: '#6CBA8E',
            strokeThickness: 2
        });


        //add beat
        this.beat = this.physics.add.sprite(1300, 480, 'rhythmBar(Orange)').setScale(0.5).setAlpha(0);

        // Speed
        this.beatSpeed = -450;
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
        //Pause buttons:
        const pauseButton = this.add.image(90, 40, 'pauseButton').setAlpha(0.9)
            .setDisplaySize(128, 40).setInteractive()
            .on('pointerover', () => { pauseButton.alpha = 0.5 })
            .on('pointerout', () => { pauseButton.alpha = 0.9 })
            .on('pointerup', () => {
                pauseButton.setTexture('pauseButton(Pressed)');
                this.sound.play("select_music", { volume: 2.0 });
                this.scene.launch('Pause')
                this.sound.stopAll();
                this.scene.pause();
            });

        // Menu button
        const menuButton = this.add.image(90, 90, 'menuButton').setAlpha(0.9)
            .setDisplaySize(128, 40).setInteractive()
            .on('pointerover', () => { menuButton.alpha = 0.7 })
            .on('pointerout', () => { menuButton.alpha = 0.9 })
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
    }

    // Function to add beat on the world
    addBeats(x, y) {
        let beat = new Beat(this, this.beatSpeed, x, y).setScale(0.4);
        this.beatGroup.add(beat);
    }

    rando() {
        randomNum = Math.floor(Math.random() * 6);
        // console.log(randomNum);
    }

    update() {

        if (true){
            time++;
                if (time >= 100) {
                    time -= 100;
                    this.overTime -= 1;
                    this.overTimeText.setText('TimeLeft: ' + this.overTime + ' s');
                    // console.log(gameScore);
                }
        }

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
                this.value = 5;
                this.sound.play("great", { volume: 1.0, rate: 1.1, fontSize: 150 });
                let i = this.add.text(this.status.x, this.status.y - 50, "Great!", { fontFamily: 'Courier', fontSize: 30 });
                this.time.delayedCall(200, () => {
                    i.destroy();
                }, null, this);
                this.completeness += this.value;
                this.completenessText.setText('Finish Chips: ' + '%' + this.completeness);
                this.beatGroup.remove(this.status);
                this.status.destroy();

            } else if (this.physics.collide(this.leftBox, this.status)) {
                this.value = 1;
                this.sound.play("good", { volume: 1.0, rate: 1.1, fontSize: 150 });
                let i = this.add.text(this.status.x, this.status.y - 50, "Good!", { fontFamily: 'Courier', fontSize: 30 });
                this.time.delayedCall(200, () => {
                    i.destroy();
                }, null, this);
                this.completeness += this.value;
                this.completenessText.setText('Finish Chips: ' + '%' + this.completeness);
                this.beatGroup.remove(this.status);
                this.status.destroy();

            } else if (this.physics.collide(this.rightBox, this.status)) {
                this.value = 1;
                this.sound.play("good", { volume: 1.0, rate: 1.1, });
                let i = this.add.text(this.status.x, this.status.y - 50, "Good!", { fontFamily: 'Courier', fontSize: 30 });
                this.time.delayedCall(200, () => {
                    i.destroy();
                }, null, this);
                this.completeness += this.value;
                this.completenessText.setText('Finish Chips: ' + '%' + this.completeness);
                this.beatGroup.remove(this.status);
                this.status.destroy();
            } else {
                this.sound.play("miss", { volume: 0.3, rate: 1.5 });
                let i = this.add.text(930, 400, "Miss!", { fontFamily: 'Courier', fontSize: 100 });
                this.time.delayedCall(200, () => {
                    i.destroy();
                }, null, this);
                this.awareness += 1;
                this.awarenessText.setText('Awareness: ' + this.awareness + '/5');
            }

        } else if (Phaser.Input.Keyboard.JustUp(keySPACE)) {

            this.player.setTexture('noeating');
        }
        if (this.physics.collide(this.killBox, this.status)) {
            this.beatGroup.kill(this.status);
            // console.log('killed')
        }

        // Teacher speak out loud
        if (randomNum == 5) {
            // this.beatGroup.remove(this.firstBeat);
            this.addBeats(1300, 550);
            randomNum = 0;
        }

        // Teacher speak out loud
        if (randomNum == 3) {
            // this.beatGroup.remove(this.firstBeat);
            this.addBeats(1300, 550);
            this.addBeats(1340, 550);
            this.addBeats(1380, 550);
            this.addBeats(1420, 550);

            randomNum = 0;
        }

        // Teacher speak out loud
        if (randomNum == 1) {
            // this.beatGroup.remove(this.firstBeat);
            this.addBeats(1300, 550);
            this.addBeats(1340, 550);

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
                    this.sound.play("a", { volume: 2.0, rate: 1 });
                } else if (r == 1) {
                    this.sound.play("b", { volume: 2.0, rate: 1 });
                } else if (r == 2) {
                    this.sound.play("c", { volume: 2.0, rate: 1 });
                } else if (r == 3) {
                    this.sound.play("d", { volume: 2.0, rate: 1 });
                } else if (r == 4) {
                    this.sound.play("i", { volume: 2.0, rate: 1 });
                } else if (r == 5) {
                    this.sound.play("l", { volume: 2.0, rate: 1 });
                } else if (r == 6) {
                    this.sound.play("o", { volume: 2.0, rate: 1 });
                } else if (r == 7) {
                    this.sound.play("u", { volume: 2.0, rate: 1 });
                } else if (r == 8) {
                    this.sound.play("zh", { volume: 2.0, rate: 1 });
                }
            }
        } else {
            this.teacherOP.setTexture('teacher2_speaking2');
        }

        // End Condition
        if (this.awareness >= 5) {
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
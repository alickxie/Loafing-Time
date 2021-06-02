class Scene2 extends Phaser.Scene {
    constructor() {
        super("playScene2");

    }

    create() {
        currentScene = "playScene2";
        this.value = 0;
        this.awareness = 0;
        this.completeness = 0;

        // Add Keybind into the scene
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Add different sprite image into the scene
        this.background = this.add.sprite(1, 0, 'scene2(version2)').setScale(1.0).setOrigin(0.0)
            .setInteractive().on('pointerup', () => {
                console.log("x:", this.input.x, "y:", this.input.y);
            });
        this.player = this.add.sprite(575, 290, 'noeating').setScale(1.1).setOrigin(0, 1);
        this.teacherOP = this.add.sprite(648, 589, 'teacher-opMouse').setScale(1.5).setAlpha(0.0);

        //Add checkBox to the world
        this.middleBox = this.physics.add.sprite(645, 480, 'square').setScale(0.05, 0.2);
        this.middleBox.setAlpha(0.3);
        this.middleBox.setImmovable(true);
        this.middleBox.body.setAllowGravity(false);

        this.leftBox = this.physics.add.sprite(602, 480, 'square').setScale(0.05, 0.2);
        this.leftBox.setAlpha(0.3);
        this.leftBox.setImmovable(true);
        this.leftBox.body.setAllowGravity(false);

        this.rightBox = this.physics.add.sprite(688, 480, 'square').setScale(0.05, 0.2);
        this.rightBox.setAlpha(0.3);
        this.rightBox.setImmovable(true);
        this.rightBox.body.setAllowGravity(false);

        this.killBox = this.physics.add.sprite(580, 480, 'square').setScale(0.05, 0.2);
        this.killBox.setAlpha(0);
        this.killBox.setImmovable(true);
        this.killBox.body.setAllowGravity(false);

        // Add text UI into the scene
        this.completenessText = this.add.text(150, 560, `Chips Left: %${this.completeness}`, {
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
    }

    // Function to add beat on the world
    addBeats(x,y) {
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

            if (this.physics.collide(this.middleBox, this.status)) {
                this.value = 10;
                this.completeness += this.value;
                this.completenessText.setText('Chips Left: ' + '%' + this.completeness);
                this.beatGroup.remove(this.status);
                this.status.destroy();

            } else if (this.physics.collide(this.leftBox, this.status)) {
                this.value = 5;
                this.completeness += 5;
                this.completenessText.setText('Chips Left: ' + '%' + this.completeness);
                this.beatGroup.remove(this.status);
                this.status.destroy();

            } else if (this.physics.collide(this.rightBox, this.status)) {
                this.value = 5;
                this.completeness += 5;
                this.completenessText.setText('Chips Left: ' + '%' + this.completeness);
                this.beatGroup.remove(this.status);
                this.status.destroy();

            
            } else {
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
            this.addBeats(1300,480);
            this.addBeats(1330,480);
            this.addBeats(1360,480);
            this.addBeats(1390,480);
            
            randomNum = 0;
        }

        // Check if the beatbar overlap with the checkboxs
        //spaceDown
        if (this.physics.overlap(this.middleBox, this.beatGroup)) {
            this.teacherOP.setAlpha(1);
        } else {
            this.teacherOP.setAlpha(0);
        }

        // End Condition
        if (this.awareness >= 10) {
            reason = "caught by teacher"
            this.scene.start("GameOver");
        }
        if (this.completeness >= 100) {
            this.scene.start("Victory");
        }
    }
}
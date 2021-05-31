class Scene2 extends Phaser.Scene {
    constructor() {
        super("playScene2");

    }

    create() {
        // Add Keybind into the scene
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Add different sprite image into the scene
        this.background = this.add.sprite(1, 0, 'scene2(version2)').setScale(1.0).setOrigin(0.0)
        .setInteractive().on('pointerup', () => {
            console.log("x:", this.input.x, "y:", this.input.y);
        });
        this.player = this.add.sprite(575, 290, 'noeating').setScale(1.1).setOrigin(0, 1);
        this.teacherOP = this.add.sprite(643, 475, 'teacher-opMouse').setScale(1.5).setAlpha(0.0);

        // The loop function to generate different random number.
        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.rando,
            callbackScope: this,
            loop: true
        });
    }

    rando() {
        randomNum = Math.floor(Math.random() * 20);
        console.log(randomNum);
    }

    update() {
        // Eating action of the player
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.player.setTexture('eating');
        } else if (Phaser.Input.Keyboard.JustUp(keySPACE)) {
            this.player.setTexture('noeating');
        }

        // Teacher speak out loud
        if (randomNum == 5){
            console.log("Here1s");
            randomNum = 0;
            this.teacherOP.setAlpha(1.0)
        }
    }
}
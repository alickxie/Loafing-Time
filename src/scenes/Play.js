class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        input = this.input;

    }

    // Create object in Playscene
    create() {
        // The global variable.
        gameScore = 0;
        sanity = 100;
        playGame = false;
        gameStatus = true;
        time = 0;
        currentScene = "playScene";
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.random = Math.floor(Math.random() * 10);

        // Create the background work area
        this.background = this.add.sprite(0, 0, 'WorkArea').setOrigin(0.0);
        this.backgroundMusic = this.sound.add('workBgm', { mute: false, volume: 0.5, rate: 1, loop: true });
        // This is the progress bar
        this.Box = this.add.graphics();
        this.Bar = this.add.graphics();
        this.Bar.x = 240;
        this.Box.x = 240;
        this.Bar.y = 80;
        this.Box.y = 80;
        this.Box.fillStyle(0x222222, 0.8);
        this.Box.fillRect(240, 70, 320, 50);

        // Add the sanity text to the scene
        this.SanityText = this.add.text(525, 40, `Sanity: ${sanity} / 100`, {
            fontFamily: 'Pangolin',
            fontSize: '30px',
            color: '#FF0000 ',
            stroke: '#6CBA8E',
            strokeThickness: 2
        });

        // Create trun around collegaue in the scene
        this.colleague = this.add.sprite(604, 297, 'watching-colleague').setOrigin(0.0);
        this.colleague.setAlpha(0.0);

        // Create the working computer screen on the scene
        this.computerScreen = this.add.sprite(506, 435, 'work-screen').setOrigin(0.0);

        // The mouse input
        this.mouse = this.input.mousePointer;

        //---------- Bar Text --------------//
        // var width = game.config.width;
        // var height = game.config.height;
        // var loadingText = this.make.text({
        //     x: width / 2,
        //     y: height / 2 - 50,
        //     text: 'Completeness:',
        //     style: {
        //         font: '20px monospace',
        //         fill: '#ffffff'
        //     }
        // });
        // loadingText.setOrigin(0.5, 0.5);

        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.rando,
            callbackScope: this,
            loop: true
        });

    }

    rando() {
            randomNum = Math.floor(Math.random() * 10);
    }

    update() {

        // Click the reveal the x & y postions
        if (this.mouse.isDown) {
            console.log("x: ", this.input.x, "y: ", this.input.y);
        }

        // Game Loop

        if (gameStatus == true && gameScore < 100) {
            // Check if user press SPACE to play the game or not
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {

                //create background music
                this.backgroundMusic.stop();
                this.backgroundMusic = this.sound.add('bgm', { mute: false, volume: 0.5, rate: 1, loop: true });
                this.backgroundMusic.play();

                playGame = true;
                this.computerScreen.setTexture('game-screen');
                console.log("Playing: ", playGame);
            } else if (Phaser.Input.Keyboard.JustUp(keySPACE)) {
                playGame = false;
                this.backgroundMusic.stop();
                this.backgroundMusic = this.sound.add('workBgm', { mute: false, volume: 0.5, rate: 1, loop: true });
                this.backgroundMusic.play();
                this.computerScreen.setTexture('work-screen');
                console.log("Playing: ", playGame);
            }

            // If the current score less than 1, Gameover
            if (sanity < 1) {
                this.backgroundMusic.stop();
                this.scene.start("GameOver");

            }

            // When playgame is true, increase the progress bar, else
            // decrease the progress bar.
            if (playGame == true) {
                time++;
                if (time >= 100) {
                    gameScore += 3;
                    time -= 100;
                    this.Bar.fillStyle(0x00ff00, 1);
                    this.Bar.fillRect(250, 80, 3 * gameScore, 30);
                    console.log(gameScore);
                }
            } else {
                time++;
                if (time >= 100) {
                    sanity -= 1;
                    time -= 100;
                    this.SanityText.setText('Sanity: ' + sanity + ' / 100');
                    console.log(gameScore);
                }
            }

            if (randomNum == 5) {
                randomNum = 0;
                this.sound.play("whatrudoing", { volume: 0.5 });
                this.colleague.setAlpha(1.0);
              

                this.clock = this.time.delayedCall(500, () => {
                    watch = true;
                }, null, this);

                this.clock = this.time.delayedCall(2000, () => {
                    if (gameStatus == true) {
                        this.colleague.setAlpha(0.0);
                        watch = false;
                    }
                }, null, this);
            }

            if (playGame == true && watch == true) {
                this.sound.play("wuuut", { volume: 0.7 });
                this.colleague.setTexture('angry-colleague');

                gameStatus = false;
                this.clock = this.time.delayedCall(2000, () => {
                    this.backgroundMusic.stop();
                    this.scene.start("GameOver");
                }, null, this);
            }

        }else if (gameScore >= 100) {
            this.backgroundMusic.stop();
            this.scene.start("Victory");
        }

        // // This is the checking condition for watching collegaue.
        // if (playGame == true) {
        //     this.clock = this.time.delayedCall(1900, () => {
        //         if (watch == true) {
        //             this.colleague.setTexture('angry-colleague');
        //             gameStatus = false;
        //             this.scene.start("GameOver");
        //         }
        //     }, null, this);
        // }
    }
}
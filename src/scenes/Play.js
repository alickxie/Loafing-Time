class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        input = this.input;
    }

    // Create object in Playscene
    create() {
        // The global variable.
        reason = "No Reason."
        gameScore = 0;
        sanity = 100;
        playGame = false;
        gameStatus = true;
        time = 0;
        currentScene = "playScene";
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.temp = 1;
        // The random number used to generate collegaues
        this.random = Math.floor(Math.random() * 20);

        this.boss = new Boss(this, 0);
        this.text = this.add.text(0, 0, 'Boss').setScale(1.5);

        // while(this.boss.positionX>=45 && this.boss.positionY<=553){
        //     this.boss.positionX += 1;
        //     this.boos.positionY -= 2.8;
        // }

        // Add the colleague computer screen
        this.colleagueScreen = this.add.sprite(578, 264, 'work-screen').setOrigin(0.0).setScale(0.7);

        // Create the background work area
        this.background = this.add.sprite(1, 0, 'WorkArea').setScale(1.0).setOrigin(0.0);
        this.backgroundMusic = this.sound.add('workBgm', { mute: false, volume: 0.5, rate: 1, loop: true });

        // This is the progress bar
        this.Box = this.add.graphics();
        this.Bar = this.add.graphics();
        this.Bar.x = 240;
        this.Box.x = 240;
        this.Bar.y = 80;
        this.Box.y = 80;
        this.Box.fillStyle(0x222222, 0.8);
        this.Box.fillRect(220, 60, 320, 50);

        // Add the sanity text to the scene
        this.SanityText = this.add.text(520, 100, `Sanity: ${sanity} / 100`, {
            fontFamily: 'Pangolin',
            fontSize: '30px',
            color: '#FF0000 ',
            stroke: '#6CBA8E',
            strokeThickness: 2
        });

        // Create trun around collegaue in the scene
        this.colleague = this.add.sprite(600, 303, 'watching-colleague').setOrigin(0.0);
        this.colleague.setAlpha(0.0);
        this.door = this.add.sprite(1120, 350, 'door').setOrigin(0.0);
        this.door.setScale(2.0);
        this.door.setAlpha(0.0);

        // Create the working computer screen on the scene
        this.computerScreen = this.add.sprite(561, 415, 'work-screen').setOrigin(0.0);

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
                reason = "You are Institutionalized!"
                this.boss.destroy();
                this.text.destroy();
                this.scene.start("GameOver");
            }

            // When playgame is true, increase the progress bar, else
            // decrease the sanity value
            if (playGame == true) {
                time++;
                if (time >= 100) {
                    gameScore += 2;
                    time -= 100;
                    this.Bar.fillStyle(0x00ff00, 1);
                    this.Bar.fillRect(230, 70, 3 * gameScore, 30);
                    console.log(gameScore);
                }
            } else {
                time++;
                if (time >= 100) {
                    sanity -= 2;
                    time -= 100;
                    this.SanityText.setText('Sanity: ' + sanity + ' / 100');
                    console.log(gameScore);
                }
            }
            if (this.boss.alive == false && randomNum == 15) {
                this.boss = new Boss(this, 0);
                this.text = this.add.text(0, 0, 'Boss').setScale(1.5);
                this.temp = 1;
            }
            //boss
            if (this.boss.alive == true) {
                this.text.x = this.boss.x;
                this.text.y = this.boss.y - this.temp * 50;
                this.text.setScale(this.temp);
                //walk closer
                if (this.boss.x >= 50 && this.boss.walking == true) {
                    this.boss.x -= 0.8;
                    this.boss.y += 0.5;
                    this.temp += 0.005;
                    this.boss.setScale(this.temp);
                    //walk back
                } else if (this.boss.walking == false) {
                    this.clock = this.time.delayedCall(2000, () => {
                        this.boss.watch = false;
                        this.boss.x += 0.8;
                        this.boss.y -= 0.5;
                        this.temp -= 0.005;
                        this.boss.setScale(this.temp);
                    }, null, this);
                }
                if (this.boss.x <= 50) {
                    if (this.boss.flipX == false) this.boss.flipX = true;
                    this.boss.walking = false;
                    this.clock = this.time.delayedCall(300, () => {
                        this.boss.watch = true;
                    }, null, this);
                }
                if (this.boss.watch == true && playGame == true) {
                    this.backgroundMusic.stop();
                    reason = "You are caught by your Boss!"
                    this.boss.destroy();
                    this.text.destroy();
                    this.scene.start("GameOver");

                }
                if (this.boss.x > 300) {
                    // this.boss.setAlpha(0.0);

                    this.boss.alive = false;
                    this.boss.destroy();
                    this.text.destroy();
                }
            }

            // When we get a random number 5, we get the collegaue checking event
            if (randomNum == 5) {
                randomNum = 0;
                this.sound.play("whatrudoing", { volume: 0.3 });
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
            //door 
            if (randomNum == 10) {
                randomNum = 0;
                // this.sound.play("whatrudoing", { volume: 0.3 });
                this.door.setAlpha(1.0);


                this.clock = this.time.delayedCall(600, () => {
                    indoor = true;
                }, null, this);

                this.clock = this.time.delayedCall(2000, () => {
                    if (gameStatus == true) {
                        this.door.setAlpha(0.0);
                        indoor = false;
                    }
                }, null, this);
            }

            // If player failed to release (Space) in 0.5s, when collegaue
            // is checking, then gameover.
            if (playGame == true && watch == true) {
                this.sound.play("wuuut", { volume: 0.5 });
                this.colleague.setTexture('angry-colleague');

                gameStatus = false;
                this.clock = this.time.delayedCall(2000, () => {
                    this.backgroundMusic.stop();
                    reason = "You are caught by your colleague!"
                    this.text.destroy();
                    this.boss.destroy();
                    watch = false;
                    this.scene.start("GameOver");
                }, null, this);
            }
            if (playGame == true && indoor == true) {
                // this.sound.play("wuuut", { volume: 0.5 });
                // this.colleague.setTexture('angry-colleague');
                gameStatus = false;
                this.clock = this.time.delayedCall(2000, () => {
                    this.backgroundMusic.stop();
                    reason = "You are caught by the manager!"
                    
                    this.text.destroy();
                    this.boss.destroy();
                    indoor = false;
                    this.scene.start("GameOver");
                }, null, this);
            }
            // Player win the game 
        } else if (gameScore >= 100) {
            this.backgroundMusic.stop();
            this.scene.start("Victory");
        }
    }
}
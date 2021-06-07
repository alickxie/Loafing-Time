class Scene3 extends Phaser.Scene {
    constructor() {
        super("playScene3");
        input = this.input;
    }

    // Create object in Playscene
    create() {

        // Create door animation
        this.anims.create({
            key: 'openDoor',
            frames: this.anims.generateFrameNumbers('door_open', {
                start: 0,
                end: 3,
                first: 0
            }),
            frameRate: 4,
            repeat: 0
        });
        this.anims.create({
            key: 'closeDoor',
            frames: this.anims.generateFrameNumbers('door_close', {
                start: 3,
                end: 0,
                first: 3
            }),
            frameRate: 4,
            repeat: 0
        });

        // The global variable.
        reason = "No Reason."
        gameScore = 0;
        sanity = 100;
        playGame = false;
        gameStatus = true;
        time = 0;
        currentScene = "playScene3";
        indoor = false;
        played3 = true;
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.temp = 0.5;
        this.close = false;
        this.far = false;
        this.doorOpen = false;

        // The random number used to generate collegaues.
        this.random = Math.floor(Math.random() * 20);

        // Create the scenary outside the window.
        this.windowScene = this.add.sprite(200, 110, 'windowBackground').setScale(0.49).setOrigin(0.0);
        this.windowScene2 = this.add.sprite(60, 173, 'windowBackground').setScale(0.5).setOrigin(0.0);

        // Add the boss text
        this.boss = new Boss(this, 0);
        this.physics.moveTo(this.boss, 100, 450, 50);
        this.close = true;


        // this.text = this.add.text(0, 0, 'boss').setScale(1.5);

        // Add the colleague computer screen
        this.colleagueScreen = this.add.sprite(605, 250, 'work-screen').setOrigin(0.0).setScale(0.8);
        // Create the working computer screen on the scene
        this.computerScreen = this.add.sprite(580, 400, 'work-screen').setOrigin(0.0).setScale(1.1);

        //Create the scenary outside the door
        this.hallWay = this.add.sprite(890, 0, 'roadBackground').setScale(1.0).setOrigin(0.0);

        // Adding the manager
        this.manager = this.add.sprite(1120, 200, 'manager').setOrigin(0.0);
        this.manager.setScale(1.0);
        this.manager.setAlpha(0.0);

        // Create the background work area
        this.background = this.add.sprite(1, 0, 'WorkArea').setScale(1.0).setOrigin(0.0);

        // Create trun around collegaue in the scene
        this.colleague1 = this.add.sprite(569, 297, 'collegeback').setOrigin(0.0);
        this.colleague = this.add.sprite(569, 297, 'college_peak').setOrigin(0.0);
        this.colleague.setAlpha(0.0);

        // Create the door on the scene
        this.door1 = this.add.sprite(1020, 150, 'door1').setScale(1.0).setOrigin(0.0);

        // Play the background music
        this.backgroundMusic = this.sound.add('workBgm', { mute: false, volume: 0.5, rate: 1, loop: true });
        this.backgroundMusic.play();
        this.events.on('pause', () => { this.backgroundMusic.stop() });
        this.events.on('shutdown', () => { this.backgroundMusic.stop() });
        this.events.on('resume', () => { this.backgroundMusic.play() });
        // This is the progress bar
        this.Box = this.add.graphics();
        this.Bar = this.add.graphics();
        this.Box.fillStyle(0x222222, 0.8);
        this.Box.fillRect(490, 50, 320, 50);

        // Add the sanity text to the scene
        this.SanityText = this.add.text(536, 100, `Sanity: ${sanity} / 100`, {
            fontFamily: 'Minecraftia',
            fontSize: '25px',
            color: '#7f1bcc',
            stroke: '#6CBA8E',
            strokeThickness: 2
        });

        // The mouse input
        this.mouse = this.input.mousePointer;

        // The looping timer to call out the collegaue checking event
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

    // rando function to get random number from (0-9)
    rando() {
        randomNum = Math.floor(Math.random() * 20);
    }


    update() {
        // this.sound.stopAll();
        //     // Click the reveal the x & y postions
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
                // this.text.destroy();
                performance3 = gameScore;
                this.sound.stopAll();
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
                    this.Bar.fillRect(500, 60, 3 * gameScore, 30);
                    console.log(gameScore);
                }
            } else {
                time++;
                if (time >= 100) {
                    sanity -= 2;
                    time -= 100;
                    this.SanityText.setText('Sanity: ' + sanity + ' / 100');
                    // console.log(gameScore);
                }
            }


            if (this.close == true) {
                this.boss.setTexture('boss_front');
                this.temp += 0.0005;
                this.boss.setScale(this.temp);
            } else if (this.far == true) {
                this.boss.setTexture('boss_back');
                this.temp -= 0.0005;
                this.boss.setScale(this.temp);
            } else {
                this.boss.setTexture('boss_front_peak');
            }
            //create boss
            if (this.boss.alive == false) {
                if (randomNum == 15) {
                    this.boss.setAlpha(1);
                    this.boss.moves = true;
                    this.physics.moveTo(this.boss, 100, 450, 50);
                    this.boss.alive = true;
                    this.close = true;
                    this.temp = 0.5;
                }
                // this.text = this.add.text(0, 0, 'Boss').setScale(1.5);
            }
            //if boss is alive, check states
            if (this.boss.alive == true) {

                if (this.boss.body.x < 100) {
                    // console.log('test')
                    this.close = false;
                    this.boss.body.moves = false;

                    //react time 300ms
                    this.clock = this.time.delayedCall(300, () => {
                        this.boss.watch = true;
                        // console.log(this.boss.watch);
                    }, null, this);

                    //after 2000ms boss start to move back
                    this.clock = this.time.delayedCall(2300, () => {
                        this.boss.body.moves = true;
                        this.boss.watch = false;
                        this.physics.moveTo(this.boss, 380, 350, 50);
                        this.far = true;

                    }, null, this);
                }
            }
            //then start to check play game
            if (this.boss.watch == true && playGame == true) {
                this.boss.setTexture('boss_angry');
                console.log('you are dead')
                this.backgroundMusic.stop();
                reason = "You are caught by your Boss!"
                // this.boss.destroy();
                // this.text.destroy();
                // this.sound.play("teacher");
                performance3 = gameScore;
                gameStatus = false;
                this.sound.stopAll();
                this.clock = this.time.delayedCall(500, () => {
                    this.scene.start("GameOver");

                }, null, this);
            }

            //destroy boss
            if (this.boss.alive == true) {
                if (this.boss.body.x > 385) {
                    this.boss.moves = false;
                    this.boss.alive = false;
                    this.far = false;
                    this.boss.setAlpha(0);
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

            //manager
            if (randomNum == 10 && this.doorOpen == false) {
                randomNum = 0;
                this.doorOpen = true;

                this.door1.anims.play('openDoor');
                this.manager.setAlpha(1.0);

                this.clock = this.time.delayedCall(1300, () => {
                    indoor = true;
                }, null, this);

                this.clock = this.time.delayedCall(1800, () => {
                    indoor = false;
                    this.door1.anims.play('closeDoor');
                }, null, this);

                this.clock = this.time.delayedCall(2800, () => {
                    this.doorOpen = false;
                }, null, this);


            }

            // If player failed to release (Space) in 0.5s, when collegaue
            // is checking, then gameover.
            if (playGame == true && watch == true) {
                this.sound.play("wuuut", { volume: 0.5 });
                this.add.sprite(565, 245, 'college_angry').setOrigin(0.0);

                gameStatus = false;
                // this.sound.stopAll();
                this.clock = this.time.delayedCall(2000, () => {
                    this.backgroundMusic.stop();
                    reason = "You are caught by your colleague!"
                    // this.text.destroy();
                    this.boss.destroy();
                    watch = false;
                    performance3 = gameScore;
                    this.scene.start("GameOver");
                }, null, this);
            }
            if (playGame == true && indoor == true) {
                // this.sound.play("wuuut", { volume: 0.5 });
                // this.colleague.setTexture('angry-colleague');
                this.manager.setTexture('manager_angry');
                gameStatus = false;
                this.sound.stopAll();
                this.clock = this.time.delayedCall(2000, () => {
                    this.backgroundMusic.stop();
                    reason = "You are caught by the manager!"
                    // this.text.destroy();
                    this.boss.destroy();
                    indoor = false;
                    performance3 = gameScore;

                    this.scene.start("GameOver");
                }, null, this);
            }
            // Player win the game 
        } else if (gameScore >= 100) {
            this.backgroundMusic.stop();
            reason = 'Victory';
            performance3 = gameScore;
            this.sound.stopAll();
            this.scene.start("GameOver");
        }
    }
}
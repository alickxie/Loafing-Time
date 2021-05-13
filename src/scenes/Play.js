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
         time = 0;
         currentScene = "playScene";
         keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Create the background work area
        this.background = this.add.sprite(0, 0, 'WorkArea').setOrigin(0.0);

        // This is the progress bar
        this.Box = this.add.graphics();
        this.Bar = this.add.graphics();
        this.Bar.x = 240;
        this.Box.x = 240;
        this.Bar.y = 80;
        this.Box.y = 80;
        this.Box.fillStyle(0x222222, 0.8);
        this.Box.fillRect(240, 70, 320, 50);

        this.SanityText = this.add.text(10, 10, `Sanity: ${sanity} / 100`, {
            fontFamily: 'Pangolin',
            fontSize: '30px',
            color: '#FF0000 ',
            stroke: '#6CBA8E',
            strokeThickness: 2
        });

        // Create trun around collegaue in the scene
        this.colleague = this.add.sprite()

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
    }

    update() {

        // Click the reveal the x & y postions
        if (this.mouse.isDown) {
            console.log("x: ", this.input.x, "y: ", this.input.y);
        }

        // Check if user press SPACE to play the game or not
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            playGame = true;
            console.log("Playing: ",playGame);
        } else if (Phaser.Input.Keyboard.JustUp(keySPACE)) {
            playGame = false;
            console.log("Playing: ",playGame);
        }

        // If the current score less than 1, Gameover
        if (sanity < 1) {
            this.scene.start("GameOver");
        }

        // When playgame is true, increase the progress bar, else
        // decrease the progress bar.
        if (playGame == true) {
            time++;
            if (time >= 100) {
                gameScore += 1;
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

        // This is the checking condition for watching collegaue.
        if (playGame == true && watch == true) {
            gameStatus = false;
            this.scene.start("GameOver");
        }
    }
}
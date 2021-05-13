class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        input = this.input;
    }

    create() {
        this.background = this.add.sprite(0, 0, 'WorkArea').setOrigin(0.0);
        Score = 5;
        time = 0;
        currentScene = "playScene";
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // var isDown = keySPACE.isDown;
        this.Box = this.add.graphics();
        this.Bar = this.add.graphics();
        // this.Box = this.add.graphics();
        this.Bar.x = 240;
        this.Box.x = 240;
        this.Bar.y = 80;
        this.Box.y = 80;
        this.Box.fillStyle(0x222222, 0.8);
        this.Box.fillRect(240, 70, 320, 50);
        this.mouse = this.input.mousePointer;
        this.colleague = this.add.sprite()

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
        if(this.mouse.isDown){
            console.log("x: ",this.input.x,"y: ",this.input.y);
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            playGame = true;
            console.log(playGame);
        } else if (Phaser.Input.Keyboard.JustUp(keySPACE)) {
            playGame = false;
            console.log(playGame);
        }
        if(Score<1){
            this.scene.start("GameOver");
        }
        if (playGame == true) {
            time++;
            if (time >= 100) {
                Score += 1;
                time -= 100;
                this.Bar.fillStyle(0x00ff00, 1);
                this.Bar.fillRect(250, 80, 3 * Score, 30);
                console.log(Score);
            }
        } else {
            time++;
            if (time >= 100) {
                Score -= 1;
                time -= 100;
                this.Bar.clear();
                this.Bar.fillStyle(0x00ff00, 1);
                this.Bar.fillRect(250, 80, 3 * Score, 30);  
                console.log(Score);
            }
        }


        // if(playGame == true){
        //     this.clock = this.time.delayedCall(1000, () => {
        //         Score += 1;
        //         console.log(Score);
        //     }, null, this);
        // }else{
        //     this.clock = this.time.delayedCall(1000, () => {
        //         Score -= 1;
        //         console.log(Score);
        //     }, null, this);
        // }

        // if(keySPACE.isDown == true){
        //     // this.sound.play("select_music", { volume: 2.0 });
        //     playGame = true;
        //     // console.log(playGame);
        // }
        // playGame = false;
        //     // console.log(playGame);




        if (playGame == true && watch == true) {
            gameStatus = false;
            this.scene.start("GameOver");
        }
    }
}
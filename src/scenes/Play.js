class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        currentScene = "Play";
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    }

    update() {
        if(Phaser.Input.Keyboard.isDown(keySPACE)){
            this.sound.play("select_music", { volume: 2.0 });
            playGame = true;
        }




        if(playGame == true && watch == true){
            gameStatus = false;
            this.scene.start("GameOver");
        }
    }
}
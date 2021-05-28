class Scene1 extends Phaser.Scene {
    constructor() {
        super("playScene1");
        
    }

    create() {
        this.pointer = this.input.activePointer;
        currentScene = "playScene1";
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



        
        this.background = this.add.sprite(1, 0, 'classroom').setScale(1.0).setOrigin(0.0)
            .setInteractive().on('pointerup', () => {
                console.log("x:", this.input.x, "y:", this.input.y);
                this.trashBall = this.physics.add.sprite(1270, 360, 'trashBall').setScale(0.1).setMaxVelocity(2000, 2000);
                this.trashBall.setGravity(0, 1500);
                this.physics.moveTo(this.trashBall, this.input.x, this.input.y, this.pointer.getDuration() * 2);
                console.log(this.pointer.getDuration() * 2);
            });
        // this.arm = this.add.sprite();
        this.arm = this.add.sprite(1167, 496, 'arm').setOrigin(0, 1);

        this.Box = this.add.graphics();
        this.Bar = this.add.graphics();

        // this.Box.x = 240;
        // this.Box.y = 80;
        this.Box.fillStyle(0x222222, 0.8);
        this.Box.fillRect(1190, 30, 50, 320);
    }
    shoot() {

    }
    update() {


        let angle = Phaser.Math.Angle.Between(this.arm.x, this.arm.y, this.input.x, this.input.y);
        //rotation cannon
        this.arm.setRotation(angle - 60);

        this.Bar.fillStyle(0x00ff00, 1);
        this.Bar.fillRect(1195, 340, 40, -this.pointer.getDuration()/10);
    }
}
class Scene1 extends Phaser.Scene {
    constructor() {
        super("playScene1");


    }

    create() {
        this.t = 0;
        this.pointer = this.input.activePointer;
        currentScene = "playScene1";
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.mouse = this.input.mousePointer;
        this.fire = false;
        this.Box = this.add.graphics();
        this.Bar = this.add.graphics();


        this.background = this.add.sprite(1, 0, 'classroom').setScale(1.0).setOrigin(0.0).setDepth(-1)
            .setInteractive().on('pointerup', () => {
                console.log("x:", this.input.x, "y:", this.input.y)
            });
        // this.arm = this.add.sprite();
        this.arm = this.add.sprite(1167, 496, 'arm').setOrigin(0, 1);
        
        this.desk = this.physics.add.sprite(175, 380, 'desk1').setOrigin(0, 0).setScale(1.82);
        this.desk.setImmovable(true);
        this.desk.body.setAllowGravity(false);
        this.base = this.physics.add.sprite(397, 710, 'trashCan-Base').setOrigin(0, 0).setScale(1.82);
        this.base.setImmovable(true);
        this.base.body.setAllowGravity(false);
        this.left = this.physics.add.sprite(394, 667, 'trashCan-Left').setOrigin(0.5, 0.5).setScale(1.82);
        this.left.setAngle(-13.5);
        this.left.setImmovable(true);
        this.left.body.setAllowGravity(false);
        this.right = this.physics.add.sprite(473, 667, 'trashCan-Right').setOrigin(0.5, 0.5).setScale(1.82);
        this.right.setAngle(13.5);
        this.right.setImmovable(true);
        this.right.body.setAllowGravity(false);
        
        

        this.Box.fillStyle(0x222222, 0.8);
        this.Box.fillRect(1190, 30, 50, 320);
    }
    shoot() {

    }
    update() {
        if (keySPACE.isDown) {
            this.t += 10;
            if (this.t >= 1500) {
                this.t = 1500;
            }

            this.Bar.fillStyle(0x00ff00, 1);
            this.Bar.fillRect(1195, 340, 40, -this.t / 5);
            let angle = Phaser.Math.Angle.Between(this.arm.x, this.arm.y, this.input.x, this.input.y);
            this.arm.alpha = 1;
            this.arm.setRotation(angle - 60);

        }
        if (Phaser.Input.Keyboard.JustUp(keySPACE)) {

            this.trashBall = this.physics.add.sprite(1270, 360, 'trashBall').setScale(0.2).setBounce(0.2);
            this.physics.add.collider(this.desk, this.trashBall);
            this.physics.add.collider(this.left, this.trashBall);
            this.physics.add.collider(this.right, this.trashBall);
            this.physics.add.collider(this.base, this.trashBall);
            this.trashBall.setGravity(0, 1500);
            this.physics.moveTo(this.trashBall, this.input.x, this.input.y, this.t * 2);

            this.Bar.clear();
            this.arm.alpha = 0;
            this.t = 0;
        }
    }
}
class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(x,y) {
        this.physics.add.sprite(x, y, 'trashBall').setScale(0.1).setMaxVelocity(2000, 2000);
        this.setGravity(0, 1500);
    }

    update() {
        // override physics sprite update()
        super.update();

    }
}
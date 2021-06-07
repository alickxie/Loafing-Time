class Object extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y) {
        super(scene, x, y);
        this.setScale(1.82);
        this.setImmovable(true);
        this.body.setAllowGravity(false);
    }

    update() {
        // override physics sprite update()
        super.update();

    }
}
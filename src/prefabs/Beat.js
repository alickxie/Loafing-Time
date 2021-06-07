//Beat prehabs
class Beat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, x, y) {
        // call Phaser Physics Sprite constructor
        super(scene, x, y, 'square');
        
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable(true);
        this.score = false;
        this.body.setAllowGravity(false);
    }

    update() {
        // override physics sprite update()
        super.update();
        if (this.x < -this.width) {
            this.destroy();
        }
    }
}
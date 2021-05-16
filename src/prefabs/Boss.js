//Obstacle1 prehabs
class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        
        // call Phaser Physics Sprite constructor
        super(scene, 250, 330, 'boss');
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable(true);
        // this.setSize(0, this.y + 50, false)
        this.body.setAllowGravity(false);
        this.angle = -35;
        this.walking = true;
        this.watch = false;
        this.alive = true;
    }

    update() {
        // override physics sprite update()
        super.update();

    }
}
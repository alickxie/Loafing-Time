class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        
        // call Phaser Physics Sprite constructor
        super(scene, 380, 350, 'boss_front_peak');
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.setVelocityX(velocity);            // make it go!
        this.setImmovable(true);
        this.setScale(0.5);
        this.depth = 0;
        this.setOrigin(0.5);
        // this.setSize(0, this.y + 50, false)
        this.body.setAllowGravity(false);
        // this.angle = 0;
        this.walking = true;
        this.watch = false;
        this.alive = true;
        this.flipX = false;
    }

    update() {
        // override physics sprite update()
        
        super.update();

    }
}
export class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        this.scene = scene;

        // character image assets
        this.scene.load.image('characterSmallLeft1', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0018.png');
        this.scene.load.image('characterSmallLeft2', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0019.png');
        this.scene.load.image('characterSmallRight1', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0027.png');
        this.scene.load.image('characterSmallRight2', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0028.png');

        this.scene.load.image('characterSmallLeftDown', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0020.png');
        this.scene.load.image('characterSmallRightDown', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0029.png');

        this.scene.load.image('characterBigLeft1', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0021.png');
        this.scene.load.image('characterBigLeft2', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0022.png');
        this.scene.load.image('characterBigRight1', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0030.png');
        this.scene.load.image('characterBigRight2', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0031.png');

        this.scene.load.image('characterBigLeftDown', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0023.png');
        this.scene.load.image('characterBigRightDown', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0032.png');
    }

    preUpdate(time, dTime) {

    }

    // function for making the player grow larger
    growFunction() {

        this.player.small = false;

        this.y -= 11;
        this.setVelocity(0, 0);

        if (this.facingRight)
        {
            this.setTexture('characterBigRight1').setScale(1.5);
        }
        else
        {
            this.setTexture('characterBigLeft1').setScale(1.5);
        }

        this.setSize(24, 24);
    }

    // function for making the player grow smaller
    shrinkFunction() {

        this.small = true;

        this.setVelocity(0, 0);
        
        if (this.facingRight)
        {
            this.setTexture('characterSmallRight1').setScale(1);
        }
        else
        {
            this.setTexture('characterSmallLeft1').setScale(1);
        }

        this.setSize(15, 14);
    }
}
export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {

        // character image assets
        this.load.image('characterSmallLeft1', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0018.png');
        this.load.image('characterSmallLeft2', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0019.png');
        this.load.image('characterSmallRight1', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0027.png');
        this.load.image('characterSmallRight2', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0028.png');

        this.load.image('characterSmallLeftDown', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0020.png');
        this.load.image('characterSmallRightDown', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0029.png');

        this.load.image('characterBigLeft1', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0021.png');
        this.load.image('characterBigLeft2', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0022.png');
        this.load.image('characterBigRight1', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0030.png');
        this.load.image('characterBigRight2', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0031.png');

        this.load.image('characterBigLeftDown', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0023.png');
        this.load.image('characterBigRightDown', 'assets/kenney_pixel-platformer/Tiles/Characters/tile_0032.png');

        // coin image asset
        this.load.image('coin', 'assets/kenney_pixel-platformer/Tiles/tile_0180.png');
    }

    create() {
        
        // grab size of screen
        const {width, height} = this.scale;

        // initialize player object
        this.player = this.physics.add.sprite(width / 2, height / 2, 'characterSmallRight1').setScale(3);

        // player variables
        this.player.small = true; // boolean for declaring character size - set to false if character is big

        this.player.accelerationXS = 100;

        this.player.accelerationXB = 60;

        this.player.velocityMaxXS = 200;
        this.player.velocityMaxYS = 200;

        this.player.velocityMaxXB = 125;
        this.player.velocityMaxYB = 300;

        // declare maximum velocity in x and y directions
        this.player.setMaxVelocity(this.player.velocityMaxXS, this.player.velocityMaxYS);

        this.player.velocityX = 0;
        this.player.velocityY = 0;

        // grab key inputs
        this.keyW = this.input.keyboard.addKey("W", false, true);
        this.keyA = this.input.keyboard.addKey("A", false, true);
        this.keyS = this.input.keyboard.addKey("S", false, true);
        this.keyD = this.input.keyboard.addKey("D", false, true);

        this.up = this.input.keyboard.addKey("UP", false, true);
        this.left = this.input.keyboard.addKey("LEFT", false, true);
        this.down = this.input.keyboard.addKey("DOWN", false, true);
        this.right = this.input.keyboard.addKey("RIGHT", false, true);

        this.space = this.input.keyboard.addKey("SPACE", false, true);
    }

    update(time, dTime) {
        
        // check movement
        let moveX = 0;

        if (this.keyA.isDown || this.left.isDown)
        {
            moveX--;
        }
        if (this.keyD.isDown || this.right.isDown)
        {
            moveX++;
        }

        if (moveX != 0)
        {
            if (this.player.small)
            {
                this.player.velocityX += moveX * this.player.accelerationXS * dTime / 1000;
            }
            else
            {
                this.player.velocityX += moveX * this.player.accelerationXB * dTime / 1000;
            }
        }
    }
    
}

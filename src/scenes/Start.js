export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {

        // tilemap asset
        this.load.image('pixelPlatformerTiles', 'assets/kenney_pixel-platformer/Tilemap/tilemap.png');

        // map asset
        this.load.tilemapTiledJSON('tiles', 'assets/Maps/test-map.tmj');

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

        // draw map
        this.map = this.add.tilemap('tiles');
        var tileset = this.map.addTilesetImage('tilemap', 'pixelPlatformerTiles');
        this.background = this.map.createLayer("Background", tileset, 0, 0);
        this.level = this.map.createLayer("Objects", tileset, 0, 0);
        this.level.setCollisionBetween(1, 151);

        // initialize player object
        this.player = this.physics.add.sprite(width / 2, height / 2, 'characterSmallRight1').setScale(1);

        // player variables
        this.player.small = true; // boolean for declaring character size - set to false if character is big

        this.player.accelerationXS = 300;
        this.player.deccelerationXS = 600;

        this.player.accelerationXB = 200;
        this.player.deccelerationXB = 600;

        this.player.velocityMaxXS = 400;
        this.player.velocityMaxYS = 400;

        this.player.velocityMaxXB = 200;
        this.player.velocityMaxYB = 600;

        // declare maximum velocity in x and y directions
        this.player.setMaxVelocity(this.player.velocityMaxXS, this.player.velocityMaxYS);

        this.player.velocityX = 0;
        this.player.velocityY = 0;

        // set trigger for jumping
        this.player.jump = false;

        // set collision between player and level
        this.physics.add.collider(this.level, this.player);

        // grab key inputs
        this.keyW = this.input.keyboard.addKey("W", false, false);
        this.keyA = this.input.keyboard.addKey("A", false, true);
        this.keyS = this.input.keyboard.addKey("S", false, false);
        this.keyD = this.input.keyboard.addKey("D", false, true);

        this.up = this.input.keyboard.addKey("UP", false, false);
        this.left = this.input.keyboard.addKey("LEFT", false, true);
        this.down = this.input.keyboard.addKey("DOWN", false, false);
        this.right = this.input.keyboard.addKey("RIGHT", false, true);

        this.space = this.input.keyboard.addKey("SPACE", false, false);
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
        else
        {
            if (this.player.small)
            {
                if (this.player.velocityX > 0)
                {
                    this.player.velocityX -= this.player.deccelerationXS * dTime / 1000;
                    
                    if (this.player.velocityX < 0)
                    {
                        this.player.velocityX = 0;
                    }
                }
                else if (this.player.velocityX < 0)
                {
                    this.player.velocityX += this.player.deccelerationXS * dTime / 1000;

                    if (this.player.velocityX > 0)
                    {
                        this.player.velocityX = 0;
                    }
                }
            }
            else
            {
                if (this.player.velocityX > 0)
                {
                    this.player.velocityX -= this.player.deccelerationXB * dTime / 1000;
                    
                    if (this.player.velocityX < 0)
                    {
                        this.player.velocityX = 0;
                    }
                }
                else if (this.player.velocityX < 0)
                {
                    this.player.velocityX += this.player.deccelerationXB * dTime / 1000;

                    if (this.player.velocityX > 0)
                    {
                        this.player.velocityX = 0;
                    }
                }
            }
        }

        this.player.setVelocityX(this.player.velocityX);

        // check for jumping
        if (this.player.small && (this.keyW.isDown || this.up.isDown || this.space.isDown))
        {
            this.player.jump = true;

            // buffer time before player hits ground
            this.time.delayedCall(100, () => {
                this.player.jump = false;
            });
        }

        if (this.player.small && this.player.jump)
        {
            // do a jump - todo
            console.log('Jump!');
            this.player.setVelocityY(-400);
            this.player.jump = false;
        }
    }
    
}

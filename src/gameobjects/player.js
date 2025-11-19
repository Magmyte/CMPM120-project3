export class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this);

        // define scene
        this.scene = scene;

        // add to physics
        this.scene.physics.add.existing(this);

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

        // player variables

        this.accelerationXS = 500;
        this.deccelerationXS = 1600;

        this.accelerationXB = 250;
        this.deccelerationXB = 1200;

        this.velocityMaxXS = 210;
        this.velocityMaxYS = 400;

        this.velocityMaxXB = 100;
        this.velocityMaxYB = 600;

        this.jumpVelocity = -250;

        this.smashVelocity = 450;

        // declare maximum velocity in x and y directions
        this.body.maxVelocity.set(this.velocityMaxXS, this.velocityMaxYS);

        this.velocityX = 0;
        this.velocityY = 0;

        // boolean for if character is small or big - true is small, false is big
        this.small = true;

        // check for facing
        this.facingRight = true;

        // set trigger for jumping
        this.jump = false;

        // set trigger for smash collision
        this.smashing = false;

        // grab key inputs
        this.keyW = this.scene.input.keyboard.addKey("W", false, false);
        this.keyA = this.scene.input.keyboard.addKey("A", false, true);
        this.keyS = this.scene.input.keyboard.addKey("S", false, false);
        this.keyD = this.scene.input.keyboard.addKey("D", false, true);

        this.up = this.scene.input.keyboard.addKey("UP", false, false);
        this.left = this.scene.input.keyboard.addKey("LEFT", false, true);
        this.down = this.scene.input.keyboard.addKey("DOWN", false, false);
        this.right = this.scene.input.keyboard.addKey("RIGHT", false, true);

        this.space = this.scene.input.keyboard.addKey("SPACE", false, false);

        // check for jumping
        this.keyW.on("down", () =>
        {
            this.jump = true;

            // buffer time before player hits ground
            this.scene.time.delayedCall(100, () =>
            {
                this.jump = false;
            });
        });

        this.up.on("down", () =>
        {
            this.jump = true;

            // buffer time before player hits ground
            this.scene.time.delayedCall(100, () =>
            {
                this.jump = false;
            });
        });

        this.space.on("down", () =>
        {
            this.jump = true;

            // buffer time before player hits ground
            this.scene.time.delayedCall(100, () =>
            {
                this.jump = false;
            });
        });

        // check for smashing
        this.keyS.on("down", () =>
        {
            if (!this.small && !this.smashing && this.body.blocked.down)
            {
                this.smashing = true;

                this.body.maxVelocity.set(this.smashVelocity, this.velocityMaxYB);

                if (this.facingRight)
                {
                    this.velocityX = this.smashVelocity;
                }
                else
                {
                    this.velocityX = (-1) * this.smashVelocity;
                }

                this.deccelerationXB = 100;

                this.scene.time.delayedCall(150, () =>
                {
                    this.smashing = false;

                    this.body.maxVelocity.set(this.velocityMaxXB, this.velocityMaxYB);

                    this.deccelerationXB = 1200;
                });
            }
        });

        // debug key for switching sizes - todo: remove later
        this.keyI = this.scene.input.keyboard.addKey("I", false, false);

        this.keyI.on("down", () =>
        {
            if (this.small)
            {
                this.growFunction();
            }
            else
            {
                this.shrinkFunction();
            }
        });
    }

    preUpdate(time, dTime) {

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

        if (!this.smashing && (moveX != 0))
        {
            if (this.small)
            {
                if (moveX * this.velocityX < 0)
                {
                    this.velocityX += moveX * Math.max(this.accelerationXS, this.deccelerationXS) * dTime / 1000;
                }
                else
                {
                    this.velocityX += moveX * this.accelerationXS * dTime / 1000;
                }
            }
            else
            {
                if (moveX * this.velocityX < 0)
                {
                    this.velocityX += moveX * Math.max(this.accelerationXB, this.deccelerationXB) * dTime / 1000;
                }
                else
                {
                    this.velocityX += moveX * this.accelerationXB * dTime / 1000;
                }
            }
        }
        else
        {
            if (this.small)
            {
                if (this.velocityX > 0)
                {
                    this.velocityX -= this.deccelerationXS * dTime / 1000;
                    
                    if (this.velocityX < 0)
                    {
                        this.velocityX = 0;
                    }
                }
                else if (this.velocityX < 0)
                {
                    this.velocityX += this.deccelerationXS * dTime / 1000;

                    if (this.velocityX > 0)
                    {
                        this.velocityX = 0;
                    }
                }
            }
            else
            {
                if (this.velocityX > 0)
                {
                    this.velocityX -= this.deccelerationXB * dTime / 1000;
                    
                    if (this.velocityX < 0)
                    {
                        this.velocityX = 0;
                    }
                }
                else if (this.velocityX < 0)
                {
                    this.velocityX += this.deccelerationXB * dTime / 1000;

                    if (this.velocityX > 0)
                    {
                        this.velocityX = 0;
                    }
                }
            }
        }

        this.body.setVelocityX(this.velocityX);

        // turn player sprite around when moving
        if (this.facingRight && (this.velocityX < 0))
        {
            this.facingRight = false;

            if (this.small)
            {
                this.setTexture('characterSmallLeft1');
            }
            else
            {
                this.setTexture('characterBigLeft1');
            }
        }
        else if (!this.facingRight && (this.velocityX > 0))
        {
            this.facingRight = true;

            if (this.small)
            {
                this.setTexture('characterSmallRight1');
            }
            else
            {
                this.setTexture('characterBigRight1');
            }
        }

        // check for jumping
        if (this.small && this.jump && this.body.blocked.down)
        {
            this.body.setVelocityY(this.jumpVelocity);
            this.jump = false;
        }
    }

    // function for making the player grow larger
    growFunction() {

        this.small = false;

        this.y -= 11;
        this.body.setVelocity(0, 0);

        if (this.facingRight)
        {
            this.setTexture('characterBigRight1').setScale(1.5);
        }
        else
        {
            this.setTexture('characterBigLeft1').setScale(1.5);
        }

        this.body.setSize(24, 24);

        // declare maximum velocity in x and y directions
        this.body.maxVelocity.set(this.velocityMaxXB, this.velocityMaxYB);
    }

    // function for making the player grow smaller
    shrinkFunction() {

        this.small = true;

        this.body.setVelocity(0, 0);
        
        if (this.facingRight)
        {
            this.setTexture('characterSmallRight1').setScale(1);
        }
        else
        {
            this.setTexture('characterSmallLeft1').setScale(1);
        }

        this.body.setSize(15, 14);

        // declare maximum velocity in x and y directions
        this.body.maxVelocity.set(this.velocityMaxXS, this.velocityMaxYS);
    }
}
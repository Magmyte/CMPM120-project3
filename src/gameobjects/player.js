export class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        scene.add.existing(this);

        // define scene
        this.scene = scene;

        // add to physics
        this.scene.physics.add.existing(this);

        // player variables - all values should be changed here

        this.accelerationXS = 400;
        this.deccelerationXS = 1000;

        this.accelerationXB = 300;
        this.deccelerationXB = 800;

        this.velocityMaxXS = 180;
        this.velocityMaxYS = 400;

        this.velocityMaxXB = 100;
        this.velocityMaxYB = 600;

        this.jumpVelocity = -250;

        this.smashVelocity = 450;
        this.smashDecceleration = 100;

        this.deccelerationXBReset = this.deccelerationXB;

        // declare maximum velocity in x and y directions
        this.body.maxVelocity.set(this.velocityMaxXS, this.velocityMaxYS);

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
                    this.body.setVelocityX(this.smashVelocity);
                }
                else
                {
                    this.body.setVelocityX((-1) * this.smashVelocity);
                }

                this.deccelerationXB = this.smashDecceleration;

                this.scene.time.delayedCall(150, () =>
                {
                    this.smashing = false;

                    this.body.maxVelocity.set(this.velocityMaxXB, this.velocityMaxYB);

                    this.deccelerationXB = this.deccelerationXBReset;
                });
            }
        });

        // key for restarting the scene
        this.keyR = this.scene.input.keyboard.addKey("R", false, false);

        this.keyR.on("down", () =>
        {
            this.scene.scene.restart();
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

        // debug key for switching scenes - todo: remove later
        this.keyZ = this.scene.input.keyboard.addKey("Z", false, false);

        this.keyZ.on("down", () =>
        {
            this.scene.scene.start("Start");
        });

        this.keyX = this.scene.input.keyboard.addKey("X", false, false);

        this.keyX.on("down", () =>
        {
            this.scene.scene.start("levelabby");
        });

        this.keyC = this.scene.input.keyboard.addKey("C", false, false);

        this.keyC.on("down", () =>
        {
            this.scene.scene.start('levelCharles');
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
                if (moveX * this.body.velocity.x < 0)
                {
                    this.body.setAccelerationX(moveX * Math.max(this.accelerationXS, this.deccelerationXS));
                }
                else
                {
                    this.body.setAccelerationX(moveX * this.accelerationXS);
                }
            }
            else
            {
                if (moveX * this.body.velocity.x < 0)
                {
                    this.body.setAccelerationX(moveX * Math.max(this.accelerationXB, this.deccelerationXB));
                }
                else
                {
                    this.body.setAccelerationX(moveX * this.accelerationXB);
                }
            }
        }
        else
        {
            if (this.small)
            {
                if (this.body.velocity.x > 0)
                {
                    this.body.setAccelerationX((-1) * this.deccelerationXS);
                }
                else if (this.body.velocity.x < 0)
                {
                    this.body.setAccelerationX(this.deccelerationXS);
                }
            }
            else
            {
                if (this.body.velocity.x > 0)
                {
                    this.body.setAccelerationX((-1) * this.deccelerationXB);
                }
                else if (this.body.velocity.x < 0)
                {
                    this.body.setAccelerationX(this.deccelerationXB);
                }
            }

            if (Math.abs(this.body.velocity.x) < 10)
            {
                this.body.setVelocityX(0);
                this.body.setAccelerationX(0);
            }
        }

        // turn player sprite around when moving
        if (this.facingRight && (this.body.velocity.x < 0))
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
        else if (!this.facingRight && (this.body.velocity.x > 0))
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
import {Player} from '../gameobjects/player.js';

export class levelCharles extends Phaser.Scene {

    constructor() {
        super({key: 'levelCharles', active: false});
    }

    preload() {

        // map asset
        this.load.tilemapTiledJSON('levelCharles', 'assets/Maps/level-charles.tmj');

        // push blocks assets
        this.load.image('pushBig', 'assets/kenney_pixel-platformer/Tiles/tile_0181.png');
        this.load.image('pushSmall', 'assets/kenney_pixel-platformer/Tiles/tile_0182.png');

        // interactives assets
        this.load.image('win', 'assets/kenney_pixel-platformer/Tiles/tile_0112.png');
        this.load.image('grow', 'assets/kenney_pixel-platformer/Tiles/tile_0028.png');
        this.load.image('shrink', 'assets/kenney_pixel-platformer/Tiles/tile_0027.png');
        this.load.image('bonus', 'assets/kenney_pixel-platformer/Tiles/tile_0067.png');
        this.load.image('coin', 'assets/kenney_pixel-platformer/Tiles/tile_0180.png');
    }

    create() {

        // draw map
        this.map = this.add.tilemap('levelCharles');
        var tileset = this.map.addTilesetImage('pixelPlatformerTilemapPacked', 'pixelPlatformerTilesPacked');
        this.background = this.map.createLayer("Background", tileset, 0, 0);
        this.level = this.map.createLayer("Level", tileset, 0, 0);
        this.level.setCollisionBetween(1, 151);

        this.interactiveGroup = this.add.group("interactives");

        this.interactives = this.map.getObjectLayer("Interactives");
        if (this.interactives)
        {
            for (var obj of this.interactives.objects)
            {
                if (obj.properties)
                {
                    if (obj.properties[0].name == "operation" && obj.properties[0].value)
                    {
                        let interactiveObject = this.physics.add.staticSprite(obj.x + 9, obj.y - 9, obj.properties[0].value);
                        interactiveObject.effect = obj.properties[0].value;
                        this.interactiveGroup.add(interactiveObject);
                    }
                }
            }
        }

        // initialize pushable objects
        this.pushables = this.add.group("pushables");

        this.push1 = this.physics.add.sprite(520, 420, 'pushBig');
        this.push1.body.setDragX(500);
        this.push1.body.setBounce(1, 0);
        this.push1.setPushable(false);
        this.pushables.add(this.push1);

        this.push2 = this.physics.add.sprite(560, 250, 'pushBig');
        this.push2.body.setDragX(500);
        this.push2.body.setBounce(1, 0);
        this.push2.setPushable(false);
        this.pushables.add(this.push2);

        this.push3 = this.physics.add.sprite(this.push1.x, 153, 'pushSmall');
        this.push3.setPushable(false);
        this.push3.body.setAllowGravity(false);

        // initialize player object
        this.grink = new Player(this, 200, 270, 'characterSmallRight1');

        // set collisions
        this.physics.add.collider(this.level, this.grink);
        this.physics.add.collider(this.level, this.pushables);
        this.physics.add.collider(this.grink, this.pushables);
        this.physics.add.collider(this.push1, this.push2);
        this.physics.add.collider(this.grink, this.push3);

        // initialize camera
        var camera = this.cameras.main;
        
        camera.startFollow(this.grink, false, 0.3, 0.3);
        camera.setZoom(4);

        this.levelWin = false;
        this.timeTracker = 0;

        // debug pushing
        this.keyI = this.input.keyboard.addKey("I", false, false);

        this.keyI.on("down", () =>
        {
            this.push1.setPushable(!this.push1.body.pushable);
            this.push2.setPushable(!this.push2.body.pushable);
        });
    }

    update(time, dTime) {

        // check for overlap between player and interactive object
        this.physics.world.overlap(this.grink, this.interactiveGroup, (grink, interactive) =>
        {
            if (interactive.effect == "win")
            {
                this.winLevel();
                interactive.destroy(true);
            }
            else if (interactive.effect == "bonus")
            {
                this.bonusObjective();
                interactive.destroy(true);
            }
            else if (grink.small && interactive.effect == "grow")
            {
                grink.growFunction();

                // enable pushing
                this.push1.setPushable(true);
                this.push2.setPushable(true);
            }
            else if (!grink.small && interactive.effect == "shrink")
            {
                grink.shrinkFunction();

                // disable pushing
                this.push1.setPushable(false);
                this.push2.setPushable(false);
            }
        });

        // set push3's x position to the same as push1's x position
        if (this.push3.x != this.push1.x)
        {
            this.push3.x = this.push1.x;
        }

        // winning text flashing
        if (this.levelWin && time > this.timeTracker + 800)
        {
            this.timeTracker = time;

            this.winnerText.setColor('#ffffff');

            this.time.delayedCall(400, () =>
            {
                this.winnerText.setColor('#ff0000');
            });
        }
    }

    bonusObjective() {

        // bonus objective text
        this.bonusText = this.add.text(this.grink.x - 100, this.grink.y - 25, "BONUS OBJECTIVE ACHIEVED!");
        this.bonusText.setFontSize(16);

        this.time.delayedCall(1500, () =>
        {
            this.tweens.add({
                targets: this.bonusText,
                y: "-= 60",
                alpha: 0,
                duration: 2500
            });
        });
    }

    winLevel() {

        // winning text
        this.winnerText = this.add.text(this.grink.x - 80, this.grink.y - 25, "A WINRAR IS YOU !!!");
        this.winnerText.setFontSize(18);

        this.levelWin = true;
    }
}
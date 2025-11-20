import {Player} from '../gameobjects/player.js';

export class levelCharles extends Phaser.Scene {

    constructor() {
        super({key: 'levelCharles', active: false});
    }

    preload() {

        // map asset
        this.load.tilemapTiledJSON('levelCharles', 'assets/Maps/level-charles.tmj');

        // interactives assets
        /* this.load.image('win', '');
        this.load.image('grow', '');
        this.load.image('shrink', '');
        this.load.image('bonus', ''); */
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
                    if (obj.properties[0].name == "operation" && obj.properties[0].operation)
                    {
                        let interactiveObject = this.physics.add.staticSprite(obj.x, obj.y, obj.properties[0].operation);

                    }
                }
            }
        }

        // initialize player object
        this.grink = new Player(this, 200, 270, 'characterSmallRight1');

        // set collisions
        this.physics.add.collider(this.level, this.grink);

        // initialize camera
        var camera = this.cameras.main;
        
        camera.startFollow(this.grink, false, 0.3, 0.3);
        camera.setZoom(4);
    }

    update(time, dTime) {

    }
}
import {Player} from '../gameobjects/player.js';

export class levelabby extends Phaser.Scene {

    constructor() {
        super({key: 'levelabby'});
    }

    preload() {

        // tilemap asset
        this.load.image('pixelPlatformerTiles', 'assets/kenney_pixel-platformer/Tilemap/tilemap.png');

        // map asset
        this.load.tilemapTiledJSON('tiles', 'assets/Maps/level1cmpm.tmj');

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
        this.map = this.add.tilemap("tiles");
        var tileset = this.map.addTilesetImage('tilemap', 'pixelPlatformerTiles');
        this.background = this.map.createLayer("Background", tileset, 400, 400);
        this.obstacles = this.map.createLayer("Obstacles", tileset, 400, 400);
        this.coins = this.map.getObjectLayer("Coins");
        this.bounceObject = this.map.getObjectLayer("Bounce Object");
        this.growthObject = this.map.getObjectLayer("Growth Object");
        this.crates = this.map.getObjectLayer("crates");
        this.key = this.map.getObjectLayer("Key");
        this.ending = this.map.getObjectLayer("ending");
       // this.obstacles.setCollisionBetween(1, 151);

        // initialize player object
        this.playerObject = new Player(this, width / 2, height / 2, 'characterSmallRight1');

        // set collision between player and level
        //this.physics.add.collider(this.obstacles, this.playerObject);
       // this.physics.add.collider(this.crates, this.playerObject);

        // initialize camera
        var camera = this.cameras.main;
        
        camera.startFollow(this.playerObject, false, 0.3, 0.3);
        camera.setZoom(4);
        camera.setBounds(350,350,800,500);
    }

    update(time, dTime) {

    }
}

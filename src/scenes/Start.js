import {Player} from '../gameobjects/player.js';

export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {

        // tileset asset
        this.load.image('pixelPlatformerTilesPacked', 'assets/kenney_pixel-platformer/Tilemap/tilemap_packed.png');

        // map asset
        this.load.tilemapTiledJSON('testTiles', 'assets/Maps/test-map.tmj');

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
    }

    create() {
        
        // grab size of screen
        const {width, height} = this.scale;

        // draw map
        this.map = this.add.tilemap('testTiles');
        var tileset = this.map.addTilesetImage('pixelPlatformerTilemapPacked', 'pixelPlatformerTilesPacked');
        this.background = this.map.createLayer("Background", tileset, 400, 400);
        this.level = this.map.createLayer("Objects", tileset, 400, 400);
        this.level.setCollisionBetween(1, 151);

        // initialize player object
        this.playerObject = new Player(this, width / 2, height / 2, 'characterSmallRight1');

        // set collision between player and level
        this.physics.add.collider(this.level, this.playerObject);

        // initialize camera
        var camera = this.cameras.main;
        
        camera.startFollow(this.playerObject, false, 0.3, 0.3);
        camera.setZoom(4);
        camera.setBounds(350,350,800,500);
    }

    update(time, dTime) {

    }
}

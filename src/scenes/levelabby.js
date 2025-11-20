import {Player} from '../gameobjects/player.js';

export class levelabby extends Phaser.Scene {

    constructor() {
        super({key: 'levelabby'});
    }

    preload() {

        // map asset
        this.load.tilemapTiledJSON('levelAbby', 'assets/Maps/level-abby.tmj');
    }

    create() {
        
        // grab size of screen
        const {width, height} = this.scale;

        // draw map
        this.map = this.add.tilemap('levelAbby');
        var tileset = this.map.addTilesetImage('pixelPlatformerTilemapPacked', 'pixelPlatformerTilesPacked');
        //this.background = this.map.createLayer("Background", tileset, 400, 400);
        //this.obstacles = this.map.createLayer("Obstacles", tileset, 400, 400);
        //this.coins = this.map.getObjectLayer("Coins");
        //this.bounceObject = this.map.getObjectLayer("Bounce Object");
        //this.growthObject = this.map.getObjectLayer("Growth Object");
        //this.crates = this.map.getObjectLayer("crates");
        //this.key = this.map.getObjectLayer("Key");
        //this.ending = this.map.getObjectLayer("ending");
        //this.obstacles.setCollisionBetween(1, 151);

        // initialize player object
        this.playerObject = new Player(this, width / 2, height / 2, 'characterSmallRight1');

        // set collision between player and level
        //this.physics.add.collider(this.obstacles, this.playerObject);
        //this.physics.add.collider(this.crates, this.playerObject);

        // initialize camera
        var camera = this.cameras.main;
        
        camera.startFollow(this.playerObject, false, 0.3, 0.3);
        camera.setZoom(4);
        camera.setBounds(350,350,800,500);
    }

    update(time, dTime) {

    }
}

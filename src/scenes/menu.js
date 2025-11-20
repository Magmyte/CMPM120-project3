export class Menu extends Phaser.Scene {

    constructor() {
        super({key: 'Menu'});

    }

    preload() {

        // tileset asset
        this.load.image('pixelPlatformerTiles', 'assets/kenney_pixel-platformer/Tilemap/tilemap.png');

        // map asset
        this.load.tilemapTiledJSON('tiles', 'assets/Maps/menu-cmpm-proj3.tmj');
    
    }

    create() {
        
        // grab size of screen
        const {width, height} = this.scale;

        // draw map
        this.menu = this.add.tilemap('tiles');
        var tileset = this.menu.addTilesetImage('tilemap', 'pixelPlatformerTiles');
        this.background = this.menu.createLayer("Background", tileset, 100, 100);
        this.level1select = this.menu.createLayer("level 1 select", tileset, 100, 100);
        this.level2select = this.menu.createLayer("level 2 select", tileset, 100, 100);
        let text = this.menu.getObjectLayer("text");

    }
    update(time, Dtime){
        
    }
}
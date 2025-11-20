export class Menu extends Phaser.Scene {

    constructor() {
        super({key: 'Menu'});

    }

    preload() {

        // map asset
        this.load.tilemapTiledJSON('menuTiles', 'assets/Maps/menu-cmpm-proj3.tmj');
    }

    create() {
        
        // draw map
        this.menu = this.add.tilemap('menuTiles');
        var tileset = this.menu.addTilesetImage('tilemap', 'pixelPlatformerTiles');
        this.background = this.menu.createLayer("Background", tileset, 100, 100);
        this.level1select = this.menu.createLayer("level 1 select", tileset, 100, 100);
        this.level2select = this.menu.createLayer("level 2 select", tileset, 100, 100);
        let text = this.menu.getObjectLayer("text");

    }
    update(time, Dtime){
        
    }
}
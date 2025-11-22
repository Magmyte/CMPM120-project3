import {Player} from '../gameobjects/player.js';

export class levelabby extends Phaser.Scene {

    constructor() {
        super({key: 'levelabby'});
    }

    preload() {

        // map asset
        this.load.tilemapTiledJSON('levelAbby', 'assets/Maps/level-abby.tmj');
        this.load.image('coin', 'assets/kenney_pixel-platformer/Tiles/tile_0180.png');
        this.load.image('crate', 'assets/kenney_pixel-platformer/Tiles/tile_0026.png');
        this.load.image('key', 'assets/kenney_pixel-platformer/Tiles/tile_0027.png');
        this.load.image('diamond', 'assets/kenney_pixel-platformer/Tiles/tile_0067.png');
        this.load.image('crate', 'assets/kenney_pixel-platformer/Tiles/tile_0026.png');
        this.load.image('grow', 'assets/kenney_pixel-platformer/Tiles/tile_0010.png');
        this.load.image('lock', 'assets/kenney_pixel-platformer/Tiles/tile_0028.png');
        this.load.image('bounce', 'assets/kenney_pixel-platformer/Tiles/tile_0107.png');
        this.load.image('shrink','assets/kenney_pixel-platformer/Tiles/tile_0011.png');
    }

    create() {
        
        // grab size of screen
        const {width, height} = this.scale;

        // draw map
        this.map = this.add.tilemap('levelAbby');
        this.keyFound = false;
        this.score = 0;
        this.messageDisplayed = false;
        var tileset = this.map.addTilesetImage('pixelPlatformerTilemapPacked', 'pixelPlatformerTilesPacked');
        var tileset2 = this.map.addTilesetImage('tileset-tiles', 'pixelPlatformerTilesPacked');
        this.background = this.map.createLayer("Background", tileset, 0, 0);
        this.obstacles = this.map.createLayer("Obstacles", tileset, 0, 0);

            this.interactableGroup = this.add.group("interactables");

            this.interactables = this.map.getObjectLayer("Interactable");
            if (this.interactables)
            {
                for (var obj of this.interactables.objects)
                {
                    if (obj.properties)
                    {
                        if (obj.properties[0].name == "type" && obj.properties[0].value)
                        {
                            let interactiveObject = this.physics.add.staticSprite(obj.x + 9, obj.y - 9, obj.properties[0].value);
                            interactiveObject.type = obj.properties[0].value;
                            this.interactableGroup.add(interactiveObject);
                        }
                    }
                }
            }
            this.obstacles.setCollisionBetween(1, 151);
            //this.crates.setCollisionBetween(1, 151);

            // initialize player object
            this.playerObject = new Player(this, 500, 260, 'characterSmallRight1');

            // set collision between player and level
            this.physics.add.collider(this.obstacles, this.playerObject);
            

        // initialize camera
        var camera = this.cameras.main;
        
        camera.startFollow(this.playerObject, false, 0.3, 0.3);
            camera.setZoom(4);

        //
    }

    update(time, dTime) {
        
         this.physics.world.overlap(this.playerObject, this.interactableGroup, (playerObject, interactables) =>
        {
            if(interactables.type ==  "coin"){
                interactables.destroy(true);
            }
            if (interactables.type == "bounce"){
                if(!this.playerObject.small)
                this.playerObject.body.setVelocityY(-750);
            }
            if (interactables.type == "crate"){
                if(!this.playerObject.small){
                    interactables.destroy(true);
                    this.playerObject.body.setVelocityY(0);
                }
            }
            if(interactables.type ==  "grow"){
                 this.playerObject.growFunction();
                this.playerObject.body.setVelocityX(70);
            }
            if(interactables.type ==  "shrink"){
                this.playerObject.shrinkFunction();
                this.playerObject.body.setVelocityX(50);
            }
            if(interactables.type == "key"){
                this.keyFound = true;
                interactables.destroy(true);
            }
            if(interactables.type == "lock"){
                if(this.keyFound == true && this.messageDisplayed == false){
                 this.winText = this.add.text(this.playerObject.x, this.playerObject.y, "wahoo youpi you did it!! :D");
                }
                else if (this.messageDisplayed == false){
                this.winText = this.add.text(this.playerObject.x, this.playerObject.y, "find the key...");
                }
                this.messageDisplayed = true;
                this.time.delayedCall(3000, ()=>
                {
                    this.winText.destroy(true);
                    this.messageDisplayed = false;
                });

            }
            

    })
    }
}

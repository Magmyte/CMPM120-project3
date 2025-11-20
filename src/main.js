import { Start } from './scenes/Start.js';
import { Menu } from './scenes/menu.js';
import { levelabby } from './scenes/levelabby.js';
import { levelCharles } from './scenes/levelCharles.js';

const config = {
    type: Phaser.AUTO,
    title: 'CMPM 120 Project 3',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                x: 0,
                y: 500
            },
            debug: true
        }
    },
    pixelArt: false,
    scene: [
        Start, levelabby, levelCharles, Menu
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            
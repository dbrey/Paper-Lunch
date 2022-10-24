import Boot from './src/src/scenes/boot.js'
import Day0 from './src/src/scenes/day0.js'
import CT from './src/src/libraries/constants.js'

let config = {
    type: Phaser.canvas,
    canvas: document.getElementById("game"),
    width: CT.gameWidth,
    height: CT.gameHeight,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
        min: {
            width:256,
            height:192,
        },
    },
    pixelArt: true,
    scene: [Boot, Day0],
    physics: { default: 'arcade', arcade: { debug: true } }
    };

new Phaser.Game(config);
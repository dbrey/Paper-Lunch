import Boot from './src/src/scenes/boot.js'
import Dia1 from './src/src/scenes/dia_default.js'
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
    scene: [Boot, Dia1],
    physics: { default: 'arcade', arcade: { debug: true } }
    };

new Phaser.Game(config);
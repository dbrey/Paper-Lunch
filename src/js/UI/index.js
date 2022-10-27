import Boot from '../scenes/boot.js'
import Dia1 from '../scenes/dia_default.js'
import menu from '../scenes/mainMenu.js'
import options from '../scenes/options.js'
import CT from '../libraries/constants.js'

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
    scene: [Boot, menu, Dia1,options],
    physics: { default: 'arcade', arcade: { debug: true } }
    };

new Phaser.Game(config);

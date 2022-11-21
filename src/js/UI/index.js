import Boot from '../scenes/boot.js'
import d_default from '../scenes/dia_default.js'
import dia1 from '../scenes/Dia1.js'
import menu from '../scenes/mainMenu.js'
import news from '../scenes/creatingNewspaper.js'
import pause from '../scenes/pauseMenu.js'
import options from '../scenes/options.js'
import tpMenu from '../scenes/tpMenu.js'

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

    scene: [Boot, menu,news, d_default, dia1 ,options,pause,tpMenu],

    physics: { default: 'arcade', arcade: { debug: true } }
    };

new Phaser.Game(config);

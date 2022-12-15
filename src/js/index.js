import Boot from './scenes/boot.js'
import d_default from './scenes/days/dia_default.js'
import dia1 from './scenes/days/Dia1.js'
import dia2 from './scenes/days/Dia2.js'
import dia3 from './scenes/days/Dia3.js'
import dia4 from './scenes/days/Dia4.js'
import dia5 from './scenes/days/Dia5.js'
import dia6 from './scenes/days/Dia6.js'
import dia7 from './scenes/days/Dia7.js'

import menu from './scenes/menus/mainMenu.js'
import news from './scenes/creatingNewspaper.js'
import pause from './scenes/menus/pauseMenu.js'
import options from './scenes/menus/options.js'
import tpMenu from './scenes/menus/tpMenu.js'
import win_lose from './scenes/win_lose.js'

import CT from './libraries/constants.js'

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

    scene: [Boot, menu,news, d_default, dia1, dia2, dia3, dia4, dia5, dia6, dia7, options,pause,tpMenu, win_lose],

    physics: { default: 'arcade', arcade: { debug: false } }
    };

new Phaser.Game(config);

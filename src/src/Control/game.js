import Boot from './boot.js';
import Day0F from '../Scenes/Days/Day0.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    width:  1280,
    height: 720,
    scale: {
        // mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot, Day0F],
    physics: { 
        default: 'arcade', 
        arcade: { 
            gravity: { y: 0 }, 
            debug: false 
        } 
    }
};

new Phaser.Game(config);
/**
 * Escena de fin de juego. Cuando se han recogido todas las estrellas, se presenta un
 * texto que indica que el juego se ha acabado.
 * Si se pulsa cualquier tecla, se vuelve a iniciar el juego.
 */
export default class MainMenu extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'mainMenu' });
  }

  /**
   * Creación de la escena. Tan solo contiene el texto que indica que el juego se ha acabado
   * @override
   */
  create() {
    this.add.text(250, 250, 'Esto es el menú principal')
        .setOrigin(0.5, 0.5)  // Colocamos el pivote en el centro de cuadro de texto 
        .setAlign('center');  // Centramos el texto dentro del cuadro de texto

    // Añadimos el listener para cuando se haya pulsado una tecla.
    
    this.input.keyboard.on('keydown', function (event) { 
      this.scene.start('level');
    }, this);
  }

}
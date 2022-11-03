export default class PauseMenu extends Phaser.Scene 
{
    constructor(lastScene) {
        super({key: 'pauseMenu'});
        this.lastSceneKey = lastScene;
    }

    create()
    {
        // Resume to level
      this.resumeButton = this.add.image(650,250, 'resumeButton').setInteractive();
      this.resumeButton.setScale(5);
      
      this.resumeButton.on('pointerdown', () => {this.resume()});
      this.resumeButton.on('pointerover', event => { this.resumeButton = this.add.image(650,250, 'resumeButtonMouseOn'); this.resumeButton.setScale(5);});
      this.resumeButton.on('pointerout', event => { this.resumeButton = this.add.image(650,250, 'resumeButton'); this.resumeButton.setScale(5);});

      // BOTON OPCIONES
      this.optionsbutton = this.add.image(650,400, 'optionsButton').setInteractive();
      this.optionsbutton.setScale(5);

      this.optionsbutton.on('pointerover', event => { this.optionsbutton = this.add.image(650,400, 'optionsButtonMouseOn'); this.optionsbutton.setScale(5);});
      this.optionsbutton.on('pointerout', event => { this.optionsbutton = this.add.image(650,400, 'optionsButton'); this.optionsbutton.setScale(5); });
      //this.optionsbutton.on("pointerdown",() => { this.scene.start('options')});
      
      // BOTON MENU
      this.menuButton = this.add.image(650, 550, 'menuButton').setInteractive();
      this.menuButton.setScale(5);

      this.menuButton.on('pointerdown', () => { this.scene.start('menu');});
      this.menuButton.on('pointerover', event => { this.menuButton = this.add.image(650,550, 'menuButtonMouseOn'); this.menuButton.setScale(5);});
      this.menuButton.on('pointerout', event => { this.menuButton = this.add.image(650,550, 'menuButton'); this.menuButton.setScale(5); });

    }

    resume(){

        //this.pauseBackGround.destroy();
        //this.exitButton.destroy();
        //resumeButton.destroy();
        //this.optionsbutton.destroy();
        //this.menuLayout.destroy();
        this.scene.resume('Dia1'); // Cambiar segun dia
      }
}
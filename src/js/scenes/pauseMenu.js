export default class PauseMenu extends Phaser.Scene 
{
    constructor(sceneName) {
        super({key: 'pauseMenu'});
    
    }

    init(data)
    {
      this.lastScene = data.sceneName;
    }

    create()
    {
      // Crear background
      this.backgroundPaper = this.add.image(650,350,'backgroundNewspaper');
      this.backgroundPaper.setScale(1.75);
      this.backgroundPaper.alpha = 0.5;

      this.backMain = this.add.sprite(650,400, 'backgroundOptionsPause');
      this.backMain.setScale(3.5,7);


        // Resume to level
      this.resumeButton = this.add.sprite(650,250, 'resumeButton').setInteractive();
      this.resumeButton.setScale(5);
      
      this.resumeButton.on('pointerdown', event => {this.resume()});
      this.resumeButton.on('pointerover', event => { this.resumeButton.setTexture('resumeButtonMouseOn'); this.resumeButton.setScale(5);});
      this.resumeButton.on('pointerout', event => { this.resumeButton.setTexture('resumeButton'); this.resumeButton.setScale(5);});

      // BOTON OPCIONES
      this.optionsbutton = this.add.sprite(650,400, 'optionsButton').setInteractive();
      this.optionsbutton.setScale(5);

      this.optionsbutton.on('pointerover', event => { this.optionsbutton.setTexture('optionsButtonMouseOn'); this.optionsbutton.setScale(5);});
      this.optionsbutton.on('pointerout', event => { this.optionsbutton.setTexture('optionsButton'); this.optionsbutton.setScale(5); });
      this.optionsbutton.on("pointerdown",() => {this.optionsPanel();} );

      // BOTON MENU
      this.menuButton = this.add.sprite(650, 550, 'menuButton').setInteractive();
      this.menuButton.setScale(5);

      this.menuButton.on('pointerdown',event => { this.scene.stop(this.lastScene); this.scene.start('menu');});
      this.menuButton.on('pointerover', event => { this.menuButton.setTexture('menuButtonMouseOn'); this.menuButton.setScale(5);});
      this.menuButton.on('pointerout', event => { this.menuButton.setTexture('menuButton'); this.menuButton.setScale(5); });
      

      // ---------------------- PANEL DE OPCIONES ---------------------- 
      // Background
      this.backgroundOptions = this.add.sprite(650,384, 'backgroundOptionsPause');
      this.backgroundOptions.setScale(6);

     
      // BOTON VOLVER AL MENU DE PAUSA
      this.goBack = this.add.sprite(925,550, 'goBackButton').setInteractive();
      this.goBack.setScale(2);
      this.goBack.on('pointerover', event => { this.goBack.setTexture('goBackButtonMouseOn'); this.goBack.setScale(2);});
      this.goBack.on('pointerout', event => { this.goBack.setTexture('goBackButton');this.goBack.setScale(2);});
      this.goBack.on("pointerdown", event => {this.goBackToPause();});

      // Pasamos todo a invisible
      this.goBack.setVisible(false);
      this.backgroundOptions.setVisible(false);

    }

    resume()
    {
        this.backgroundPaper.destroy();
        this.backMain.destroy();
        this.resumeButton.destroy();
        this.optionsbutton.destroy();
        this.menuButton.destroy()
        this.scene.resume(this.lastScene); // Cambiar segun dia
    }

    optionsPanel()
    {
      this.backgroundOptions.setVisible(true);
      this.goBack.setVisible(true);
    }

    goBackToPause()
    {
       this.backgroundOptions.setVisible(false);
      this.goBack.setVisible(false);
    }
}
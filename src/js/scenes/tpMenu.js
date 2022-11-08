import TP from "../TP/teleport.js";

export default class tpMenu extends Phaser.Scene 
{
    constructor(sceneName) {
        super({key: 'tpMenu'});
    
    }

    init(data)
    {
      this.lastScene = data.sceneName;

    }

    create()
    {
      
      // Crear background
      this.backgroundPaper = this.add.image(650,350,'backgroundNewspaper');
      this.backgroundPaper.setScale(1.7);
      this.backgroundPaper.alpha = 0.5;

      this.backMain = this.add.sprite(650,400, 'metroMap');
      this.backMain.setScale(0.5);

      this.resumeButton = this.add.sprite(650,75, 'resumeButton').setInteractive();
     this.resumeButton.setScale(5);
              
     this.resumeButton.on('pointerdown', event => {this.resume()});
     this.resumeButton.on('pointerover', event => { this.resumeButton.setTexture('resumeButtonMouseOn'); this.resumeButton.setScale(5);});
     this.resumeButton.on('pointerout', event => { this.resumeButton.setTexture('resumeButton'); this.resumeButton.setScale(5);});
     if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('E'))){
      this.resume();
     } 

    }

    resume()
    {
        this.backgroundPaper.destroy();
        this.backMain.destroy();
        this.resumeButton.destroy();
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
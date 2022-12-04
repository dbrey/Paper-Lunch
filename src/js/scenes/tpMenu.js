import CT from "../libraries/constants.js";

export default class tpMenu extends Phaser.Scene 
{
    constructor(sceneName) {
        super({key: 'tpMenu'});
    
    }

    init(data)
    {
      this.tp = data.TP;
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

     if(this.tp.tpID != 1){
      this.tp1Button = this.add.sprite(426, 200, 'selectionTp').setInteractive();
      this.tp1Button.setScale(0.5);
 
      this.tp1Button.on('pointerdown', event => { this.tp.teleport(CT.tp1x,CT.tp1y);this.resume();});
      this.tp1Button.on('pointerover', event =>{this.tp1Button.setTexture('selectionTpOn');});
      this.tp1Button.on('pointerout', event =>{this.tp1Button.setTexture('selectionTp');});
    }
    
     
    if(this.tp.tpID != 2){
     this.tp2Button = this.add.sprite(426, 576, 'selectionTp').setInteractive();
     this.tp2Button.setScale(0.5);

     this.tp2Button.on('pointerdown', event => {this.tp.teleport(CT.tp2x,CT.tp2y);this.resume();});
     this.tp2Button.on('pointerover', event =>{this.tp2Button.setTexture('selectionTpOn');});
     this.tp2Button.on('pointerout', event =>{this.tp2Button.setTexture('selectionTp');});
    }
    
    if(this.tp.tpID != 3){
     this.tp3Button = this.add.sprite(841, 631, 'selectionTp').setInteractive();
     this.tp3Button.setScale(0.5);

     this.tp3Button.on('pointerdown', event => {this.tp.teleport(CT.tp3x,CT.tp3y);this.resume();});
     this.tp3Button.on('pointerover', event =>{this.tp3Button.setTexture('selectionTpOn');});
     this.tp3Button.on('pointerout', event =>{this.tp3Button.setTexture('selectionTp');});
    }

    if(this.tp.tpID != 4){
     this.tp4Button = this.add.sprite(881, 256, 'selectionTp').setInteractive();
     this.tp4Button.setScale(0.5);

     this.tp4Button.on('pointerdown', event => {this.tp.teleport(CT.tp4x,CT.tp4y);this.resume();});
     this.tp4Button.on('pointerover', event =>{this.tp4Button.setTexture('selectionTpOn');});
     this.tp4Button.on('pointerout', event =>{this.tp4Button.setTexture('selectionTp');});
    }
    } 

    resume()
    {
      this.scene.run(this.lastScene);
      this.scene.stop();
        /*this.backgroundPaper.destroy();
        this.backMain.destroy();
        this.resumeButton.destroy();
        if(this.tp.tpID != 1){this.tp1Button.destroy();}
        if(this.tp.tpID != 2){this.tp2Button.destroy();}
        if(this.tp.tpID != 3){this.tp3Button.destroy();}
        if(this.tp.tpID != 4){this.tp4Button.destroy();}*/
        
         // Cambiar segun dia

        this.scene.stop();
    }
  }
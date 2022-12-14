import CT from '../../libraries/constants.js'

export default class PauseMenu extends Phaser.Scene 
{
    constructor(sceneName, player) {
        super({key: 'pauseMenu'});
    
    }

    init(data)
    {
      this.dayGame = data._scene;
      this.lastScene = data.sceneName;
      this.playerInfo= data.player;
    }

    create()
    {
      // Crear background
      this.backgroundPaper = this.add.image(600,350,'backgroundNewspaper');
      this.backgroundPaper.setScale(1.75);
      this.backgroundPaper.alpha = 0.5;

      this.backMain = this.add.sprite(400,400, 'backgroundOptionsPause');
      this.backMain.setScale(3.5,7);

      this.miniMapa = this.add.image(945, 312, 'miniMap');
      this.miniMapa.setScale(0.52);

      this.locator =this.add.image(950,300,'point').setScale(0.1);
      this.setPointInMap();

      this.leyenda = this.add.image(950, 650, 'leyenda');
      this.leyenda.setScale(0.5);

        // Resume to level
      this.resumeButton = this.add.sprite(400,250, 'resumeButton').setInteractive();
      this.resumeButton.setScale(5);
      
      this.resumeButton.on('pointerdown', event => {this.resume()});
      this.resumeButton.on('pointerover', event => { this.resumeButton.setTexture('resumeButtonMouseOn'); this.resumeButton.setScale(5);});
      this.resumeButton.on('pointerout', event => { this.resumeButton.setTexture('resumeButton'); this.resumeButton.setScale(5);});

      // BOTON OPCIONES
      this.optionsbutton = this.add.sprite(400,400, 'optionsButton').setInteractive();
      this.optionsbutton.setScale(5);

      this.optionsbutton.on('pointerover', event => { this.optionsbutton.setTexture('optionsButtonMouseOn'); this.optionsbutton.setScale(5);});
      this.optionsbutton.on('pointerout', event => { this.optionsbutton.setTexture('optionsButton'); this.optionsbutton.setScale(5); });
      this.optionsbutton.on("pointerdown",() => {this.changeOptionsPanel(true);} );

      // BOTON MENU
      this.menuButton = this.add.sprite(400, 550, 'menuButton').setInteractive();
      this.menuButton.setScale(5);

      this.menuButton.on('pointerdown',event => { this.dayGame.music.stop(); this.scene.stop(this.lastScene); 
        this.scene.start('menu', {_mainVolume: this.dayGame.mainVolume, _effectsVolume: this.dayGame.effectsVolume ,_continue: false, 
          _isMainMute: this.dayGame.isMainMute, _isEffectsMute: this.dayGame.isEffectsMute});});
      
      this.menuButton.on('pointerover', event => { this.menuButton.setTexture('menuButtonMouseOn'); this.menuButton.setScale(5);});
      this.menuButton.on('pointerout', event => { this.menuButton.setTexture('menuButton'); this.menuButton.setScale(5); });
      

      // ---------------------- PANEL DE OPCIONES ---------------------- 
      // Background
      this.backgroundOptions = this.add.sprite(400,384, 'backgroundOptionsPause');
      this.backgroundOptions.setScale(6);

     
      // BOTON VOLVER AL MENU DE PAUSA
      this.goBack = this.add.sprite(675,550, 'goBackButton').setInteractive();
      this.goBack.setScale(2);
      this.goBack.on('pointerover', event => { this.goBack.setTexture('goBackButtonMouseOn'); this.goBack.setScale(2);});
      this.goBack.on('pointerout', event => { this.goBack.setTexture('goBackButton');this.goBack.setScale(2);});
      this.goBack.on("pointerdown", event => {this.changeOptionsPanel(false);});

      // VOLUMEN PRINCIPAL
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //Mostrar texto volumen
        this.volMainText = this.add.text(450,260, this.dayGame.mainVolume, { fontSize: '50px', fill: '#fff' });
        this.mainText = this.add.text(75,260, "MUSIC ", { fontSize: '50px', fill: '#fff' });
        //Boton subir volumen
        this.upMainVolButton = this.add.sprite(575,280, 'UpVolV1').setInteractive();
        this.upMainVolButton.setScale(3);

        this.upMainVolButton.on('pointerover', event => { this.upMainVolButton.setTexture('UpVolV2'); this.upMainVolButton.setScale(3.5); });

        this.upMainVolButton.on('pointerout', event => { this.upMainVolButton.setTexture('UpVolV1'); this.upMainVolButton.setScale(3); });
    
        this.upMainVolButton.on("pointerdown", () => { 
            // Actualizar valor volumen musica
            this.dayGame.mainVolume += 1;
            this.volMainText.setText(this.dayGame.mainVolume);  // Actualizar texto segun volumen de la musica

            if(!this.dayGame.isMainMute) {this.dayGame.music.setVolume(this.dayGame.mainVolume);} // Si no esta muteado, entonces cambiamos el volumen de la cancion de fondo
        });

        //Boton bajar volumen
        this.downMainVolButton = this.add.sprite(350,280, 'DownVolV1').setInteractive();
        this.downMainVolButton.setScale(3);

        this.downMainVolButton.on('pointerover', event => { this.downMainVolButton.setTexture('DownVolV2'); this.downMainVolButton.setScale(3.5); });

        this.downMainVolButton.on('pointerout', event => { this.downMainVolButton.setTexture('DownVolV1'); this.downMainVolButton.setScale(3); });
    
        this.downMainVolButton.on("pointerdown", () => { 
            if(this.dayGame.mainVolume > 0)
            {        
                // Actualizar valor volumen musica
                this.dayGame.mainVolume -= 1;
                this.volMainText.setText(this.dayGame.mainVolume); // Actualizar texto segun volumen de la musica

                if(!this.dayGame.isMainMute) {this.dayGame.music.setVolume(this.dayGame.mainVolume);} // Si no esta muteado, entonces cambiamos el volumen de la cancion de fondo
            }
        });


        //Boton Mutear
        if(!this.dayGame.isMainMute) {this.muteMainButton = this.add.sprite(700,280, 'UnMute').setInteractive(); }
        else { this.muteMainButton = this.add.sprite(700,280, 'Mute').setInteractive(); }
        this.muteMainButton.setScale(3);

        this.muteMainButton.on('pointerover', event => { this.muteMainButton.setScale(3.5); });

        this.muteMainButton.on('pointerout', event => { this.muteMainButton.setScale(3); });
    
        this.muteMainButton.on("pointerdown", () => { 
            // Se cambia la textura segun si esta o no muteado. 
            if(this.dayGame.isMainMute) { 
                this.muteMainButton.setTexture('UnMute'); 
                this.dayGame.music.setVolume(this.dayGame.mainVolume); // Devolvemos el valor original del volumen
            }
            else { 
                this.muteMainButton.setTexture('Mute'); 
                this.dayGame.music.setVolume(0); // "Muteamos" la musica de fondo

            }
            this.dayGame.isMainMute = !this.dayGame.isMainMute;

        });
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        // VOLUMEN EFECTOS
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //Mostrar texto volumen
        this.volEffectsText = this.add.text(450,430,  this.dayGame.effectsVolume, { fontSize: '50px', fill: '#fff' })
        this.effectsText = this.add.text(75,430, "EFFECTS ", { fontSize: '50px', fill: '#fff' });

        //Boton subir volumen
        this.upEffectsVolButton = this.add.sprite(575,450, 'UpVolV1').setInteractive();
        this.upEffectsVolButton.setScale(3);

        this.upEffectsVolButton.on('pointerover', event => { this.upEffectsVolButton.setTexture('UpVolV2'); this.upEffectsVolButton.setScale(3.5); });

        this.upEffectsVolButton.on('pointerout', event => { this.upEffectsVolButton.setTexture('UpVolV1'); this.upEffectsVolButton.setScale(3); });
    
        this.upEffectsVolButton.on("pointerdown", () => { 
            this.dayGame.effectsVolume += 1;
            this.volEffectsText.setText( this.dayGame.effectsVolume);
            if(!this.dayGame.isEffectsMute) {
                this.dayGame.soldSound.setVolume( this.dayGame.effectsVolume);
                this.dayGame.numKeySound.setVolume( this.dayGame.effectsVolume);
            }            
        });

        //Boton bajar volumen
        this.downEffectsVolButton = this.add.sprite(350,450, 'DownVolV1').setInteractive();
        this.downEffectsVolButton.setScale(3);

        this.downEffectsVolButton.on('pointerover', event => { this.downEffectsVolButton.setTexture('DownVolV2'); this.downEffectsVolButton.setScale(3.5); });

        this.downEffectsVolButton.on('pointerout', event => { this.downEffectsVolButton.setTexture('DownVolV1'); this.downEffectsVolButton.setScale(3); });
    
        this.downEffectsVolButton.on("pointerdown", () => { 
            if( this.dayGame.effectsVolume > 0)
            {        
                this.dayGame.effectsVolume -= 1;
                this.volEffectsText.setText(this.dayGame.effectsVolume);

                if(!this.dayGame.isEffectsMute) {
                    this.dayGame.soldSound.setVolume( this.dayGame.effectsVolume);
                    this.dayGame.numKeySound.setVolume( this.dayGame.effectsVolume);
                }            

            }
        });

         //Boton Mutear
         if(!this.dayGame.isEffectsMute) {this.muteEffectsButton = this.add.sprite(700,450, 'UnMute').setInteractive();}
         else {this.muteEffectsButton = this.add.sprite(700,450, 'Mute').setInteractive(); }
         this.muteEffectsButton.setScale(3);
 
         this.muteEffectsButton.on('pointerover', event => { this.muteEffectsButton.setScale(3.5); });
 
         this.muteEffectsButton.on('pointerout', event => { this.muteEffectsButton.setScale(3); });
     
         this.muteEffectsButton.on("pointerdown", () => { 
             
            // Se cambia la textura segun si esta o no muteado. 
            if(this.dayGame.isEffectsMute) { 
                this.muteEffectsButton.setTexture('UnMute'); 
                this.dayGame.soldSound.setVolume( this.dayGame.effectsVolume); // Devolvemos el valor original del volumen
                this.dayGame.numKeySound.setVolume( this.dayGame.effectsVolume);
            }
            else { 
                this.muteEffectsButton.setTexture('Mute'); 
                // Aqui hay que hacer referencia a todos los efectos de sonido del juego tal que:
                // this.daygame.NOMBRE.setVolume(0);
                this.dayGame.soldSound.setVolume(0);
                this.dayGame.numKeySound.setVolume(0);

            }
            this.dayGame.isEffectsMute = !this.dayGame.isEffectsMute;
         });
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
      // Pasamos todo a invisible
      this.changeOptionsPanel(false);
    
}


    setPointInMap(){
        this.locator.x=((this.playerInfo.body.x/CT.mapWidth)*(this.miniMapa.width*0.5)+650);
        this.locator.y=((this.playerInfo.body.y/CT.mapHeight)*(this.miniMapa.height*0.5))
    }

    resume()
    {
        this.backgroundPaper.destroy();
        this.miniMapa.destroy();
        this.locator.destroy();
        this.backMain.destroy();
        this.resumeButton.destroy();
        this.optionsbutton.destroy();
        this.menuButton.destroy();
        this.leyenda.destroy();
        this.scene.resume(this.lastScene); 
    }

    changeOptionsPanel(bool)
    {
      this.backgroundOptions.setVisible(bool);
      this.goBack.setVisible(bool);

      this.volMainText.setVisible(bool);
      this.volEffectsText.setVisible(bool);
      this.mainText.setVisible(bool);
      this.effectsText.setVisible(bool);

      this.downMainVolButton.setVisible(bool);
      this.upMainVolButton.setVisible(bool);
      this.muteMainButton.setVisible(bool);
    
      this.downEffectsVolButton.setVisible(bool);
      this.upEffectsVolButton.setVisible(bool);
      this.muteEffectsButton.setVisible(bool);
    }

}
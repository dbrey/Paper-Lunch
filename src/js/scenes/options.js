export default class mainMenu extends Phaser.Scene 
{
    constructor() {
        super({ key: 'options' });
    }

    init(data)
    {
        this.mainMenu = data._scene;
        this.lastScene = data.sceneName;
        this.mainVolume = data._mainVolume;
        this.effectsVolume = data._effectsVolume;
    }

    create()
    {
        this.fondo = this.add.sprite(525, 325, 'optionsBackground');
        this.fondo.setScale(0.80);
        
        // VOLUMEN PRINCIPAL
        //-------------------------------------------------------
        //Mostrar texto volumen
        this.volMainText = this.add.text(795,160, this.mainVolume, { fontSize: '100px', fill: '#fff' });
        this.mainText = this.add.text(150,160, "MUSIC ", { fontSize: '100px', fill: '#fff' });
        //Boton subir volumen
        this.upMainVolButton = this.add.sprite(1000,200, 'UpVolV1').setInteractive();
        this.upMainVolButton.setScale(6);

        this.upMainVolButton.on('pointerover', event => { this.upMainVolButton.setTexture('UpVolV2'); this.upMainVolButton.setScale(6.5); });

        this.upMainVolButton.on('pointerout', event => { this.upMainVolButton.setTexture('UpVolV1'); this.upMainVolButton.setScale(6); });
    
        this.upMainVolButton.on("pointerdown", () => { 
            // Actualizar valor volumen musica
            this.mainVolume += 1;
            this.mainMenu.mainVolume = this.mainVolume;
            this.volMainText.setText(this.mainVolume);  // Actualizar texto segun volumen de la musica

            if(!this.mainMenu.isMainMute) {this.mainMenu.music.setVolume(this.mainVolume);} // Si no esta muteado, entonces cambiamos el volumen de la cancion de fondo
        });

        //Boton bajar volumen
        this.downMainVolButton = this.add.sprite(650,200, 'DownVolV1').setInteractive();
        this.downMainVolButton.setScale(6);

        this.downMainVolButton.on('pointerover', event => { this.downMainVolButton.setTexture('DownVolV2'); this.downMainVolButton.setScale(6.5); });

        this.downMainVolButton.on('pointerout', event => { this.downMainVolButton.setTexture('DownVolV1'); this.downMainVolButton.setScale(6); });
    
        this.downMainVolButton.on("pointerdown", () => { 
            if(this.mainVolume > 0)
            {        
                // Actualizar valor volumen musica
                this.mainVolume -= 1;
                this.mainMenu.mainVolume = this.mainVolume;
                this.volMainText.setText(this.mainVolume); // Actualizar texto segun volumen de la musica

                if(!this.mainMenu.isMainMute) {this.mainMenu.music.setVolume(this.mainVolume);} // Si no esta muteado, entonces cambiamos el volumen de la cancion de fondo
            }
        });


        //Boton Mutear
        if(!this.mainMenu.isMainMute) {this.muteMainButton = this.add.sprite(1200,200, 'UnMute').setInteractive(); }
        else { this.muteMainButton = this.add.sprite(1200,200, 'Mute').setInteractive(); }
        this.muteMainButton.setScale(6);

        this.muteMainButton.on('pointerover', event => { this.muteMainButton.setScale(6.5); });

        this.muteMainButton.on('pointerout', event => { this.muteMainButton.setScale(6); });
    
        this.muteMainButton.on("pointerdown", () => { 
            // Se cambia la textura segun si esta o no muteado. 
            if(this.mainMenu.isMainMute) { 
                this.muteMainButton.setTexture('UnMute'); 
                this.mainMenu.music.setVolume(this.mainVolume); // Devolvemos el valor original del volumen
            }
            else { 
                this.muteMainButton.setTexture('Mute'); 
                this.mainMenu.music.setVolume(0); // "Muteamos" la musica de fondo

            }
            this.mainMenu.isMainMute = !this.mainMenu.isMainMute;

        });
        //-------------------------------------------------------

        // VOLUMEN EFECTOS
        //-------------------------------------------------------
        //Mostrar texto volumen
        this.volEffectsText = this.add.text(795,360, this.effectsVolume, { fontSize: '100px', fill: '#fff' })
        this.effectsText = this.add.text(85,360, "EFFECTS ", { fontSize: '100px', fill: '#fff' });

        //Boton subir volumen
        this.upEffectsVolButton = this.add.sprite(1000,400, 'UpVolV1').setInteractive();
        this.upEffectsVolButton.setScale(6);

        this.upEffectsVolButton.on('pointerover', event => { this.upEffectsVolButton.setTexture('UpVolV2'); this.upEffectsVolButton.setScale(6.5); });

        this.upEffectsVolButton.on('pointerout', event => { this.upEffectsVolButton.setTexture('UpVolV1'); this.upEffectsVolButton.setScale(6); });
    
        this.upEffectsVolButton.on("pointerdown", () => { 
            this.effectsVolume += 1;
            this.mainMenu.effectsVolume = this.effectsVolume;
            this.volEffectsText.setText(this.effectsVolume);
            if(!this.mainMenu.isEffectsMute) {this.mainMenu.clickSound.setVolume(this.effectsVolume);}            
        });

        //Boton bajar volumen
        this.downEffectsVolButton = this.add.sprite(650,400, 'DownVolV1').setInteractive();
        this.downEffectsVolButton.setScale(6);

        this.downEffectsVolButton.on('pointerover', event => { this.downEffectsVolButton.setTexture('DownVolV2'); this.downEffectsVolButton.setScale(6.5); });

        this.downEffectsVolButton.on('pointerout', event => { this.downEffectsVolButton.setTexture('DownVolV1'); this.downEffectsVolButton.setScale(6); });
    
        this.downEffectsVolButton.on("pointerdown", () => { 
            if(this.effectsVolume > 0)
            {        
                this.effectsVolume -= 1;
                this.volEffectsText.setText(this.effectsVolume);
                this.mainMenu.effectsVolume = this.effectsVolume;

                if(!this.mainMenu.isEffectsMute) {this.mainMenu.clickSound.setVolume(this.effectsVolume);}            

            }
        });

         //Boton Mutear
         if(!this.mainMenu.isEffectsMute) {this.muteEffectsButton = this.add.sprite(1200,400, 'UnMute').setInteractive();}
         else {this.muteEffectsButton = this.add.sprite(1200,400, 'Mute').setInteractive(); }
         this.muteEffectsButton.setScale(6);
 
         this.muteEffectsButton.on('pointerover', event => { this.muteEffectsButton.setScale(6.5); });
 
         this.muteEffectsButton.on('pointerout', event => { this.muteEffectsButton.setScale(6); });
     
         this.muteEffectsButton.on("pointerdown", () => { 
             
            // Se cambia la textura segun si esta o no muteado. 
            if(this.mainMenu.isEffectsMute) { 
                this.muteEffectsButton.setTexture('UnMute'); 
                this.mainMenu.clickSound.setVolume(this.effectsVolume); // Devolvemos el valor original del volumen
            }
            else { 
                this.muteEffectsButton.setTexture('Mute'); 
                this.mainMenu.clickSound.setVolume(0); // "Muteamos" la musica de fondo

            }
            this.mainMenu.isEffectsMute = !this.mainMenu.isEffectsMute;
         });

        //-------------------------------------------------------
        // BOTON VOLVER AL MENU
        this.menubutton = this.add.sprite(1100,665, 'goBackButton').setInteractive();
        this.menubutton.setScale(4);
        
        // Si el raton esta encima del boton
        this.menubutton.on('pointerover', event => 
        {
            this.menubutton.setTexture('goBackButtonMouseOn');
            this.menubutton.setScale(4.25);
        });

        // Si el raton sale fuera del boton
        this.menubutton.on('pointerout', event => 
        {
            this.menubutton.setTexture('goBackButton');
            this.menubutton.setScale(4);

        });
    
        // Al hacer click en el boton
        this.menubutton.on("pointerdown", () => {
            this.mainMenu.clickSound.play(); this.resume();
        });
    }

    resume()
    {
        this.upMainVolButton.destroy();
        this.downMainVolButton.destroy();
        this.volMainText.destroy();
        this.mainText.destroy();
        this.muteMainButton.destroy();

        this.upEffectsVolButton.destroy();
        this.downEffectsVolButton.destroy();
        this.volEffectsText.destroy();
        this.effectsText.destroy();
        this.muteEffectsButton.destroy();

        this.fondo.destroy()
        this.menubutton.destroy();
        this.scene.resume(this.lastScene); 
    }
}
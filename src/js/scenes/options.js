export default class mainMenu extends Phaser.Scene 
{
    constructor() {
        super({ key: 'options' });
    }

    init(data)
    {
        this.mainMenu = data._scene;
        this.lastScene = data.sceneName;
        this.volume = data._volume;
    }

    create()
    {
        this.fondo = this.add.sprite(525, 325, 'optionsBackground');
        this.fondo.setScale(0.80);
        this.volume = 3.0;
        
        // Ajustamos el nivel general de sonido y el volumen de la cancion que suena
        this.mainMenu.volume = this.volume;
        this.mainMenu.music.setVolume(this.volume);

        //-------------------------------------------------------

        //Mostrar texto volumen
        this.volText = this.add.text(615,260, this.volume, { fontSize: '100px', fill: '#fff' })

        //Boton subir volumen
        this.upVolButton = this.add.sprite(950,300, 'UpVolV1').setInteractive();
        this.upVolButton.setScale(6);

        this.upVolButton.on('pointerover', event => { this.upVolButton.setTexture('UpVolV2'); this.upVolButton.setScale(6.5); });

        this.upVolButton.on('pointerout', event => { this.upVolButton.setTexture('UpVolV1'); this.upVolButton.setScale(6); });
    
        this.upVolButton.on("pointerdown", () => { 
            this.volume += 1;
            this.mainMenu.volume = this.volume;
            this.mainMenu.music.setVolume(this.volume);
            this.volText.setText(this.volume);
        });

        //Boton bajar volumen
        this.downVolButton = this.add.sprite(350,300, 'DownVolV1').setInteractive();
        this.downVolButton.setScale(6);

        this.downVolButton.on('pointerover', event => { this.downVolButton.setTexture('DownVolV2'); this.downVolButton.setScale(6.5); });

        this.downVolButton.on('pointerout', event => { this.downVolButton.setTexture('DownVolV1'); this.downVolButton.setScale(6); });
    
        this.downVolButton.on("pointerdown", () => { 
            if(this.volume > 0)
            {        
                this.volume -= 1;
                this.mainMenu.volume = this.volume;
                this.mainMenu.music.setVolume(this.volume);
                this.volText.setText(this.volume);

            }
        });

        

        //-------------------------------------------------------
        // BOTON VOLVER AL MENU
        this.menubutton = this.add.sprite(650,550, 'goBackButton').setInteractive();
        this.menubutton.setScale(6);
        
        // Si el raton esta encima del boton
        this.menubutton.on('pointerover', event => 
        {
            this.menubutton.setTexture('goBackButtonMouseOn');
            this.menubutton.setScale(6);
        });

        // Si el raton sale fuera del boton
        this.menubutton.on('pointerout', event => 
        {
            this.menubutton.setTexture('goBackButton');
            this.menubutton.setScale(6);

        });
    
        // Al hacer click en el boton
        this.menubutton.on("pointerdown", () => {
          this.resume();
        });
    }

    resume()
    {
        this.upVolButton.destroy();
        this.downVolButton.destroy();
        this.volText.destroy();
        this.fondo.destroy()
        this.menubutton.destroy();
        this.scene.resume(this.lastScene/*, {_volume: this.volume, _continue: true}*/); 
    }
}
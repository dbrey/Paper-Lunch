export default class mainMenu extends Phaser.Scene 
{
    constructor() {
        super({ key: 'options' });
    }

    init(data)
    {
        this.lastScene = data.sceneName;
        this.volume = data._volume;
    }

    create()
    {
        this.fondo = this.add.sprite(525, 325, 'optionsBackground');
        this.fondo.setScale(0.80);
        this.volume = 5.0;
        // BOTON VOLVER AL MENU
        this.menubutton = this.add.sprite(650,350, 'goBackButton').setInteractive();
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
        this.fondo.destroy()
        this.menubutton.destroy();
        this.scene.resume(this.lastScene, {_volume: this.volume, _continue: true}); 
    }
}
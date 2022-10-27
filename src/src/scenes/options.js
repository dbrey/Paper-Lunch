export default class mainMenu extends Phaser.Scene 
{
    constructor() {
        super({ key: 'options' });
    }

    create()
    {
        // BOTON VOLVER AL MENU
        this.menubutton = this.add.image(650,350, 'goBackButton').setInteractive();
        this.menubutton.setScale(6);
        
        // Si el raton esta encima del boton
        this.menubutton.on('pointerover', event => 
        {
            this.menubutton = this.add.image(650,350, 'goBackButtonMouseOn');
            this.menubutton.setScale(6);
        });

        // Si el raton sale fuera del boton
        this.menubutton.on('pointerout', event => 
        {
            this.menubutton = this.add.image(650,350, 'goBackButton');
            this.menubutton.setScale(6);

        });
    
        // Al hacer click en el boton
        this.menubutton.on("pointerdown", () => {
          this.scene.start('menu');
        });
    }

}
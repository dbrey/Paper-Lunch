export default class mainMenu extends Phaser.Scene 
{
    constructor() {
        super({ key: 'menu' });
    }

    create()
    {
        this.anims.create ({
            key: 'menu',
            frames: this.anims.generateFrameNumbers('mainmenu', { start: 0, end: 47}),
            frameRate: 25,
            repeat: -1
          }); 
        
        this.fondo = this.add.sprite(525, 300, 'mainmenu');
        this.fondo.anims.play('menu');
        this.fondo.setScale(3.25);

        this.logo = this.add.image(650,200, 'logo');
        this.logo.setScale(0.2);

        // BOTON PLAY
        this.playbutton = this.add.sprite(650,450, 'playButton').setInteractive();
        this.playbutton.setScale(6);
        
        // Si el raton esta encima del boton
        this.playbutton.on('pointerover', event => { this.playbutton.setTexture('playButtonMouseOn'); this.playbutton.setScale(6); });

        // Si el raton sale fuera del boton
        this.playbutton.on('pointerout', event => { this.playbutton.setTexture('playButton'); this.playbutton.setScale(6); });
    
        // Al hacer click en el boton
        this.playbutton.on("pointerdown", () => { this.scene.start('Dia1'); });

        // BOTON OPCIONES
        this.optionsbutton = this.add.sprite(650,600, 'optionsButton').setInteractive();
        this.optionsbutton.setScale(6);

        // Si el raton esta encima del boton
        this.optionsbutton.on('pointerover', event => { this.optionsbutton.setTexture('optionsButtonMouseOn'); this.optionsbutton.setScale(6);});

        // Si el raton sale fuera del boton
        this.optionsbutton.on('pointerout', event => { this.optionsbutton.setTexture('optionsButton'); this.optionsbutton.setScale(6); });

        // Al hacer click en el boton
        this.optionsbutton.on("pointerdown",() => { this.scene.start('options')});

    }
}
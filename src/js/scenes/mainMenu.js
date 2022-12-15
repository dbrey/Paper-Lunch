export default class mainMenu extends Phaser.Scene 
{
    constructor() {
        super({ key: 'menu' });
    }

    init(data)
    {
        this.mainVolume = data._mainVolume;
        this.effectsVolume = data._effectsVolume;        
        this.continueSong = data._continue;
        this.isMainMute = data._isMainMute;
        this.isEffectsMute = data._isEffectsMute;
    }

    create()
    {
          this.anims.create ({
            key: 'menu',
            frames: this.anims.generateFrameNumbers('mainmenu', { start: 0, end: 94}),
            frameRate: 25,
            repeat: -1
          }); 
        
        //------------------------------------------------------------------------

        //  SONIDO
        //------------------------------------------------------------------------
        if(this.isMainMute) { this.music = this.sound.add('mainMenuSoundtrack', {volume: 0}, {loop: true}); }
        else { this.music = this.sound.add('mainMenuSoundtrack', {volume: this.mainVolume}, {loop: true}); }

        if(this.isEffectsMute) { this.clickSound = this.sound.add('click', {volume: 0}, {loop: false}); }
        else { this.clickSound = this.sound.add('click', {volume: this.effectsVolume}, {loop: false});}

        if(!this.continueSong) {this.music.play();}

        this.fondo = this.add.sprite(640, 360, 'mainmenu');
        this.fondo.anims.play('menu');
        this.fondo.setScale(4);

        this.logo = this.add.image(650,200, 'logo');
        this.logo.setScale(0.2);

        // BOTON PLAY
        this.playbutton = this.add.sprite(650,450, 'playButton').setInteractive();
        this.playbutton.setScale(4);
        
        // Si el raton esta encima del boton
        this.playbutton.on('pointerover', event => { this.playbutton.setTexture('playButtonMouseOn'); this.playbutton.setScale(5); });

        // Si el raton sale fuera del boton
        this.playbutton.on('pointerout', event => { this.playbutton.setTexture('playButton'); this.playbutton.setScale(4); });
    
        // Al hacer click en el boton
        this.playbutton.on("pointerdown", () => { this.clickSound.play(); this.music.stop(); this.scene.start('createNewspaper', 
        {diaActual: 'PrimerDia',_nDay: 0, _money: 50, _confianza: [0,0,0,0], 
         _mainVolume: this.mainVolume, _effectsVolume: this.effectsVolume, _isMainMute: this.isMainMute, _isEffectsMute: this.isEffectsMute, _continueSong: false}); });

        // BOTON OPCIONES
        this.optionsbutton = this.add.sprite(650,600, 'optionsButton').setInteractive();
        this.optionsbutton.setScale(4);

        // Si el raton esta encima del boton
        this.optionsbutton.on('pointerover', event => { this.optionsbutton.setTexture('optionsButtonMouseOn'); this.optionsbutton.setScale(5);});

        // Si el raton sale fuera del boton
        this.optionsbutton.on('pointerout', event => { this.optionsbutton.setTexture('optionsButton'); this.optionsbutton.setScale(4); });

        // Al hacer click en el boton
        this.optionsbutton.on("pointerdown",() => {this.scene.launch("options",{_scene: this, sceneName: "menu"});
    });

    }

    
}
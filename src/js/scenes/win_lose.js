export default class win_lose extends Phaser.Scene {

    constructor() {
        super({ key: 'win_lose' });
    }

    init(data)
    {
        this.win = data._win;
        this.mainVolume = data._mainVolume; // Volumen musica
        this.effectsVolume = data._effectsVolume // Volumen efectos
        this.isMainMute = data._isMainMute; // Booleano si esta la musica muteada
        this.isEffectsMute = data._isEffectsMute; // Booleano si estan los efectos muteados 
    }

    create() 
    {
        this.Background=this.add.image(640,360,'BackgroundP');
        this.Background.setScale(0.625,0.3511);

        // Texto ganaste o perdiste
        if(this.win){ 
            this.message = this.add.text(130, 160, 'Felicidades!', {fontSize: '150px', fill: '#000'}); 
            this.message2 = this.add.text(130, 360, 'Ya tienes suficiente dinero para', {fontSize: '55px', fill: '#000'}); 
            this.message3 = this.add.text(200, 425, 'construir tu propia editorial!', {fontSize: '50px', fill: '#000'}); 
        }
        else { 
        this.message = this.add.text(200, 160, 'Que pena!', {fontSize: '175px', fill: '#000'}); 
        this.message2 = this.add.text(145, 360, 'No conseguiste suficientes fondos', {fontSize: '50px', fill: '#000'}); 
        }
        
        // Boton de ir al menu
        this.menuButton = this.add.sprite(650, 600, 'menuButton').setInteractive();
        this.menuButton.setScale(5);

        this.menuButton.on('pointerdown',event => { this.scene.start('menu', {_mainVolume: this.mainVolume, _effectsVolume: this.effectsVolume ,_continue: false, 
          _isMainMute: this.isMainMute, _isEffectsMute: this.isEffectsMute});});
      
        this.menuButton.on('pointerover', event => { this.menuButton.setTexture('menuButtonMouseOn'); this.menuButton.setScale(5);});
        this.menuButton.on('pointerout', event => { this.menuButton.setTexture('menuButton'); this.menuButton.setScale(5); });

    }

    update() {
        
    }

}
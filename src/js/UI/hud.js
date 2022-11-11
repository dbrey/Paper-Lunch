import CT from '../libraries/constants.js'
export default class HUD extends Phaser.GameObjects.Text{
    constructor(scene, player){
        super(scene);
        scene.add.existing(this);
        
        //Variables
        this.myPlayer = player;
        this.newspaper = scene.add.image(CT.gameWidth - 385, CT.gameHeight - 220, 'newspaperImg').setScrollFactor(0);
        this.newspaper.displayWidth = 50;
        this.newspaper.displayHeight = 30;

        this.coin =scene.add.image(CT.gameWidth - 498,CT.gameHeight - 220, 'coinImg').setScrollFactor(0);
        this.coin.displayWidth = 30;
        this.coin.displayHeight = 30;

        this.newsPaperText = this.scene.add.text(CT.gameWidth - 360, CT.gameHeight - 232.5, ": " + this.myPlayer.periodicos).setScrollFactor(0);
        this.newsPaperText.setAlign('center');
        this.newsPaperText.setFont('Arial Black');
        this.newsPaperText.setFontSize(26);
        this.coinPaperText = this.scene.add.text(CT.gameWidth - 480, CT.gameHeight - 232.5, ": " + this.myPlayer.dinero + "$").setScrollFactor(0);
        this.coinPaperText.setAlign('center');
        this.coinPaperText.setFont('Arial Black');
        this.coinPaperText.setFontSize(26);


        this.activeBarra =scene.add.sprite(CT.gameWidth -400 , 2000, 'BarraRoja').setScrollFactor(0);
        this.activeBarra.setScale(0.3);

    }

    //Metodos para mostrar actualizar los valores correspondientes
    updateNumPeriodicos()
    {
        this.newsPaperText.setText(": " + this.myPlayer.periodicos)
        this.coinPaperText.setText(": " + this.myPlayer.dinero + "$");
    }

    updateDinero()
    {
        this.dinero = this.myPlayer.getDinero();
        this.coinstxt = ': ' + this.dinero;
    }

    actualizaBarra(barrio){
        
        if(barrio == 0)this.activeBarra.setTexture('BarraRoja')
        else if(barrio == 1)this.activeBarra.setTexture('BarraAzul')
        else if(barrio == 2)this.activeBarra.setTexture('BarraAmarilla')
        else if(barrio == 3)this.activeBarra.setTexture('BarraAmarilla')

    }

}
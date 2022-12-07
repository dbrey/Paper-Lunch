import CT from '../libraries/constants.js'
export default class HUD extends Phaser.GameObjects.Text{
    constructor(scene, player){
        super(scene);
        scene.add.existing(this);
        
        //Variables
        this.cuadroHUD = scene.add.image(CT.gameWidth - 360, CT.gameHeight - 210, 'cuadroHUD').setScrollFactor(0);
        this.cuadroHUD.setScale(0.8);

        this.reloj = scene.add.image(CT.gameWidth - 370, CT.gameHeight - 522, 'cuadroTemp').setScrollFactor(0);
        this.reloj.setScale(0.7, 0.35);

        this.myPlayer = player;
        this.newspaper = scene.add.image(CT.gameWidth - 377, CT.gameHeight - 226, 'newspaperImg').setScrollFactor(0);
        this.newspaper.displayWidth = 40;
        this.newspaper.displayHeight = 25;

        this.coin =scene.add.image(CT.gameWidth - 380, CT.gameHeight - 195, 'coinImg').setScrollFactor(0);
        this.coin.displayWidth = 25;
        this.coin.displayHeight = 25;

        this.newsPaperText = this.scene.add.text(CT.gameWidth - 358, CT.gameHeight - 234, ": " + this.myPlayer.periodicos).setScrollFactor(0);
        this.newsPaperText.setAlign('center');
        this.newsPaperText.setFont('Arial Black');
        this.newsPaperText.setFontSize(17);
        this.coinPaperText = this.scene.add.text(CT.gameWidth - 367, CT.gameHeight - 204, ": " + this.myPlayer.dinero + "$").setScrollFactor(0);
        this.coinPaperText.setAlign('center');
        this.coinPaperText.setFont('Arial Black');
        this.coinPaperText.setFontSize(17);

    }

    //Metodos para mostrar actualizar los valores correspondientes
    updateNumPeriodicos()
    {
        this.newsPaperText.setText(": " + this.myPlayer.periodicos)
        
    }

    updateDinero()
    {
        this.coinPaperText.setText(": " + this.myPlayer.dinero + "$");
    }

}
import CT from '../libraries/constants.js'
export default class HUD extends Phaser.GameObjects.Text{
    constructor(scene, player){
        super(scene);
        scene.add.existing(this);
        
        //Variables
        this.myPlayer = player;
        this.newspaper = scene.add.image(CT.gameWidth - 100, CT.gameHeight - 50, 'newspaperImg').setScrollFactor(0);
        this.newspaper.setScale(0.05);
        this.coin =scene.add.image(CT.gameWidth - 230, CT.gameHeight - 45, 'coinImg').setScrollFactor(0);
        this.coin.setScale(0.13);
        this.numNewspaper = 0;
        this.dinero = 0;
        this.newstxt = '';
        this.coinstxt = '';

    }

    //Metodos para mostrar actualizar los valores correspondientes
    updateNumPeriodicos()
    {
        this.numNewspaper = this.myPlayer.numeroPeriodicos();
        this.newstxt = ': ' + this.numNewspaper;
    }

    updateDinero()
    {
        this.dinero = this.myPlayer.getDinero();
        this.coinstxt = ': ' + this.dinero;
    }

    preupdate(t,d)
    {
        //super.update(t, d);
        //Actualizamos los valores
        this.updateNumPeriodicos(),
        this.updateDinero();
        //Escribimos el texto
        
        this.Text = this.scene.add.text(CT.gameWidth - 60, CT.gameHeight - 50, this.newstxt).setScrollFactor(0);
        this.Text = this.scene.add.text(CT.gameWidth - 200, CT.gameHeight - 50, this.coinstxt).setScrollFactor(0);
    }
}
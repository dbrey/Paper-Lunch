import CT from "../libraries/constants.js";

export default class Temporizador extends Phaser.GameObjects.GameObject {

    constructor(scene) {
        super(scene)
        this.scene.add.existing(this);

        this.temporizador = 0;
        this.horas=8;
        this.minutos=0;
        this.minutosTranscurridos = 0;

        this.tiempoTranscurrido = this.horas + ' : '+ this.minutos;
        this.text = this.scene.add.text(CT.gameWidth - 407, CT.gameHeight - 537,this.tiempoTranscurrido);
        this.text.setScrollFactor(0);
        this.text.setAlign('center');
        this.text.setFont('Arial Black');
        this.text.setFontSize(27);


        this.horaFinJornada = 8;
        
    }

    preUpdate(t, dt) {
        this.text.setText( this.tiempoTranscurrido);
        this.minutosTranscurridos+=Math.round(dt);
        if((this.minutosTranscurridos/600) >100)
        {
          this.minutosTranscurridos=0;
          this.horas+=1;
        }
        if(this.minutosTranscurridos<10000){ 
          if(this.minutosTranscurridos<1000){
            this.tiempoTranscurrido =  this.horas + ' : 00';
          }
          else {
            this.minutosTranscurridosReales=this.minutosTranscurridos.toString().substring(0,1);
            this.tiempoTranscurrido =  this.horas + ' : 0' + this.minutosTranscurridosReales.toString().substring(0,1);
          }
        }
        else {
          this.minutosTranscurridosReales=this.minutosTranscurridos.toString().substring(0,2);
          this.tiempoTranscurrido =  this.horas + ' : ' + this.minutosTranscurridosReales.toString().substring(0,2);
        }


        if(this.horas >= this.horaFinJornada)
          this.scene.finDia();

      }

}
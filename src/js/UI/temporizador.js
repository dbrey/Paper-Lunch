import CT from "../libraries/constants.js";

export default class Temporizador extends Phaser.GameObjects.GameObject {

    constructor(scene) {
        super(scene)
        this.scene.add.existing(this);

        this.temporizador = 0;
        //hora de inicio
        this.horas=8;
        //minutos de inicio
        this.minutos=0;
        this.minutosTranscurridos = 0;

        //Texto de tiempo
        this.tiempoTranscurrido = this.horas + ' : '+ this.minutos;
        this.text = this.scene.add.text(CT.gameWidth - 407, CT.gameHeight - 537,this.tiempoTranscurrido);
        this.text.setScrollFactor(0);
        this.text.setAlign('center');
        this.text.setFont('Arial Black');
        this.text.setFontSize(27);


        //Hora de final del juego
        this.horaFinJornada = 13;
        
    }

    preUpdate(t, dt) {
        this.text.setText( this.tiempoTranscurrido);
        this.minutosTranscurridos+=Math.round(dt);
        
        //Si los minutos superan los 60
        if((this.minutosTranscurridos/600) >100)
        {
          //se suma una hora
          this.minutosTranscurridos=0;
          this.horas+=1;
        }
        
        //Si tienes menos de 10 minutos
        if(this.minutosTranscurridos<10000){ 
          //si tienes menos de 1 minuto
          if(this.minutosTranscurridos<1000){
            //Se ponen dos 0s
            this.tiempoTranscurrido =  this.horas + ' : 00';
          }
          else {
            //Se pone un solo 0
            this.minutosTranscurridosReales=this.minutosTranscurridos.toString().substring(0,1);
            this.tiempoTranscurrido =  this.horas + ' : 0' + this.minutosTranscurridosReales.toString().substring(0,1);
          }
        }
        else {
          this.minutosTranscurridosReales=this.minutosTranscurridos.toString().substring(0,2);
          this.tiempoTranscurrido =  this.horas + ' : ' + this.minutosTranscurridosReales.toString().substring(0,2);
        }
        
        //Si las horas son mayores que el fin de jornada
        if(this.horas >= this.horaFinJornada)
          this.scene.finDia();

      }

}
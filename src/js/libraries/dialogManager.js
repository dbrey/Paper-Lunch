import CT from "./constants.js";

export default class dialogManager extends Phaser.GameObjects.Text {

    constructor(scene,x,y){

        super(scene,x,y);
        this.scene.add.existing(this);

        this.setWordWrapWidth(CT.wordWrapWidth);
        this.setLineSpacing(CT.lineSpacing);
        this.setFontSize(CT.dialogFontSize);

        this.waitingPlayer=false;
        this.writting = false;
        this.dialog;
        this.index = 0; //Comienza escribiendo por la primera letra del string dialog
        this.interval = CT.interval;

    }

    updateDialog(){
        if(this.index > this.dialog.length -1){
            //Reseteamos el texto 
            this.resetText();
            this.waitingPlayer = true;
        }
        else {
            this._text+=this.dialog[this.index];
            this.index++;
            this.updateText();
        }
    }
    
    //Cambia la posición para que se vea por pantalla ya que el jugador se va moviendo y no siempre está en la misma posicion
    updatePosition(x,y){
        this.x = x;
        this.y = y;
    }
    
    finishWrittting(){
        // Si el player pulsa la tecla para continuar antes de que se haya escrito todo el texto
        // se escribirá automáticamente todo el texto
        this._text = this.dialog;
        this.waitingPlayer = true;
        this.updateText();
        this.resetText();
    }

    startWritting(dialog){
        this.dialog=dialog;
        this.writting = true;
    }

    resetText(){
        this.dialog = '';
        this._text = this.dialog;
        this.dialogWritted=this.dialog;
        this.index=0;
        this.writting = false;
    }

    //Metodo que se llamará cuando el jugador haya pulsado para continuar si el diálogo ya se ha terminado
    clearText(){
        this.waitingPlayer=false;
        this.updateText();
    }
}
export default class dialogue extends Phaser.GameObjects.Text {
	constructor(scene, x, y, width, text){
		super(scene,x,y);
		this.scene.add.existing(this);
		this.UpdatingText = text; 
		this.timePerChar = 40; 
		this.writing = false; 
		this.letterPos = 0; // Indica la posicion actual de la letra que va a escribir

		this.setWordWrapWidth(width); //Indica cuando hace el salto de linea
		this.setLineSpacing(15); // Indica el espaciado entre lineas
		this.setFontSize(20);
		
	}

    setIntervalPerLetter(time){
        this.timePerChar = time;
    }

    checkText(){
        if(this.UpdatingText.length<= this.pos){
            this.writing = false;
            this.CharPos = 0;
            return;
        }
    }

    writeText(){
        this.checkText();
        let char = this.UpdatingText.charAt(this.CharPos)
        this.text+= char;
        this.add.text(878, 125, text, { fontSize: '64px', fill: '#000' });
        this.updateText;
        this.CharPos++; 
    }

    fullTextDisplay(){
        this.UpdatingText =  this.FullText;
        this.updateText();
    }

    clear(){
        this.UpdatingText = '';
        this.FullText = '';
        this.writing = false;
        this.pos = 0;
        this.updateText();
    }

    
} 


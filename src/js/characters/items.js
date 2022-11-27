//Clase Periodico
export class Newspaper{
    constructor(scene, _title, _posX, _posY, _imgId, _trust){
        //super(scene);
        scene.add.existing(this);
        this._myS = scene;
        this.title = _title;
        this.selected = false;
        this.x = _posX;
        this.y = _posY;
        this.button = scene.add.image(_posX, _posY, _imgId).setInteractive();
        this.button.setScale(0.25, 0.2);

        //Imagen de tick (para indicar si esta seleccionado o no)
        this.tick = scene.add.image(_posX + 110, _posY + 90, 'tick');
        this.tick.setScale(0.01);
        this.tick.alpha = 0;
        
        //Imagenes de cada distrito
        this.esp = scene.add.image(_posX - 75, _posY - 25, 'simEsp').setScale(0.04);
        this.veg = scene.add.image(_posX + 20, _posY - 25, 'simVeg').setScale(0.04);
        this.ita = scene.add.image(_posX - 75, _posY + 50, 'simIta').setScale(0.04);
        this.jap = scene.add.image(_posX + 20, _posY + 50, 'simJap').setScale(0.04);

        //Numeros para la confianza de cada distrito
        this.trust =_trust;
        this.setTrustTexts(_posX, _posY, _trust);

        //Eventos del boton
        this.button.on('pointerdown', () => {
            if (!this.selected){                        //Si no soy un periodico seleccionado
                if (!scene.getTitleSelected()){         //Y no hay ningun periodico seleccionado 
                    this.selected = true;               //Me selecciono
                    this.tick.alpha = 1;
                    scene.changeTitleSelected(true);    //Informo de que hay un periodico seleccionado
                }
            }
            else {                                      //Si estoy seleccionado
                if (scene.getTitleSelected()) {         //Y hay un periodico seleccionado (esto me indica que soy yo)
                    this.selected = false;              //Ya no estoy seleccionado
                    this.tick.alpha = 0;
                    scene.changeTitleSelected(false);   //Informo de que ya no hay ningun periodico seleccionado
                }
            }
        })
        this.button.on('pointerover', () => {
            if(!this.selected && !scene.getTitleSelected()) 
            {
                this.button.setScale(0.3,0.25);
                this.setDistrictImages(true);
                this.updateTrustTexts(true);
            }
        });
        this.button.on('pointerout', () => { 
            if(!this.selected && !scene.getTitleSelected()) 
            {
                this.button.setScale(0.25, 0.2);
                this.setDistrictImages(false);
                this.updateTrustTexts(false);
            }
        });
    }

    setDistrictImages(value)
    {
        if (value)
        {
            
            //Posiciones
            this.esp.setPosition(this.x - 90, this.y - 30);
            this.veg.setPosition(this.x + 40, this.y - 30);
            this.ita.setPosition(this.x - 90, this.y + 60);
            this.jap.setPosition(this.x + 40, this.y + 60);
            
            //Tamaños
            this.esp.setScale(0.06);
            this.veg.setScale(0.06);
            this.ita.setScale(0.06);
            this.jap.setScale(0.06);
        }

        else
        {
            //Posiciones
            this.esp.setPosition(this.x - 75, this.y - 25);
            this.veg.setPosition(this.x + 20, this.y - 25);
            this.ita.setPosition(this.x - 75, this.y + 50);
            this.jap.setPosition(this.x + 20, this.y + 50);
            

            //Tamaños
            this.esp.setScale(0.04);
            this.veg.setScale(0.04);
            this.ita.setScale(0.04);
            this.jap.setScale(0.04);
        }
    }

    getTitle(){
        return this.title;
    }
/*
    moveTrustValors(value)
    {
        this._myS.updateTrustTexts(value);
    }*/

    updateTrustTexts(value)
    {
        if(value) {
            this.espN.setPosition(this.x - 65, this.y - 50);
            this.vegN.setPosition(this.x + 70, this.y - 50);
            this.itaN.setPosition(this.x - 65, this.y + 40);
            this.japN.setPosition(this.x + 70, this.y + 40);

            this.espN.setFontSize(50);
            this.vegN.setFontSize(50);
            this.itaN.setFontSize(50);
            this.japN.setFontSize(50);
        }

        else{
            this.espN.setPosition(this.x - 60, this.y - 45);
            this.vegN.setPosition(this.x + 40, this.y - 45);
            this.itaN.setPosition(this.x - 60, this.y + 30);
            this.japN.setPosition(this.x + 40, this.y + 30);

            this.espN.setFontSize(40);
            this.vegN.setFontSize(40);
            this.itaN.setFontSize(40);
            this.japN.setFontSize(40);
        }
    }

    setTrustTexts(x, y, trust){

        this.espN = ':' + trust[0];
        this.vegN = ':' + trust[1];
        this.itaN = ':' + trust[2];
        this.japN = ':' + trust[3];

        this.espN = this._myS.add.text(x - 60, y - 45, this.espN, {fontSize: '40px', fill: '#000'});
        this.vegN = this._myS.add.text(x + 40, y - 45, this.vegN, {fontSize: '40px', fill: '#000'});
        this.itaN = this._myS.add.text(x - 60, y + 30, this.itaN, {fontSize: '40px', fill: '#000'});
        this.japN = this._myS.add.text(x + 40, y + 30, this.japN, {fontSize: '40px', fill: '#000'});
    }

    getTrust()
    {
        return this.trust;
    }
}

//clase Anuncio
export class Ad{
    constructor(scene, _posX, _posY, _imgId){
        //super(scene);
        scene.add.existing(this);

        this.x = _posX;
        this.y = _posY;
        this.selected = false;
        this.available = false;
        this.button = scene.add.image(_posX, _posY, 'Ad' + _imgId).setInteractive();
        this.button.setScale(0.12);

        //Eventos del boton
        this.button.on('pointerdown', () => {
            console.log('soy un anuncio bloqueado');
            if (this.available && !this.selected) this.selected = true;
            else if (this.available && this.selected) this.selected = false;
        });

        this.button.on('pointerover', () => {
            if (this.available) this.button.setScale(0.14);
        })
        this.button.on('pointerout', () => {
            if (this.available) this.button.setScale(0.12);
        })
    }

    getX() {return this.x}
    getY() {return this.y}
    getSelected() {return this.selected}

}
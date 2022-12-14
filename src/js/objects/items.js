//Clase Periodico
export class Newspaper{
    constructor(scene, _title, _posX, _posY, _imgId, _trust){
        scene.add.existing(this);
        this._myS = scene;
        this.text;
        this.title = _title;
        this.titleWords= [];
        this.Ntitle="";
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
        this.jap = scene.add.image(_posX - 80, _posY - 25, 'simJap').setScale(0.04);
        this.veg = scene.add.image(_posX + 25, _posY - 25, 'simVeg').setScale(0.04);
        this.ita = scene.add.image(_posX - 80, _posY + 50, 'simIta').setScale(0.04);
        this.esp = scene.add.image(_posX + 25, _posY + 50, 'simEsp').setScale(0.04);

        //Numeros para la confianza de cada distrito
        this.trust =_trust;
        this.setTrustTexts(_posX, _posY, _trust);

        //Eventos del boton
        this.button.on('pointerdown', () => {
            if (!this.selected){                        //Si no soy un periodico seleccionado
                if (!scene.getTitleSelected()){         //Y no hay ningun periodico seleccionado 
                    this.selected = true;               //Me selecciono
                    this.tick.alpha = 1;
                    this.removeHeadline();
                    this.setHeadlineText();
                    scene.changeTitleSelected(true);    //Informo de que hay un periodico seleccionado
                    scene.setTrustSelected(this.trust); //Asigno la confianza de este periodico a la final de la escena
                }
            }
            else {                                      //Si estoy seleccionado
                if (scene.getTitleSelected()) {         //Y hay un periodico seleccionado (esto me indica que soy yo)
                    this.selected = false;              //Ya no estoy seleccionado
                    this.tick.alpha = 0;
                    this.removeHeadline();
                    scene.changeTitleSelected(false);   //Informo de que ya no hay ningun periodico seleccionado
                }
            }
        })
        this.button.on('pointerover', () => {
            if(!this.selected && !scene.getTitleSelected()) 
            {
                this.button.setScale(0.3,0.25);         //Aumenta el tama??o del bot??n
                this.setHeadlineText();                 //Coloca el titular
                this.setDistrictImages(true);           //Aumenta el tama??o de los iconos
                this.updateTrustTexts(true);            //Aumenta el tama??o de los textos de confianza
            }
        });
        this.button.on('pointerout', () => { 
            if(!this.selected && !scene.getTitleSelected()) 
            {
                this.button.setScale(0.25, 0.2);        //Reduce el tama??o del bot??n
                this.removeHeadline();                  //Quita el titular
                this.setDistrictImages(false);          //Reduce el tama??o de los iconos
                this.updateTrustTexts(false);           //Reduce el tama??o de los textos de confianza
            }
        });
    }

    //Asigna los titulares y hace que se a??ada \n cada tres palabras
    //... para que quepan en el recuadro
    setHeadlineText(){
        
        this.titleWords=this.title.split(" ");      //Divide las palabras por espacios

        if(this.titleWords.length>3){               //Si hay m??s de 3 palabras se ejeuta
            this.Ntitle+=this.titleWords[0];        //Se coloca la primera palabra para no insertar \n al principio
        for(let i=1; i<this.titleWords.length; i++ ){
            if(i%3===0){                            //Cada 3 palabras se inserta \n
                this.Ntitle+="\n"+ this.titleWords[i];
            }else{                                  //Si no se inserta un espacio
            this.Ntitle+=" "+ this.titleWords[i];
            }
        }}else{                                     //Si no hay m??s de 3 palabras se asigna el titular de manera normal
            this.Ntitle=this.title;
        }

        
        this.text = this._myS.add.text(775,150, this.Ntitle, {fontSize: '30px', fill: '#000'});
    }

    //Destrucci??n del titular y variables asociadas
    removeHeadline(){
        this.Ntitle="";
        this.titleWords=[];
        this.text.destroy();
    }
    //Posiciona las imagenes de los barrios segun el jugador tenga el raton sobre el periodico o no
    setDistrictImages(value)
    {
        if (value)
        {
            
            //Posiciones
            this.jap.setPosition(this.x - 100, this.y - 30);
            this.veg.setPosition(this.x + 35, this.y - 30);
            this.ita.setPosition(this.x - 100, this.y + 60);
            this.esp.setPosition(this.x + 35, this.y + 60);
            
            //Tama??os
            this.jap.setScale(0.06);
            this.veg.setScale(0.06);
            this.ita.setScale(0.06);
            this.esp.setScale(0.06);
        }

        else
        {
            //Posiciones
            this.jap.setPosition(this.x - 80, this.y - 25);
            this.veg.setPosition(this.x + 25, this.y - 25);
            this.ita.setPosition(this.x - 80, this.y + 50);
            this.esp.setPosition(this.x + 25, this.y + 50);
            

            //Tama??os
            this.jap.setScale(0.04);
            this.veg.setScale(0.04);
            this.ita.setScale(0.04);
            this.esp.setScale(0.04);
        }
    }
    //Posiciona los valores de confianza de cada distrito segun el jugador tenga el raton sobre el periodico o no
    updateTrustTexts(value)
    {
        if(value) {
            this.japN.setPosition(this.x - 75, this.y - 50);
            this.vegN.setPosition(this.x + 58, this.y - 50);
            this.itaN.setPosition(this.x - 75, this.y + 40);
            this.espN.setPosition(this.x + 58, this.y + 40);

            this.japN.setFontSize(45);
            this.vegN.setFontSize(45);
            this.itaN.setFontSize(45);
            this.espN.setFontSize(45);
        }

        else{
            this.japN.setPosition(this.x - 65, this.y - 45);
            this.vegN.setPosition(this.x + 40, this.y - 45);
            this.itaN.setPosition(this.x - 65, this.y + 30);
            this.espN.setPosition(this.x + 40, this.y + 30);

            this.japN.setFontSize(35);
            this.vegN.setFontSize(35);
            this.itaN.setFontSize(35);
            this.espN.setFontSize(35);
        }
    }
    //A??ade a escena los valores de confianza
    setTrustTexts(x, y, trust){

        this.japN = ':' + trust[0];
        this.vegN = ':' + trust[1];
        this.itaN = ':' + trust[2];
        this.espN = ':' + trust[3];

        this.japN = this._myS.add.text(x - 65, y - 45, this.japN, {fontSize: '35px', fill: '#000'});
        this.vegN = this._myS.add.text(x + 40, y - 45, this.vegN, {fontSize: '35px', fill: '#000'});
        this.itaN = this._myS.add.text(x - 65, y + 30, this.itaN, {fontSize: '35px', fill: '#000'});
        this.espN = this._myS.add.text(x + 40, y + 30, this.espN, {fontSize: '35px', fill: '#000'});
    }

    //Acceso al booleano de estado seleccionado y el array de confianza
    getSelected(){ return this.selected;}
    getTrust(){ return this.trust;}
}

//Clase Anuncio
export class Ad{
    constructor(scene, _posX, _posY, _activated, _imgId){
        //Nos a??adimos a la escena
        scene.add.existing(this);
        //Booleanos de control: sobre si esta seleccionado y/o disponible
        this.selected = false;
        this.available = _activated;
        //Si estoy disponible a??ado mi imagen correspondiente, si no a??ado la imagen de anuncio bloqueado
        if (_activated) this.button = scene.add.image(_posX, _posY, 'Ad' + _imgId).setInteractive();
        else this.button = scene.add.image(_posX, _posY, 'adBlocked').setInteractive();
        this.button.setScale(0.12);

        //Si selecciona/deseleccionar el anuncio, cambia el precio del periodico a generar
        this.button.on('pointerdown', () => {
            if (this.available && !this.selected) {this.selected = true; scene.modifyNewspaperPrice(true); }
            else if (this.available && this.selected) {this.selected = false; scene.modifyNewspaperPrice(false); } 
        });
        //Si esta el raton encima me hago mas grande
        this.button.on('pointerover', () => {
            if (this.available) this.button.setScale(0.14);
        })
        //Si esta el raton fuera tengo el tama??o original
        this.button.on('pointerout', () => {
            if (this.available && !this.selected) this.button.setScale(0.12);
        })
    }
    //Acceso al estado de seleccion del anuncio
    getSelected() {return this.selected}

}

// Barra de confianza que se muestra en el HUD
export default class TrustMeasurer extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
    super(scene, x, y);
    this.scene.add.existing(this);
    this.myS = scene;
        //Creamos las animaciones de la barra de confianza(sus diferentes estados)
    scene.add.sprite(x, y, 'BarraConfianza', 5);

    scene.anims.create({
        key: 'NegTrust5',
        frames: scene.anims.generateFrameNumbers('BarraConfianza', { start: 0, end: 0}),
        repeat: 0
    });

    scene.anims.create({
        key: 'NegTrust4',
        frames: scene.anims.generateFrameNumbers('BarraConfianza', { start: 1, end: 1}),
        repeat: 0
    });

    scene.anims.create({
        key: 'NegTrust3',
        frames: scene.anims.generateFrameNumbers('BarraConfianza', { start: 2, end: 2}),
        repeat: 0
    });

    scene.anims.create({
        key: 'NegTrust2',
        frames: scene.anims.generateFrameNumbers('BarraConfianza', { start: 3, end: 3}),
        repeat: 0
    });

    scene.anims.create({
        key: 'NegTrust1',
        frames: scene.anims.generateFrameNumbers('BarraConfianza', { start: 4, end: 4}),
        repeat: 0
    });

    scene.anims.create({
        key: 'noTrust',
        frames: scene.anims.generateFrameNumbers('BarraConfianza', { start: 5, end: 5 }),
        repeat: 0
    });

    scene.anims.create({
        key: 'trust1',
        frames: scene.anims.generateFrameNumbers('BarraConfianza', { start: 6, end: 6}),
        repeat: 0
    });

    scene.anims.create({
        key: 'trust2',
        frames: scene.anims.generateFrameNumbers('BarraConfianza', { start: 7, end: 7}),
        repeat: 0
    });

    scene.anims.create({
        key: 'trust3',
        frames: scene.anims.generateFrameNumbers('BarraConfianza', { start: 8, end: 8}),
        repeat: 0
    });

    scene.anims.create({
        key: 'trust4',
        frames: scene.anims.generateFrameNumbers('BarraConfianza', { start: 9, end: 9}),
        repeat: 0
    });

    scene.anims.create({
        key: 'trust5',
        frames: scene.anims.generateFrameNumbers('BarraConfianza', { start: 10, end: 10}),
        repeat: 0
    });

    }
    //Revisamos qu?? animaci??n reproducir seg??n el valor de la confianza
    checkAnims(trust){
        
        if (trust === 0) this.play('noTrust');
        else if (trust > 0) {
            if (0 < trust && trust <= 5) this.play( 'trust1');
            else if (5 < trust && trust <= 10) this.play('trust2');
            else if (10 < trust && trust <= 15) this.play('trust3');
            else if (15 < trust && trust <= 20) this.play('trust4');
            else if (20 < trust) this.play('trust5');
        }

        else if (trust < 0) {
            if (0 > trust && trust >= -5) this.play('NegTrust1');
            else if (-5 > trust && trust >= -10) this.play('NegTrust2');
            else if (-10 > trust && trust >= -15) this.play('NegTrust3');
            else if (-15 > trust && trust >= -20) this.play('NegTrust4');
            else if (-20 > trust) this.play('NegTrust5');
        }
    }

    preUpdate(t, d){
        //Llamamos al super para las animaciones
        super.preUpdate(t, d);
    }
}
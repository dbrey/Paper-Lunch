import { Newspaper, Ad } from '../objects/items.js';
import CT from '../libraries/constants.js'

export default class DIA_DEFAULT extends Phaser.Scene {
    constructor(){
        super({key: 'createNewspaper'})
    }
    
    init(data)
    {
        this.diaActual = data.diaActual;
        this.nDay = data._nDay;                  // Dia para los periodicos
        this.money = data._money;               //Dinero con el que empieza
        this.confianza = data._confianza;
        this.mainVolume = data._mainVolume;     // Volumen musica
        this.effectsVolume = data._effectsVolume // Volumen efectos
        this.isMainMute = data._isMainMute;     // Booleano si esta la musica muteada
        this.isEffectsMute = data._isEffectsMute; // Booleano si estan los efectos muteados 
        this.continueSong = data._continueSong; // Booleano para ver si es la primera vez que se debe tocar la cancion

        if (data._money <= 0){
            this.scene.start('win_lose', {_win: false, _mainVolume: this.mainVolume, _effectsVolume: this.effectsVolume, 
                _isMainMute: this.isMainMute, _isEffectsMute: this.isEffectsMute});            
        }
    }

    //Creamos lo necesario para la escena
    create(){
        
        // SONIDO
        //----------------------------------------------------------------------------------------------------
        if(this.isMainMute) { this.music = this.sound.add('newsSoundtrack', {volume: 0}, {loop: true}); }
        else { this.music = this.sound.add('newsSoundtrack', {volume: this.mainVolume}, {loop: true}); }
        
        this.music.play();

        if(this.isEffectsMute) { this.clickSound = this.sound.add('numKey', {volume: 0}, {loop: false}); }
        else { this.clickSound = this.sound.add('numKey', {volume: this.effectsVolume}, {loop: false});}

        if(this.isEffectsMute) { this.clickSoundP = this.sound.add('selPeriod', {volume: 0}, {loop: false}); }
        else { this.clickSoundP = this.sound.add('selPeriod', {volume: this.effectsVolume}, {loop: false});}
        //----------------------------------------------------------------------------------------------------

        //Fondo de la escena
        this.Background=this.add.image(640,360,'BackgroundP');
        this.Background.setScale(0.625,0.3511);
        
        this.titleRect = this.add.image(1000, 200, 'titleRect');
        this.titleRect.setScale(0.5,0.3);

        //Recuadro de los enteros
        this.Recuadro=this.add.image(850,440,'Recuadro');
        this.Recuadro.setScale(0.25,0.35);

        //Datos de peri??dicos
        this.newsData=this.cache.json.get('newsData');
        //Variable que itera entre los datos
        //this.nDay = 0;
        //Asignaci??n de los datos
        this.dayData=this.newsData.Days[this.nDay];

        this.Total=this.add.image(1150,480,'Total');
        this.Total.setScale(0.5,0.25);
        
        
        //Array de flechas y enteros para seleccionar el num de periodicos (unidades, decenas, centenas)
        this.arrows = [];
        this.nums = [];
        this.nums[2] = 0; this.nums[1] = 0; this.nums[0] = 0;

        //Variables
        this.moneyLeft = 0;                         //Dinero resultate tras crear los periodicos
        this.moneySpent=this.money-this.moneyLeft;  //Dinero gastado en la creaci??n de peri??dicos
        this.pricePerPaper=2;                       //Dinero que cuesta cada peri??dico
        this.trustFinal = [0, 0, 0, 0];             //Arrays de confianza (una por periodico y una final)
        this.trustP1 = [0, 0, 0, 0];                  
        this.trustP2 = [0, 0, 0, 0];                  
        this.trustP3 = [0, 0, 0, 0];                  
        this.trustP4 = [0, 0, 0, 0];                  
        this.NTrust=[this.trustP1,this.trustP2,this.trustP3,this.trustP4]; //Array de arrays con las confianzas
        
        this.NHeadLine=['','','',''];               //Titulares
        this.numNewspapers = 0;                     //Numero de periodicos generados
        this.titleSelected = false;                 //Booleanos de control para saber si se puede pasar a la siguiente escena
        this.numNSelected = false;

        this.information();                         //Renderiza los textos necesarios para que el jugador sepa que hacer
        this.searchInfo();                          //Busca la informacion de los periodicos de ESTE d??a


        //Asignamos las flechas
        for (let i = 0; i < 6; i++)
        {
            if (i < 3) this.arrows[i] = this.add.image(925 - i* 60, 380, 'arrowUp').setInteractive();
            else this.arrows[i] =this.add.image(925 - (i-3) * 60 , 465, 'arrowDown').setInteractive();
            this.arrows[i].setScale(0.08);
            this.arrows[i].on('pointerdown', () => {this.changeNumbers(i); });
            this.arrows[i].on('pointerover', () => {this.arrows[i].setScale(0.1);});
            this.arrows[i].on('pointerout', () => {this.arrows[i].setScale(0.08);});
        }

        //Array de periodicos
        this.newspapers = [];
        for (let i = 0; i < CT.numNewspapers; i++)
        {
            if (i < 2) this.newspapers[i] = new Newspaper(this, this.NHeadLine[i], 220 + i *300, 180, 'news' + (i+1), this.NTrust[i]);
            else this.newspapers[i] = new Newspaper(this, this.NHeadLine[i], 220 + (i-2)*300, 400, 'news' + (i+1) ,this.NTrust[i]);
        }

        //Array de anuncios
        this.ads = [];
        var num = 1;
        var myDay = this.nDay;
        for (let i = 0; i < CT.numAds; i++)
        {
            if(myDay >= 3 ) this.ads[i] = new Ad(this, 150 + i*150, 630, true, num);
            else this.ads[i] = new Ad(this, 150 + i*150, 630, false, num);
            myDay--;
            num++;
        }

        
        //Boton de pasar a la siguiente escena, sin eventos (esta desactivado);
        this.continueButton = this.add.image(1000, 600, 'continueButtonBlocked');
        this.continueButton.setScale(0.3);
        
    }

    //Recorre la estructura de datos asignando el titular con sus
    //... correspondientes datos de confianza

    searchInfo(){
        for(let j=0; j<4;j++){
            this.NHeadLine[j]=this.dayData.Day[j].headLine;
                this.NTrust[j][0]=this.dayData.Day[j].StatJ;
                this.NTrust[j][1]=this.dayData.Day[j].StatV;
                this.NTrust[j][2]=this.dayData.Day[j].StatI;
                this.NTrust[j][3]=this.dayData.Day[j].StatE;
        }  
    }

    //Escribe en pantalla la informacion necesaria para el jugador
    information()
    {
    //textos para informar al jugador sobre:
        //...informaci??n sobre la escena
        this.message='';
        this.adMessage='';
        //...el t??tulo del periodico seleccionado
        this.titleMessage='';
        //...el numero de periodicos
        this.numText='';
        //...el dinero que ten??a y tendr??
        this.moneyText='';
        this.moneyLeftText='';
        this.moneySpentText='';
        
        this.titleMessage = this.add.text(950, 100, 'TITLE', {fontSize: '30px', fill: '#000'});
        this.message = this.add.text(75, 30, 'Selecciona un peri??dico y un n??mero de peri??dicos para continuar', {fontSize: '30px', fill: '#000'});
        this.adMessage= this.add.text(140, 520, 'Incluir anuncios es una acci??n opcional' + '\n      y afectar?? a la confianza', {fontSize: '20px', fill: '#000'});
        this.numText = this.add.text(790, 400, this.nums[0]+' '+this.nums[1]+' '+this.nums[2], { fontSize: '50px', fill: '#000' });        
        this.moneyText=this.add.text(1150,350,this.money,{fontSize: '50px', fill: '#000'});
        this.moneySpentText=this.add.text(1120,400,'-'+this.moneySpent,{fontSize: '50px', fill: '#9e0d0d'});
        this.moneyLeftText=this.add.text(1150,460,this.moneyLeft,{fontSize: '50px', fill: '#000'});
    }

    //Escribe los textos de la confianza de cada barrio en cada periodico
    setTrustTexts(trust, x, y, value)
    {
        this.espN = ': ' + trust[0];
        this.vegN = ': ' + trust[1];
        this.itaN = ': ' + trust[2];
        this.japN = ': ' + trust[3];

        if (value)
        {
            this.espN = this.add.text(x - 85, y - 30, this.espN, {fontSize: '30px', fill: '#000'});
            this.vegN = this.add.text(x + 10, y - 30, this.vegN, {fontSize: '30px', fill: '#000'});
            this.itaN = this.add.text(x - 85, y + 60, this.itaN, {fontSize: '30px', fill: '#000'});
            this.japN = this.add.text(x + 10, y + 60, this.japN, {fontSize: '30px', fill: '#000'});
        }

        else
        {
            this.espN = this.add.text(x - 50, y - 25, this.espN, {fontSize: '30px', fill: '#000'});
            this.vegN = this.add.text(x, y - 25, this.vegN, {fontSize: '30px', fill: '#000'});
            this.itaN = this.add.text(x - 50, y + 35, this.itaN, {fontSize: '30px', fill: '#000'});
            this.japN = this.add.text(x, y + 35, this.japN, {fontSize: '30px', fill: '#000'});
        }
    }

    //Metodo para saber si ya se ha seleccionado un titulo
    getTitleSelected(){
        return this.titleSelected;
    }

    //El periodico seleccionado informa de su confianza
    setTrustSelected(newspaperstrust){
        this.trustFinal = newspaperstrust;
    }

    //Controla si hay un titulo seleccionado (cambia para indicar si si o si no)
    changeTitleSelected(value){
        this.clickSoundP.play();
        this.titleSelected = value;
        this.checkContinueButton();
    }

    //Averiguar cuantos anuncios han sido seleccionados
    modifyNewspaperPrice(value){
       if (value) this.pricePerPaper += 0.25;
       else this.pricePerPaper -= 0.25;
    }

    //Cambia el valor del array de numeros que controla el numero de periodicos
    changeNumbers(params) {
        this.clickSound.play();
        if (params < 3) 
        {
            if (this.nums[params] < 9) this.nums[params]++;
            else this.nums[params] = 0;
        }
        else
        {
            if (this.nums[params - 3] > 0) this.nums[params-3]--;
            else this.nums[params-3] = 9;
        }
        this.numText.setText(this.nums[2]+' '+this.nums[1]+' '+this.nums[0]);
        this.calculateNumNewspapers();
    }
    
    //Calcula el numero de periodicos, y si no es 0 cambia el booleano de control
    calculateNumNewspapers(){
        
        this.moneySpent=(0.50*(this.nums[0] + this.nums[1] * 10 + this.nums[2] * 100));
        this.numNewspapers = this.nums[0] + this.nums[1] * 10 + this.nums[2] * 100;
        
        
        this.moneyLeft=this.money-this.moneySpent;
 
        this.moneyLeftText.setText(this.moneyLeft);
        this.moneySpentText.setText('-'+this.moneySpent);
        this.numNSelected = (this.numNewspapers > 0);
        this.checkContinueButton();
    }
    //Recorremos los anuncios y dependiendo de si esta activado afecta o no a la confianza
    adsEffect(){
        for (let i = 0; i < 4; i++){
            if (this.ads[i].getSelected()){
                for (let j = 0; j < 4; j++){
                    this.trustFinal[j]--;
                }
            }
        }

    }
    //Suma la confianza seleccionada este dia con la que arrastras de dias anteriores
    keepTrust(){
        this.trustFinal[0] += this.confianza[0];
        this.trustFinal[1] += this.confianza[1];
        this.trustFinal[2] += this.confianza[2];
        this.trustFinal[3] += this.confianza[3];
    }

    //Actualizamos el boton de continuar en cuestion de si hay un titulo seleccionado y el num de periodicos no es 0
    checkContinueButton()
    {
        //Si cumple las condiciones, el boton se activa
       if (this.titleSelected && this.numNSelected&&this.moneyLeft>=0)
       {
        this.continueButton = this.add.image(1000, 600, 'continueButton').setInteractive();
                this.continueButton.setScale(0.3);
                this.continueButton.on('pointerover', () => {this.continueButton.setScale(0.4);})
                this.continueButton.on('pointerout', () => {this.continueButton.setScale(0.3);})
                this.continueButton.on('pointerdown', () => {
                    this.adsEffect();
                    this.keepTrust();
                    this.scene.start(this.diaActual, {_numN: this.numNewspapers, 
                    _money: this.moneyLeft, _urTrust: this.trustFinal, _pricePaper: this.pricePerPaper, _nDay: this.nDay,
                    _mainVolume: this.mainVolume, _effectsVolume: this.effectsVolume, _isMainMute: this.isMainMute, 
                    _isEffectsMute: this.isEffectsMute, _music: this.music });})
       }
        //Si no se cumple ninguna condicion, el boton se desactiva
        else
        {
            this.continueButton = this.add.image(1000, 600, 'continueButtonBlocked').setInteractive();
            this.continueButton.setScale(0.3);
            this.continueButton.on('pointerover', () => {})
                this.continueButton.on('pointerout', () => {})
                this.continueButton.on('pointerdown', () => {})
        }
    }
}
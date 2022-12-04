import { Newspaper, Ad } from '../characters/items.js';
import CT from '../libraries/constants.js'

export default class DIA_DEFAULT extends Phaser.Scene {
    constructor(){
        super({key: 'createNewspaper'})
    }

    init(data)
    {
        this.diaActual = data.diaActual;
        this.nDay= data._nDay;                  // Dia para los periodicos
        this.money = data._money;               //Dinero con el que empieza
        this.confianza = data._confianza;

    }

    //Creamos lo necesario para la escena
    create(){
        //Fondo de la escena
        this.Background=this.add.image(640,360,'BackgroundP');
        this.Background.setScale(0.625,0.3511);
        
        this.titleRect = this.add.image(1000, 200, 'titleRect');
        this.titleRect.setScale(0.3);

        //Recuadro de los enteros
        this.Recuadro=this.add.image(850,440,'Recuadro');
        this.Recuadro.setScale(0.25,0.35);

        //Datos de periódicos
        this.newsData=this.cache.json.get('newsData');
        this.dayData=this.newsData.Days[this.nDay];

        this.Total=this.add.image(1150,480,'Total');
        this.Total.setScale(0.5,0.25);
        
        
        //Array de flechas y enteros para seleccionar el num de periodicos (unidades, decenas, centenas)
        this.arrows = [];
        this.nums = [];
        this.nums[2] = 0; this.nums[1] = 0; this.nums[0] = 0;

        //Variables
        this.money=200;                             //Dinero con el que empieza
        this.moneyLeft = 0;                         //Dinero resultate tras crear los periodicos
        this.moneySpent=this.money-this.moneyLeft;  //Dinero gastado en la creación de periódicos
        this.pricePerPaper=1;                       //Dinero que cuesta cada periódico
        this.trustP1 = [0, 0, 0, 0];                  //Array de confianza (una por distrito)
        this.trustP2 = [0, 0, 0, 0];                  //Array de confianza (una por distrito)
        this.trustP3 = [0, 0, 0, 0];                  //Array de confianza (una por distrito)
        this.trustP4 = [0, 0, 0, 0];                  //Array de confianza (una por distrito)
        this.NTrust=[this.trustP1,this.trustP2,this.trustP3,this.trustP4];
        
        this.NHeadLine=['','','','']
        this.numNewspapers = 0;                     //Numero de periodicos generados
        this.titleSelected = false;                 //Booleanos de control para saber si se puede pasar a la siguiente escena

        this.numNSelected = false;

        this.information();
        this.searchInfo();


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
            if (i < 2) this.newspapers[i] = new Newspaper(this, 'soy un periodico', 220 + i *300, 180, 'news' + (i+1), this.NTrust[i]);
            else this.newspapers[i] = new Newspaper(this, 'soy un periodico', 220 + (i-2)*300, 400, 'news' + (i+1) ,this.NTrust[i]);
        }

        //Array de anuncios
        this.ads = [];
        var num = 1;
        for (let i = 0; i < CT.numAds; i++)
        {
            this.ads[i] = new Ad(this, 150 + i*150, 630, num);
            num++;
        }

        
        //Boton de pasar a la siguiente escena, con su evento
        this.continueButton = this.add.sprite(1000, 600, 'continueButtonBlocked').setInteractive();
        this.continueButton.setScale(0.3);
        
    }

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
        //...información sobre la escena
        this.message='';
        this.adMessage='';
        //...el título del periodico seleccionado
        this.titleMessage='';
        //...el numero de periodicos
        this.numText='';
        //...el dinero que tenía y tendrá
        this.moneyText='';
        this.moneyLeftText='';
        this.moneySpentText='';
        
        this.titleMessage = this.add.text(950, 100, 'TITLE', {fontSize: '30px', fill: '#000'});
        this.message = this.add.text(115, 30, 'Select a newspaper and a number of newspapers to continue', {fontSize: '30px', fill: '#000'});
        this.adMessage= this.add.text(140, 520, 'Including ads is an optional action and' + '\n      it will affect your trust', {fontSize: '20px', fill: '#000'});
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
    //Controla si hay un titulo seleccionado (cambia para indicar si si o si no)
    changeTitleSelected(value){
        this.titleSelected = value;
        this.checkContinueButton();
    }

    //Cambia el valor del array de numeros que controla el numero de periodicos
    changeNumbers(params) {
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
        //console.log(this.numNewspapers);
    }
    
    //Calcula el numero de periodicos, y si no es 0 cambia el booleano de control
    calculateNumNewspapers(){
        
        this.moneySpent=(this.pricePerPaper*(this.nums[0] + this.nums[1] * 10 + this.nums[2] * 100));
        this.numNewspapers = this.nums[0] + this.nums[1] * 10 + this.nums[2] * 100;
        
        
        this.moneyLeft=this.money-this.moneySpent;
        /*
        if (this.numNewspapers > 0) this.numNSelected = true;
        else this.numNSelected = false;*/
        this.moneyLeftText.setText(this.moneyLeft);
        this.moneySpentText.setText('-'+this.moneySpent);
        this.numNSelected = (this.numNewspapers > 0);
        this.checkContinueButton();
    }

    //Actualizamos el boton de continuar en cuestion de si hay un titulo seleccionado y el num de periodicos no es 0
    checkContinueButton()
    {
       if (this.titleSelected && this.numNSelected&&this.moneyLeft>=0)
       {
        this.continueButton = this.add.image(1000, 600, 'continueButton').setInteractive();
                this.continueButton.setScale(0.3);
                this.continueButton.on('pointerover', () => {this.continueButton.setScale(0.4);})
                this.continueButton.on('pointerout', () => {this.continueButton.setScale(0.3);})
                this.continueButton.on('pointerdown', () => {this.scene.start(this.diaActual, {_numN: this.numNewspapers, _money: this.moneyLeft, _urTrust: this.confianza, _nDay: this.nDay + 1});})
                //this.continueButton.on('pointerdown', () => {this.scene.start(this.diaActual, {_numN: this.numNewspapers, _money: this.moneyLeft});})

       }

        //Si no se cumple ninguna condicion, el boton se desactiva
        else
        {
            this.continueButton.setTexture('continueButtonBlocked');
            //this.continueButton.setScale(0.3);
            this.continueButton.on('pointerover', () => {})
            this.continueButton.on('pointerout', () => {})
            this.continueButton.on('pointerdown', () => {})
        }
    }
}
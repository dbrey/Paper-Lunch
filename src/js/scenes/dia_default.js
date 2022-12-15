import NPC from '../characters/NPC.js';
import Player from '../characters/player.js';
import CT from '../libraries/constants.js';
import UI from '../UI/hud.js';
import Temporizador from '../temporizador/temporizador.js';
import TP from '../TP/teleport.js'
import kiosk from '../characters/kiosk.js';
import ZONE from '../TP/zone.js';



import dialogManager from '../libraries/dialogManager.js'


export default class DIA_DEFAULT extends Phaser.Scene {

    constructor(day, _nextDay) {
        super({ key: day });
        this.objectLayerName = 'tps';
        this.nextDay = _nextDay;
        this.currentScene = day;
    }

    init(data)
    {

        this.numN = data._numN; // Numero de Newspapers
        this.money = data._money; // Dinero del jugador (Empieza con 200 - la cantidad gastada en periodicos)
        this._myTrust = data._urTrust; // Array de confianza
        this.nDay = data._nDay; // Dia para los periodicos
        this.mainVolume = data._mainVolume; // Volumen musica
        this.effectsVolume = data._effectsVolume // Volumen efectos
        this.isMainMute = data._isMainMute; // Booleano si esta la musica muteada
        this.isEffectsMute = data._isEffectsMute; // Booleano si estan los efectos muteados
        this.moneyPP = data._pricePaper;
        this.music = data._music;
    }

    //Aqui te crea todo lo que necesites al inicio para todo el juego
    create() {

        //Mapa
        this.map = this.make.tilemap({
            key: 'tileMap',
            tileWidth: 32,
            tileHeight: 32
        });


        if(this.isEffectsMute) { 
            this.soldSound = this.sound.add('sold', {volume: 0}, {loop: false}); 
            this.numKeySound = this.sound.add('numKey', {volume: 0}, {loop: false}); 
        }
        else {
            this.soldSound = this.sound.add('sold', {volume: this.effectsVolume}, {loop: false});
            this.numKeySound = this.sound.add('numKey', {volume: 0}, {loop: false}); 
        }

        //Mapa - Capas Normales 1 - Parte 1

        let tileSet = this.map.addTilesetImage('Modern_Exteriors_Complete_Tileset_32x32', 'mapTiles');
        this.mapGround = this.map.createStaticLayer('suelo', tileSet);
        this.mapBajos = this.map.createStaticLayer('jugEncima', tileSet);
        this.player = new Player(this, 3840, 2770, this.numN, this.money, this._myTrust, this.moneyPP);
        this.mapAdornos = this.map.createStaticLayer('jugColisiona', tileSet);
        this.mapTechos = this.map.createStaticLayer('jugDebajo', tileSet);
        this.mapCollisions = this.map.createStaticLayer('Collisions', tileSet);
        this.mapCollisions.setCollisionBetween(0, 10000, true, false);
        this.physics.add.collider(this.player, this.mapCollisions);
        this.mapCollisions.visible = false;
        //HUD
        this.ui = new UI(this, this.player);  
               
        let mapObjects = this.map.getObjectLayer(this.objectLayerName).objects;


        for (const objeto of mapObjects) {
            const props = {};
            if (objeto.properties) { for (const { name, value } of objeto.properties) { props[name] = value; } }
            //Con esto ponemos bien el punto de origen
            objeto.x += objeto.width / 2;
            objeto.y += objeto.height / 2;

            switch (objeto.name) {
                case 'KIO':
                    this[props.nombre] = new kiosk(this, objeto.x, objeto.y, this.player, props.id, objeto.width, objeto.height)
                break;
                case 'NPC': //NPC
                this[props.nombre] = new NPC(this,objeto.x,objeto.y,props.nombre,this.player,35,35,props.barrioId)
                    break;
                case 'TP':
                    this[props.nombre] = new TP(this, objeto.x, objeto.y, props.id, this.player, objeto.width, objeto.height)
                    
                break;
                case 'ZONE':
                    this[props.nombre] = new ZONE(this, objeto.x, objeto.y, props.id, this.player, this.ui , objeto.width, objeto.height);
                    break; 
            }
        }

        

        //Cámara que sigue al jugador
        this.cameras.main.startFollow(this.player);
        this.cameras.main.width = CT.gameWidth;
        this.cameras.main.height = CT.gameHeight;
        this.cameras.main.zoom = CT.cameraZoom;
        this.cameras.main.setLerp(0.8, 0.8)

        this.pauseButton = this.input.keyboard.addKey('ESC');
        this.pauseButton.on('down', () => { 
        });

        this.temporizador = new Temporizador(this);
        this.dialogManager = new dialogManager(this, 545, 565); 
        this.dialogTimer = 0;
    }



    // Metodos para manejar cambios de las escenas
    changeScene(sceneName = this.nextLevel) {
        this.currentPlaying.stop()
        this.scene.start(sceneName);
    }


    update(t,dt) {
        if (Phaser.Input.Keyboard.JustDown(this.pauseButton)) { 
            this.player.stopX(); this.player.stopY();
            this.scene.pause();
            
            this.scene.launch("pauseMenu", {_scene: this, sceneName: this.currentScene});
            this.player.resetInput();
        } 



        if(this.dialogManager.writting){

            //Actualizamos el timmer;
            this.dialogTimer+=dt;
            if(this.dialogTimer >= CT.interval){
                this.dialogManager.updateDialog();
                this.dialogTimer = 0;
            }

		}
        
    }


    finDia(){
        this.scene.start('createNewspaper');

        if(this.diaActual != 'SeptimoDia'&& this.player.getDinero() < 200 )
        {
            this.scene.start('createNewspaper', {diaActual: this.nextDay,  _money: this.player.getDinero(), _nDay: this.nDay, _confianza: this._myTrust,  
                _mainVolume: this.mainVolume, _effectsVolume: this.effectsVolume, _isMainMute: this.isMainMute, _isEffectsMute: this.isEffectsMute});
        }
        else
        {
            this.music.stop();
            if(this.player.getDinero() > 300)
            {
                this.scene.start('win_lose', {_win: true, _mainVolume: this.mainVolume, _effectsVolume: this.effectsVolume, _isMainMute: this.isMainMute, _isEffectsMute: this.isEffectsMute});
            }
            else
            {
                this.scene.start('win_lose', {_win: false, _mainVolume: this.mainVolume, _effectsVolume: this.effectsVolume, _isMainMute: this.isMainMute, _isEffectsMute: this.isEffectsMute});
            }           
            // Cambiar a menu de ganar y perder

            // Pasar mainVolume,effectsVolume, isMainMute, isEffectsMute por referencia
        }

    }


    comienzaDialogo(text){
        this.ui.activeDialogBar();
        this.player.changePlayerState();
        this.dialogManager.updatePosition(this.player.x - CT.offsetDialogX, this.player.y + CT.offsetDialogY);
        this.dialogManager.startWritting(text);
    }

    terminaDialogo(){
        this.dialogManager.finishWrittting();
    }

    finalizaDialogo(){
        this.dialogManager.clearText();
        this.ui.desactiveDialogBar();
        this.player.changePlayerState();
    }

    playSound(string)
    {
        if(string == "sold")
        {
            this.soldSound.play();
        }
        else if (string == "NumKey")
        {
            this.numKeySound.play();
        }
    }

}
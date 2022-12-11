import NPC from '../characters/NPC.js';
import Player from '../characters/player.js';
import CT from '../libraries/constants.js';
import UI from '../UI/hud.js';
import Temporizador from '../temporizador/temporizador.js';
import TP from '../TP/teleport.js';
import kiosk from '../characters/kiosk.js';
import ZONE from '../TP/zone.js';
import dialogue from '../UI/dialogue.js';


export default class dia_default extends Phaser.Scene {

    constructor(day, _objectLayerName, _nextDay) {
        super({ key: day });
        //this.objectLayerName = _objectLayerName;
        this.nextDay = _nextDay;
    }

    init(data)
    {
        this.numN = data._numN;
        this.money = data._money;

        this._myTrust = data._urTrust;
        this.nDay = data._nDay; // Dia para los periodicos
        this.moneyPP = data._moneyPP;

        this.objectLayerName = 'objetos';
    }

    //Aqui te crea todo lo que necesites al inicio para todo el juego
    create() {

        //Mapa
        this.map = this.make.tilemap({
            key: 'tileMap',
            tileWidth: 32,
            tileHeight: 32
        });

        //Mapa - Capas Normales 1 - Parte 1
        let tileSet = this.map.addTilesetImage('Modern_Exteriors_Complete_Tileset_32x32', 'mapTiles');
        this.mapGround = this.map.createStaticLayer('suelo', tileSet);
        this.mapBajos = this.map.createStaticLayer('jugEncima', tileSet);
        //this.mapAdornos = this.map.createStaticLayer('jugDebajo', tileSet);
        this.player = new Player(this, 900, 1500, this.numN, this.money, this._myTrust, this.moneyPP);
        let mapObjects = this.map.getObjectLayer(this.objectLayerName).objects;

        
        for (const objeto of mapObjects) {
            const props = {};
            if (objeto.properties) { for (const { name, value } of objeto.properties) { props[name] = value; } }
            //Con esto ponemos bien el punto de origen
            objeto.x += objeto.width / 2;
            objeto.y += objeto.height / 2;
            
            switch (objeto.name) {
                case 'KIO':
                    this[props.nombre] = new kiosk(this, objeto.x, objeto.y, this.player, objeto.width, objeto.height)
                break;
                case 'NPC': //NPC
                this[props.nombre] = new NPC(this,objeto.x,objeto.y,props.nombre,this.player,35,35)
                    break;
                case 'TP':
                    this[props.nombre] = new TP(this, objeto.x, objeto.y, props.id, this.player, objeto.width, objeto.height)
                break;
                case 'ZONA':
                    this[props.nombre] = new ZONE(this, objeto.x, objeto.y, this.player, objeto.width, objeto.height);
                    break; 
                
            }
        }


        this.mapTechos = this.map.createStaticLayer('jugDebajo', tileSet);
        this.mapCollisions = this.map.createStaticLayer('Collisions', tileSet);
        this.mapCollisions.setCollisionBetween(1000, 11000);
        this.physics.add.collider(this.player, this.mapCollisions);
        this.mapCollisions.visible = true;

        //Cámara que sigue al jugador
        this.cameras.main.startFollow(this.player);
        this.cameras.main.width = CT.gameWidth;
        this.cameras.main.height = CT.gameHeight;
        this.cameras.main.zoom = CT.cameraZoom;
        this.cameras.main.setLerp(0.8, 0.8)

        //HUD
        this.ui = new UI(this, this.player);
        this.pauseButton = this.input.keyboard.addKey('ESC');
        this.pauseButton.on('down', () => { 
        });
        

        this.temporizador = new Temporizador(this);

    }


    // Metodos para manejar cambios de las escenas
    changeScene(sceneName = this.nextLevel) {
        this.currentPlaying.stop()
        this.scene.start(sceneName);
    }


    update() {
        if (Phaser.Input.Keyboard.JustDown(this.pauseButton)) { 
            this.player.stopX(); this.player.stopY();
            this.scene.pause();
            this.scene.launch("pauseMenu", {sceneName: 'PrimerDia'});
            this.player.resetInput();

        } 
    }


    finDia(){
        if(this.diaActual != 'SeptimoDia')
        {
            this.scene.start('createNewspaper', {diaActual: this.nextDay,  _money: this.player.getDinero(), _nDay: this.nDay, _confianza: this._myTrust});
        }
        else
        {
            // Cambiar a menu de ganar y perder
        }
    }


}
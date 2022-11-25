import NPC from '../characters/NPC.js';
import Player from '../characters/player.js';
import CT from '../libraries/constants.js';
import UI from '../UI/hud.js';
import Temporizador from '../temporizador/temporizador.js';
import TP from '../TP/teleport.js'
import npc_path from '../characters/npc_path.js';


export default class DIA_DEFAULT extends Phaser.Scene {

    constructor(config) {
        super({ key: 'Dia1' });
        this.objectLayerName = 'PrimerDia';

    }

    init(data)
    {
        this.numN = data._numN;
        this.money = data._money;
        //this.objectLayerName = 'PrimerDia';
    }

    //Aqui te crea todo lo que necesites al inicio para todo el juego
    create() {

        //Mapa
        this.map = this.make.tilemap({
            key: 'tileMap',
            tileWidth: 16,
            tileHeight: 16
        });

        //Mapa - Capas Normales 1 - Parte 1
        let tileSet = this.map.addTilesetImage('Modern_Exteriors_Complete_Tileset', 'mapTiles');
        this.mapGround = this.map.createStaticLayer('Ground', tileSet);
        this.mapBajos = this.map.createStaticLayer('BajosE', tileSet);
        this.mapAdornos = this.map.createStaticLayer('Adornos', tileSet);
        this.player = new Player(this, 900, 1500, this.numN, this.money);
                
        let mapObjects = this.map.getObjectLayer(this.objectLayerName).objects;


        for (const objeto of mapObjects) {
            const props = {};
            if (objeto.properties) { for (const { name, value } of objeto.properties) { props[name] = value; } }
            //Con esto ponemos bien el punto de origen
            objeto.x += objeto.width / 2;
            objeto.y += objeto.height / 2;

            switch (objeto.name) {
                case 'NPC': //NPC
                this[props.nombre] = new NPC(this,objeto.x,objeto.y,props.nombre,this.player,35,35)
                    break;
                case 'TP':
                    this[props.nombre] = new TP(this, objeto.x, objeto.y, props.id, this.player, 35, 35)
                break;
                case 'PATH_NPC':
                    this[props.nombre] = new npc_path(this,objeto.x,objeto.y,this[props.NPC_NAME],objeto.width,objeto.height,
                        props.Next_X,props.Next_Y);
                break;
            }
        }


        this.mapTechos = this.map.createStaticLayer('Techos', tileSet);
        this.mapCollisions = this.map.createStaticLayer('Collisions', tileSet);
        this.mapCollisions.setCollisionBetween(10000, 10053);
        this.physics.add.collider(this.player, this.mapCollisions);
        this.mapCollisions.visible = false;

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
            this.scene.launch("pauseMenu", {sceneName: "Dia1"});
        } 
        
    }


    finDia(){
        this.scene.start('createNewspaper');
    }


}
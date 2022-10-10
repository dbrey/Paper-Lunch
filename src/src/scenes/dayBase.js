import Player from '../characters/player.js';
import CT from '../libraries/constants.js';
import NPCSprite from '../characters/npcSprite.js';
import TPLINK from '../characters/tp.js'
import Trigger from '../libraries/trigger.js'

export default class Scene extends Phaser.Scene {
    init(data) {
        this.points = data.points
    }

    constructor(config) {
        super({ key: config.key });
        this.objectLayerName = config.objectLayerName;
        this.nextLevel = config.nextLevel;

    }
    //Aqui te crea todo lo que necesites al inicio para todo el juego
    create() {
        //Deshabilitar menú contextual
        this.input.mouse.disableContextMenu();

        //Tecla de pantalla completa
        this.fullScreen = this.input.keyboard.addKey(CT.fullscreenKey);
        this.menu = this.input.keyboard.addKey(CT.menuKey)
        this.menuAlt = this.input.keyboard.addKey(CT.menuAltKey)

        //Mapa
        this.map = this.make.tilemap({
            key: 'tileMap',
            tileWidth: 16,
            tileHeight: 16
        });

        //Mapa - Capas Normales 1 - Parte 1
        let tileSet = this.map.addTilesetImage('tiles', 'mapTiles');
        this.mapGround = this.map.createStaticLayer('Ground', tileSet);
        this.mapBorder = this.map.createStaticLayer('Border', tileSet);
        this.mapPathway = this.map.createStaticLayer('Pathway', tileSet);
        this.mapFences = this.map.createStaticLayer('Fences', tileSet);
        this.mapFoundations = this.map.createStaticLayer('Foundations', tileSet);
        this.mapDecorations = this.map.createStaticLayer('Decorations', tileSet);

        //Mapa - Capas Normales 2 - Parte 1
        let tileSetIndoors = this.map.addTilesetImage('tiles_indoors', 'mapTilesIndoors');
        this.bar1 = this.map.createStaticLayer('bar1', tileSetIndoors);
        this.bar2 = this.map.createStaticLayer('bar2', tileSetIndoors);
        this.bar3 = this.map.createStaticLayer('bar3', tileSetIndoors);
        this.mapCarnivalFoundations = this.map.createStaticLayer('Carnival Foundations', tileSetIndoors);

        //Mapa - Capas Normales 3  - Parte 1
        let tileSetCastle = this.map.addTilesetImage('tiles_castle', 'mapTilesCastle');
        this.mapCastleFoundations = this.map.createStaticLayer('Castle Foundations', tileSetCastle);

        //Mapa - Capa De Objetos
        let mapObjects = this.map.getObjectLayer(this.objectLayerName).objects;
        this.tpList = [];
        for (const objeto of mapObjects) {
            const props = {};
            if (objeto.properties) { for (const { name, value } of objeto.properties) { props[name] = value; } }
            //Con esto ponemos bien el punto de origen
            objeto.x += objeto.width / 2;
            objeto.y += objeto.height / 2;
            switch (objeto.name) {
                case 'Player': //Personaje
                    this.player = new Player(this, objeto.x, objeto.y);
                    
                    this.transitionImg = this.add.sprite(CT.transitionX, CT.transitionY, 'tpImg')
                    this.transitionImg.setScrollFactor(0)
                    this.transitionImg.depth = 200;
                    new Trigger({
                        x: objeto.x,
                        y: objeto.y,
                        scene: this,
                        xSize: 100,
                        ySize: 100,
                    })
                    break;
                    case 'Npc': //NPC
                    this[props.dialog] = new NPCSprite(
                        this,
                        objeto.x,
                        objeto.y,
                        props.sprite,
                        props.xTriggerSize,
                        props.yTriggerSize
                    );
                    break;
            }
        }

        //Tp - Capa de Teletransportadores
        let TPs = this.map.getObjectLayer('Tp').objects;


        for (const tp of TPs) {
            tp.x += tp.width / 2;
            tp.y += tp.height / 2;

            const props = {};
            if (tp.properties) { for (const { name, value } of tp.properties) { props[name] = value; } }

            this.tpList.push(new TPLINK(
                {
                    scene: this,
                    transform: tp,
                    link: props.tplink, //Id del otro tp
                    offset: props.offset
                }));
        }


        //Mapa - Capas Normales 3 - Parte 2
        this.mapCastles1 = this.map.createStaticLayer('Castles1', tileSetCastle);
        this.mapCastles2 = this.map.createStaticLayer('Castles2', tileSetCastle);
        this.mapCastleRooftops = this.map.createStaticLayer('Castle Rooftops', tileSetCastle);
        //Mapa - Capas Normales 2 - Parte 2
        this.mapCarnival = this.map.createStaticLayer('Carnival', tileSetIndoors);
        //Mapa - Capas Normales 1 - Parte 2
        this.mapBuildings = this.map.createStaticLayer('Buildings', tileSet);
        this.mapRooftops = this.map.createStaticLayer('Rooftops', tileSet);
        this.mapCollisions = this.map.createStaticLayer('Collisions', tileSet);
        this.mapCollisions.setCollisionBetween(0, 999);
        this.physics.add.collider(this.player, this.mapCollisions);
        this.mapCollisions.visible = false;

        //Cámara que sigue al jugador
        this.cameras.main.startFollow(this.player);
        this.cameras.main.width = CT.gameWidth;
        this.cameras.main.height = CT.gameHeight;
        this.cameras.main.zoom = CT.cameraZoom;
        this.cameras.main.setLerp(0.9, 0.9)

        this.fadeOut()

    }


    // Metodos para manejar cambios de las escenas
    changeScene(sceneName = this.nextLevel) {
        this.fadeIn()
        this.currentPlaying.stop()
        this.loadScene(sceneName)
    }

    loadScene(sceneName, delay = CT.fadeInTime) {
        this.time.addEvent({
            callback: () => {
                this.scene.start(sceneName, {
                    points: this.align.points,
                    musicVolume: this.musicList[0].volume,
                    soundVolume: this.soundList[0].volume,
                    inventorySlots: this.player.inventory.slots
                });
            },
            delay: delay
        })
    }

    fadeIn(onComplete) {
        this.tweens.add({
            targets: this.transitionImg,
            duration: CT.fadeInTime,
            alpha: 1,
            ease: 'Circ',
            onComplete: () =>{
                if(onComplete) onComplete();
            }
        })
    }

    fadeOut() {
        this.tweens.add({
            targets: this.transitionImg,
            duration: CT.fadeOutTime,
            alpha: 0,
            ease: 'Circ',
        })
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.fullScreen)) {
            this.scale.toggleFullscreen()
        }
    }

    
}
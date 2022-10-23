import Player from '../characters/player.js';
import CT from '../libraries/constants.js';
import NPCSprite from '../characters/NPC.js';

export default class DIA_DEFAULT extends Phaser.Scene {

    constructor(config) {
        super({ key: config.key });
        this.objectLayerName = config.objectLayerName;
        this.nextLevel = config.nextLevel;

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
        for (const objeto of mapObjects) {
            const props = {};
            if (objeto.properties) { for (const { name, value } of objeto.properties) { props[name] = value; } }
            //Con esto ponemos bien el punto de origen
            objeto.x += objeto.width / 2;
            objeto.y += objeto.height / 2;
            switch (objeto.name) {
                case 'Player': //Personaje
                    this.player = new Player(this, objeto.x, objeto.y);
                
                    break;
                    case 'Npc': //NPC
                    this[props.dialog] = new NPCSprite(
                        this,
                        objeto.x,
                        objeto.y,
                        props.sprite
                    );
                    break;
            }
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


    }


    // Metodos para manejar cambios de las escenas
    changeScene(sceneName = this.nextLevel) {
        this.currentPlaying.stop()
        this.scene.start(sceneName);
    }


    update() {
    }

    
}
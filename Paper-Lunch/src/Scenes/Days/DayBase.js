import Player from '../../GameObjects/Characters/Player/player.js'
import CT from '../../configs/constants.js'
import Dialog from '../../configs/dialogConfig.js';
import NPCDialog from '../../GameObjects/Characters/Npcs/npcDialog.js'
import TPLINK from '../../GameObjects/Characters/Player/tp.js'
import Trigger from '../../libraries/trigger.js'
import Dialoguer from '../../libraries/dialoguer.js'
import DialogImage from '../../libraries/DialogImage.js'

/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor(config) {
    super({ key: config.key });
    this.dialogs = config.dialog;
    this.objectLayerName = config.objectLayerName;
    this.nextLevel = config.nextLevel;
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
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
      this.tpList = [];
      this.musicList = [];
      this.currentPlaying = {};
      for (const objeto of mapObjects) {
          const props = {};
          if (objeto.properties) { for (const { name, value } of objeto.properties) { props[name] = value; } }
          //Con esto ponemos bien el punto de origen
          objeto.x += objeto.width / 2;
          objeto.y += objeto.height / 2;
          switch (objeto.name) {
            case 'Player': //Personaje
                this.player = new Player(this, objeto.x, objeto.y, this.missions);
                if(this.inventorySlots)this.player.inventory.slots = this.inventorySlots;
                this.transitionImg = this.add.sprite(CT.transitionX, CT.transitionY, 'tpImg')
                this.transitionImg.setScrollFactor(0)
                this.transitionImg.depth = 200;
                new Trigger({
                    x: objeto.x,
                    y: objeto.y,
                    scene: this,
                    xSize: 100,
                    ySize: 100,
                    enter: () => {
                        if (this.player.missionList.allMissionsCompleted()) {
                            new Dialoguer({
                                x: objeto.x,
                                y: objeto.y,
                                xSize: 100,
                                ySize: 100,
                                scene: this,
                                dialog: this.dialogs.player,
                                isForced: true,
                                onStart: () => {
                                    this.tweens.add({
                                        targets: this.player,
                                        duration: 250,
                                        y: this.player.y - 15,
                                        x: this.player.x + 15,
                                    })
                                },
                            });
                        }
                    },
                })
              break;
            case 'Item': //Objetos en el suelo
                this.dropped = new DroppedItem(this, objeto.x, objeto.y, parseInt(objeto.type));
                break;
            case 'Obstacle': //Obstáculo (entidad en la que se usa un objeto)
                this[props.dialog] = new DialogImage(this, objeto, this.dialogs[props.dialog], props.sprite)
                break;
            case 'Npc': //NPC
                this[props.dialog] = new NPCDialog({
                    scene: this,
                    x: objeto.x,
                    y: objeto.y,
                    dialog: this.dialogs[props.dialog],
                    sprite: props.sprite,
                    pathName: props.path,
                    xTriggerSize: props.xTriggerSize,
                    yTriggerSize: props.yTriggerSize,
                    offset: props.offset,
                });
                break;
            case 'Music':
              this[props.music] = this.sound.add(props.music, CT.backgroundMusic)
              this.musicList.push(this[props.music])

              new Trigger({
              x: objeto.x,
              y: objeto.y,
              scene: this,
              xSize: objeto.width,
              ySize: objeto.height,
              enter: () => {
                  this.currentPlaying = this[props.music]
                  this[props.music].play()
              },
              exit: () => { this[props.music].stop(); },
              stay: () => { },
          })
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




    //Cámara que sigue al jugador
    this.cameras.main.startFollow(this.player);
    this.cameras.main.width = CT.gameWidth;
    this.cameras.main.height = CT.gameHeight;
    this.cameras.main.zoom = CT.cameraZoom;
    this.cameras.main.setLerp(0.9, 0.9)
  }


  createTileMap() {
    this.map1 = this.make.tilemap({
      key: 'level1',
      tileWidth: 16,
      tileHeight: 16
    });
    const tileset1 = this.map1.addTilesetImage('tilesetForest', 'patronesLevel1');

    
    // //this.backgroundLayer = this.map.createLayer('Background', tileset1);
    // this.groundLayer = this.map1.createLayer('Suelo', tileset1);
    // this.physics.add.collider(this.player, this.groundLayer);
    // this.groundLayer.setCollisionBetween(0, 999);

  }

  update() {
    
  }
}
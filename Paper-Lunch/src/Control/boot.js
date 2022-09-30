/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación

    this.load.setPath('/assets/sprites/');
    // Carga de spritesheets
    this.load.spritesheet('protagonist', 'notnessprota.png', {
      frameWidth: 28,
      frameHeight: 40
    });
    this.load.spritesheet('player','player.png', { frameWidth: 32, frameHeight: 32 });

    //Mapa
    this.load.setPath('/src/Tilemap/');
    this.load.tilemapTiledJSON('tileMap', 'map.json');

    this.load.setPath('/assets/map/');
    this.load.image('mapTiles', 'tiles.png');
    this.load.image('mapTilesIndoors', 'tiles_indoors.png');
    this.load.image('mapTilesCastle', 'tiles_castle.png');
    
    //NPCs
    this.load.setPath('/assets/NPCs/')
    this.load.spritesheet('leandro', 'leandro.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('coronel', 'coronel.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('dictador', 'dictador.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('cura', 'cura.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('ladron', 'ladron.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('anciano', 'anciano.png', { frameWidth: 32, frameHeight: 32 });

    this.load.spritesheet('feriante', 'feriante.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('ferianta', 'ferianta.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('ferianteHijo', 'hijoFeriante.png', { frameWidth: 32, frameHeight: 32 });

    this.load.spritesheet('loco', 'loco.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('embajador', 'embajador.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('embajadora', 'embajadora.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('srtaEmbajadora', 'srtaEmbajadora.png', { frameWidth: 32, frameHeight: 32 });

    this.load.spritesheet('carcelero', 'carcelero.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('lolaMento', 'lolaMento.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('srtaMento', 'srtaMento.png', { frameWidth: 32, frameHeight: 32 });

    this.load.spritesheet('empeñista', 'empeñista.png', { frameWidth: 32, frameHeight: 32 });

    this.load.spritesheet('paca', 'paca.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('sona', 'sona.png', { frameWidth: 32, frameHeight: 32 });

    this.load.spritesheet('tabernero', 'tabernero.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('tabernera', 'tabernera.png', { frameWidth: 32, frameHeight: 32 });

    //NPCs decorativos
    this.load.spritesheet('npc1', 'npc1.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('npc2', 'npc2.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('npc3', 'npc3.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('npc4', 'npc4.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('npc5', 'npc5.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('npc6', 'npc6.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('npc7', 'npc7.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('npc8', 'npc8.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('npc9', 'npc9.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('crowd', 'crowd.png');


    this.load.setPath('assets/gui/dialog')
    //Fondo de dialogo
    this.load.spritesheet('dialogFinal', 'dialogBackground.png', { frameWidth: 900, frameHeight: 300 });

    //Fondo de sub-dialogo
    this.load.image('arrow', 'dialogArrow.png');
    
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('day0', {
      points: 0,
      musicVolume: 0,
      soundVolume: 0
    });
  }
}
export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' });
  }

  //Este .js solo sirve para cargar recursos y dar comienzo a la escena

  preload() {
    let width = this.cameras.main.width;
    let height = this.cameras.main.height;

    //Pantalla en negro al teletransportar
    this.load.image('tpImg', 'assets/sprites/tpTransition.png');

    //Jugador
    this.load.spritesheet('player', 'assets/sprites/NPCs/police.png', { frameWidth: 32, frameHeight: 32 });

    //NPCs
    

    this.load.spritesheet('leandro', 'assets/sprites/NPCs/leandro.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('coronel', 'assets/sprites/NPCs/coronel.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('dictador', 'assets/sprites/NPCs/dictador.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('cura', 'assets/sprites/NPCs/cura.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('ladron', 'assets/sprites/NPCs/ladron.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('anciano', 'assets/sprites/NPCs/anciano.png', { frameWidth: 32, frameHeight: 32 });

    this.load.spritesheet('feriante', 'assets/sprites/NPCs/feriante.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('ferianta', 'assets/sprites/NPCs/ferianta.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('ferianteHijo', 'assets/sprites/NPCs/hijoFeriante.png', { frameWidth: 32, frameHeight: 32 });

    this.load.spritesheet('loco', 'assets/sprites/NPCs/loco.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('embajador', 'assets/sprites/NPCs/embajador.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('embajadora', 'assets/sprites/NPCs/embajadora.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('srtaEmbajadora', 'assets/sprites/NPCs/srtaEmbajadora.png', { frameWidth: 32, frameHeight: 32 });

    this.load.spritesheet('carcelero', 'assets/sprites/NPCs/carcelero.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('lolaMento', 'assets/sprites/NPCs/lolaMento.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('srtaMento', 'assets/sprites/NPCs/srtaMento.png', { frameWidth: 32, frameHeight: 32 });

    this.load.spritesheet('empeñista', 'assets/sprites/NPCs/empeñista.png', { frameWidth: 32, frameHeight: 32 });

    this.load.spritesheet('paca', 'assets/sprites/NPCs/paca.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('sona', 'assets/sprites/NPCs/sona.png', { frameWidth: 32, frameHeight: 32 });

    this.load.spritesheet('tabernero', 'assets/sprites/NPCs/tabernero.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('tabernera', 'assets/sprites/NPCs/tabernera.png', { frameWidth: 32, frameHeight: 32 });

    //NPCs decorativos
    this.load.spritesheet('npc1', 'assets/sprites/NPCs/npc1.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('npc2', 'assets/sprites/NPCs/npc2.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('npc3', 'assets/sprites/NPCs/npc3.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('npc4', 'assets/sprites/NPCs/npc4.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('npc5', 'assets/sprites/NPCs/npc5.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('npc6', 'assets/sprites/NPCs/npc6.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('npc7', 'assets/sprites/NPCs/npc7.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('npc8', 'assets/sprites/NPCs/npc8.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('npc9', 'assets/sprites/NPCs/npc9.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('crowd', 'assets/sprites/NPCs/crowd.png');

    // UI
    this.load.image('playButton', 'assets/sprites/UI/play_button.png');
    this.load.image('optionsButton', 'assets/sprites/UI/options_button.png');
    this.load.image('goBackButton', 'assets/sprites/UI/go_back_button.png');
    
    this.load.image('playButtonMouseOn', 'assets/sprites/UI/play_button_mouse_on.png');
    this.load.image('optionsButtonMouseOn', 'assets/sprites/UI/options_button_mouse_on.png');
    this.load.image('goBackButtonMouseOn', 'assets/sprites/UI/go_back_button_mouse_on.png');

    //Mapa
    this.load.tilemapTiledJSON('tileMap', 'assets/tilemap/map.json');
    this.load.image('mapTiles', 'assets/sprites/map/tiles.png');
    this.load.image('mapTilesIndoors', 'assets/sprites/map/tiles_indoors.png');
    this.load.image('mapTilesCastle', 'assets/sprites/map/tiles_castle.png');

    //Fuente
    this.load.bitmapFont('font', 'assets/fonts/mainFont.png', 'assets/fonts/mainFont.fnt');

    // Logo
    this.load.image('logo', 'assets/sprites/MangoGamesLogo.png');
    
  }

  create() { this.scene.start('menu'); }
}
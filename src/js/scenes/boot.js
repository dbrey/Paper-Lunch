export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' });
  }

  //Este .js solo sirve para cargar recursos y dar comienzo a la escena

  preload() {
    //Jugador
    this.load.spritesheet('Player', 'assets/sprites/player.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('Rodolfo', 'assets/sprites/NPC.png', { frameWidth: 64, frameHeight: 66 });

    // UI
    this.load.image('playButton', 'assets/sprites/UI/play_button.png');
    this.load.image('optionsButton', 'assets/sprites/UI/options_button.png');
    this.load.image('goBackButton', 'assets/sprites/UI/go_back_button.png');
    this.load.image('resumeButton', 'assets/sprites/UI/resume_button.png');
    this.load.image('menuButton', 'assets/sprites/UI/menu_button.png');
    

    this.load.image('playButtonMouseOn', 'assets/sprites/UI/play_button_mouse_on.png');
    this.load.image('optionsButtonMouseOn', 'assets/sprites/UI/options_button_mouse_on.png');
    this.load.image('goBackButtonMouseOn', 'assets/sprites/UI/go_back_button_mouse_on.png');
    this.load.image('resumeButtonMouseOn', 'assets/sprites/UI/resume_button_mouse_on.png');
    this.load.image('menuButtonMouseOn', 'assets/sprites/UI/menu_button_mouse_on.png');

    this.load.image('newspaperImg', 'assets/sprites/UI/newspaperUI.png');
    this.load.image('coinImg', 'assets/sprites/UI/monedaUI.png');

    //Mapa
    this.load.tilemapTiledJSON('tileMap', 'assets/tilemap/tiles.json');
    this.load.image('mapTiles', 'assets/sprites/tileset/Modern_Exteriors_16x16/Modern_Exteriors_Complete_Tileset.png');

    //Fuente
    this.load.bitmapFont('font', 'assets/fonts/mainFont.png', 'assets/fonts/mainFont.fnt');

    // Fondos
    this.load.spritesheet('mainmenu', 'assets/sprites/background.png', { frameWidth: 480, frameHeight: 254 });

    // Logo
    this.load.image('logo', 'assets/sprites/MangoGamesLogo.png');
    
  }

  create() { this.scene.start('menu'); }
}
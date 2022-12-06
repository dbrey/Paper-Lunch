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
    this.load.image('backgroundOptionsPause', 'assets/sprites/UI/backgroundOptionsPause.png');
    this.load.image('backgroundNewspaper', 'assets/sprites/UI/newspaper_background.png');
    

    this.load.image('playButtonMouseOn', 'assets/sprites/UI/play_button_mouse_on.png');
    this.load.image('optionsButtonMouseOn', 'assets/sprites/UI/options_button_mouse_on.png');
    this.load.image('goBackButtonMouseOn', 'assets/sprites/UI/go_back_button_mouse_on.png');
    this.load.image('resumeButtonMouseOn', 'assets/sprites/UI/resume_button_mouse_on.png');
    this.load.image('menuButtonMouseOn', 'assets/sprites/UI/menu_button_mouse_on.png');

    this.load.image('newspaperImg', 'assets/sprites/UI/newspaperUI.png');
    this.load.image('coinImg', 'assets/sprites/UI/monedaUI.png');
    this.load.image('cuadroHUD', 'assets/sprites/UI/cuadroHUD.png');
    this.load.image('cuadroTemp', 'assets/sprites/UI/cuadroTemp.png');

    //TP
    this.load.image('metroMap','assets/sprites/UI/MapaMetro.png');
    this.load.image('selectionTp', 'assets/sprites/UI/selectionTp.png');
    this.load.image('selectionTpOn', 'assets/sprites/UI/selectionTpOn.png');

    //Mapa
    this.load.tilemapTiledJSON('tileMap', 'assets/tilemap/tiles.json');
    this.load.image('mapTiles', 'assets/sprites/tileset/Modern_Exteriors_16x16/Modern_Exteriors_Complete_Tileset.png');

    //Fuente
    this.load.bitmapFont('font', 'assets/fonts/mainFont.png', 'assets/fonts/Inkbit.ttf');

    // Fondos
    this.load.spritesheet('mainmenu', 'assets/sprites/background.png', { frameWidth: 480, frameHeight: 254 });

    // Logo
    this.load.image('logo', 'assets/sprites/MangoGamesLogo.png');

    //Periodicos
    this.load.image('newspaper', 'assets/sprites/creatingNews/periodico.jpg');
    this.load.image('news1','assets/sprites/creatingNews/periodico 1.png');
    this.load.image('news2','assets/sprites/creatingNews/periodico 2.png');
    this.load.image('news3','assets/sprites/creatingNews/periodico 3.png');
    this.load.image('news4','assets/sprites/creatingNews/periodico 4.png');
    this.load.json('newsData','assets/PInfo.json');
    //Anuncios
    this.load.image('adBlocked', 'assets/sprites/creatingNews/anuncio bloqueado.png');
    this.load.image('Ad1', 'assets/sprites/creatingNews/anuncioCC.png');
    this.load.image('Ad2', 'assets/sprites/creatingNews/anuncioLE.png');
    this.load.image('Ad3', 'assets/sprites/creatingNews/anuncioPF.png');
    this.load.image('Ad4', 'assets/sprites/creatingNews/anuncioCH.png');
    //Distritos
    this.load.image('simEsp', 'assets/sprites/creatingNews/banderaESP.png');
    this.load.image('simVeg', 'assets/sprites/creatingNews/banderaVEG.png');
    this.load.image('simIta', 'assets/sprites/creatingNews/banderaIT.png');
    this.load.image('simJap', 'assets/sprites/creatingNews/banderaJAP.png');
    //Flechas y  tick
    this.load.image('arrowUp', 'assets/sprites/creatingNews/arrowUp.png');
    this.load.image('arrowDown', 'assets/sprites/creatingNews/arrow Down.png');
    this.load.image('tick', 'assets/sprites/creatingNews/tick.png');
    //Boton continuar
    this.load.image('continueButtonBlocked', 'assets/sprites/creatingNews/contButtonBlocked.png');
    this.load.image('continueButton', 'assets/sprites/creatingNews/continueButton.png');
    //Decoracion de la escena
    this.load.image('titleRect', 'assets/sprites/creatingNews/recuadroTitulo.png');
    this.load.image('Recuadro','assets/sprites/creatingNews/Recuadro.png');
    this.load.image('BackgroundP','assets/sprites/creatingNews/FondoMasMejor.png');
    this.load.image('Total','assets/sprites/creatingNews/BarraTotal.png')
  }

  create() { this.scene.start('menu'); }
}
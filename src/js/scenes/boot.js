export default class Boot extends Phaser.Scene {
  constructor() {
    super({ key: 'boot' });
  }

  //Este .js solo sirve para cargar recursos y dar comienzo a la escena

  preload() {
    //Jugador
    this.load.spritesheet('Player', 'assets/sprites/ameliaV2.png', { frameWidth: 36, frameHeight: 56 });

    // UI
    this.load.image('playButton', 'assets/sprites/UI/play_button.png');
    this.load.image('optionsButton', 'assets/sprites/UI/options_button.png');
    this.load.image('goBackButton', 'assets/sprites/UI/go_back_button.png');
    this.load.image('resumeButton', 'assets/sprites/UI/resume_button.png');
    this.load.image('menuButton', 'assets/sprites/UI/menu_button.png');
    this.load.image('backgroundOptionsPause', 'assets/sprites/UI/backgroundOptionsPause.png');
    this.load.image('backgroundNewspaper', 'assets/sprites/UI/newspaper_background.png');
    this.load.image('eButton','assets/sprites/UI/EBoton.png');

    this.load.image('playButtonMouseOn', 'assets/sprites/UI/play_button_mouse_on.png');
    this.load.image('optionsButtonMouseOn', 'assets/sprites/UI/options_button_mouse_on.png');
    this.load.image('goBackButtonMouseOn', 'assets/sprites/UI/go_back_button_mouse_on.png');
    this.load.image('resumeButtonMouseOn', 'assets/sprites/UI/resume_button_mouse_on.png');
    this.load.image('menuButtonMouseOn', 'assets/sprites/UI/menu_button_mouse_on.png');

    this.load.image('newspaperImg', 'assets/sprites/UI/newspaperUI.png');
    this.load.image('coinImg', 'assets/sprites/UI/monedaUI.png');
    this.load.image('cuadroHUD', 'assets/sprites/UI/cuadroHUD.png');
    this.load.image('cuadroTemp', 'assets/sprites/UI/cuadroTemp.png');

    this.load.image('UpVolV1', 'assets/sprites/UI/UpButtonVolume_V1.png');
    this.load.image('UpVolV2', 'assets/sprites/UI/UpButtonVolume_V2.png');
    this.load.image('DownVolV1', 'assets/sprites/UI/DownButtonVolume_V1.png');
    this.load.image('DownVolV2', 'assets/sprites/UI/DownButtonVolume_V2.png');
    this.load.image('UnMute', 'assets/sprites/UI/Unmute_Button.png');
    this.load.image('Mute', 'assets/sprites/UI/Mute_Button.png');

    this.load.image('BarraRoja', 'assets/sprites/UI/MarcoJapones.png');
    this.load.image('BarraAzul', 'assets/sprites/UI/MarcoVegano.png');
    this.load.image('BarraVerde', 'assets/sprites/UI/MarcoItaliano.png');
    this.load.image('BarraAmarilla', 'assets/sprites/UI/MarcoEspanol.png');
    this.load.spritesheet('BarraConfianza', 'assets/sprites/UI/barraConfianza.png', {frameWidth: 20, frameHeight: 75});
    
    this.load.image('miniMap', 'assets/sprites/UI/Mapa.png');
    this.load.image('leyenda', 'assets/sprites/UI/Leyend.png');

    this.load.image('bus', 'assets/sprites/UI/bus.png');
    this.load.image('kiosko', 'assets/sprites/UI/kiosko.png');




    this.load.image('dialogBar', 'assets/sprites/UI/dialogBar.png');


    //TP
    this.load.image('metroMap','assets/sprites/minimap.png');
    this.load.image('selectionTp', 'assets/sprites/UI/selectionTp.png');
    this.load.image('selectionTpOn', 'assets/sprites/UI/selectionTpOn.png');

    //Mapa
    this.load.tilemapTiledJSON('tileMap', 'assets/tilemap/newmap/tilemapPL.json');
    this.load.image('mapTiles', 'assets/sprites/tileset/Modern_Exteriors_32x32/Modern_Exteriors_Complete_Tileset_32x32.png');

    //Fuente
    this.load.bitmapFont('font', 'assets/fonts/mainFont.png', 'assets/fonts/Inkbit.ttf');

    // Fondos
    this.load.spritesheet('mainmenu', 'assets/sprites/city_spritesheet.png', { frameWidth: 320, frameHeight: 180 });
    this.load.image('optionsBackground', 'assets/sprites/optionsBackground.jpg');

    // Logo
    this.load.image('logo', 'assets/sprites/paperlunchLogo.png');

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
    this.load.image('arrowDown', 'assets/sprites/creatingNews/arrowDown.png');
    this.load.image('tick', 'assets/sprites/creatingNews/tick.png');
    //Boton continuar
    this.load.image('continueButtonBlocked', 'assets/sprites/creatingNews/contButtonBlocked.png');
    this.load.image('continueButton', 'assets/sprites/creatingNews/continueButton.png');
    //Decoracion de la escena
    this.load.image('titleRect', 'assets/sprites/creatingNews/recuadroTitulo.png');
    this.load.image('Recuadro','assets/sprites/creatingNews/Recuadro.png');
    this.load.image('BackgroundP','assets/sprites/creatingNews/FondoMasMejor.png');

    this.load.image('Total','assets/sprites/creatingNews/BarraTotal.png');
 
    // Sonidos y soundtrack
    this.load.audio('mainMenuSoundtrack', 'assets/sounds/TheLunch.wav');
    this.load.audio('selPeriod', 'assets/sounds/SelPeriod.wav');
    this.load.audio('newsSoundtrack', 'assets/sounds/SandPaper.wav');

    this.load.audio('click', 'assets/sounds/StartSound.wav');
    this.load.audio('numKey', 'assets/sounds/NumKeyPressed.wav');
    this.load.audio('sold', 'assets/sounds/Sold.wav');
    
    this.load.audio('click', 'assets/sounds/click_sound_effect.mp3');

    // Npcs
    this.load.spritesheet('aliade', 'assets/sprites/npcs/aliade.png', { frameWidth: 32, frameHeight: 52 });
    this.load.spritesheet('auronplay', 'assets/sprites/npcs/auronplay.png', { frameWidth: 32, frameHeight: 52 });
    this.load.spritesheet('lacoletas', 'assets/sprites/npcs/lacoletas.png', { frameWidth: 32, frameHeight: 52 });
    this.load.spritesheet('messi', 'assets/sprites/npcs/messi.png', { frameWidth: 32, frameHeight: 52 });
    this.load.spritesheet('NinoPeroCascos', 'assets/sprites/npcs/NinoPeroCascos.png', { frameWidth: 32, frameHeight: 46 });
    this.load.spritesheet('NinoPeroChef', 'assets/sprites/npcs/NinoPeroChef.png', { frameWidth: 32, frameHeight: 52 });
    this.load.spritesheet('NinoPeroChef2', 'assets/sprites/npcs/NinoPeroChef2.png', { frameWidth: 32, frameHeight: 52 });
    this.load.spritesheet('NinoPeroChef3', 'assets/sprites/npcs/NinoPeroChef3.png', { frameWidth: 32, frameHeight: 52 });
    this.load.spritesheet('NinoPeroChef4', 'assets/sprites/npcs/NinoPeroChef4.png', { frameWidth: 32, frameHeight: 52 });
    this.load.spritesheet('niñoCabezon', 'assets/sprites/npcs/niñoCabezon.png', { frameWidth: 32, frameHeight: 52 });
    this.load.spritesheet('niñoflequillo', 'assets/sprites/npcs/niñoflequillo.png', { frameWidth: 32, frameHeight: 52 });
    this.load.spritesheet('Oficinista', 'assets/sprites/npcs/Oficinista.png', { frameWidth: 32, frameHeight: 54 });
    this.load.spritesheet('rubiacoletas', 'assets/sprites/npcs/rubiacoletas.png', { frameWidth: 32, frameHeight: 52 });
    this.load.spritesheet('señora1', 'assets/sprites/npcs/señora1.png', { frameWidth: 32, frameHeight: 52 });
    this.load.spritesheet('señorPendiente', 'assets/sprites/npcs/señorPendiente.png', { frameWidth: 32, frameHeight: 52 });
    this.load.spritesheet('UnOtaku_1', 'assets/sprites/npcs/UnOtaku_1.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('UnViejo_1', 'assets/sprites/npcs/UnViejo_1.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() { this.scene.start('menu', {_mainVolume: 1, _effectsVolume: 1,_continue: false, _isMainMute: false, _isEffectsMute: false}); }
}
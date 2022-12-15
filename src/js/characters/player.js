
export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, _numN, _money, _myTrust, _moneyPP) {
    super(scene, x, y);

    // Añadirlo a la escena
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.body.setSize(36, 45,false);

    //Input para el movimiento
    const { LEFT, RIGHT, UP, DOWN, W, A, S, D ,SHIFT} = Phaser.Input.Keyboard.KeyCodes;
    this.cursors = scene.input.keyboard.addKeys({
      left: A,
      right: D,
      up: W,
      down: S,
      shift : SHIFT
    })

    this.action = scene.input.keyboard.addKey('E');
    this.alreadyShown=false;

    // Variables para el juego
    this.speed = 175;
    this.dinero = _money;
    this.confianza = _myTrust;
    this.periodicos = _numN;
    this.anteriorMovimiento = {x : 0, y:0};
    this.dineroXperiodico = _moneyPP;
    this.currentDistrict;

    this.canMove = true;

    //ANIMACIONES    
    scene.anims.create({
      key: 'left',
      frames: scene.anims.generateFrameNumbers('Player', { start: 16, end: 19 }),
      frameRate: 7,
      repeat: -1
    });
    scene.anims.create({
      key: 'idleLeft',
      frames: scene.anims.generateFrameNumbers('Player', { start: 16, end: 16 }),
      repeat: 0
    });

    scene.anims.create({
      key: 'up',
      frames: scene.anims.generateFrameNumbers('Player', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: 'idleUp',
      frames: scene.anims.generateFrameNumbers('Player', { start: 8, end: 8 }),
      repeat: 0
    });
    scene.anims.create({
      key: 'idleDown',
      frames: scene.anims.generateFrameNumbers('Player', { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1
    });

    scene.anims.create({
      key: 'down',
      frames: scene.anims.generateFrameNumbers('Player', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: 'right',
      frames: scene.anims.generateFrameNumbers('Player', { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1
    });
    scene.anims.create({
      key: 'idleRight',
      frames: scene.anims.generateFrameNumbers('Player', { start: 12, end: 12 }),
      repeat: 0
    });
  }
  
  getInteract() {
    return this.action.DOWN;
  }


  /*
    Dependiendo del input que reciba, se movera a la direccion especificada. Si no recibe ningun input, no pasa nada
    Guardamos el movimiento anterior antes de actualizarlo, para las animaciones
  */
  calculateVelocity() {

    let dirY = 0;
    let dirX = 0;
    //Arriba
    if (this.cursors.up.isDown) 
      dirY = -1;
    //Abajo
    if (this.cursors.down.isDown)
      dirY = 1;
    //Izquierda
    if (this.cursors.left.isDown)
      dirX = -1;
    //Derecha
    if (this.cursors.right.isDown)
      dirX = 1;


    this.auxSpeed = this.speed;  
    if(this.cursors.shift.isDown)
      this.auxSpeed*=1.75;

    let object = { x: dirX, y: dirY }


    //Normalizamos el vector por si nos vamos a mover en diagonal
    if (!(object.x === 0 && object.y === 0)){
      let x = Math.sqrt(object.x * object.x + object.y * object.y);
  
      object.x /= x;
      object.y /= x;
    }

    if(object.x!=0 || object.y!=0)
      this.anteriorMovimiento = object;

    this.body.setVelocityX(object.x * this.auxSpeed);
    this.body.setVelocityY(object.y * this.auxSpeed);
  }

  //Metodos para obligar a parar al jugador
  stopX() {
    this.body.setVelocityX(0);
  }

  stopY() {
    this.body.setVelocityY(0);
  }

  //Resetea el input
  resetInput(){
    this.cursors.left.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
    this.cursors.right.reset();
    this.action.reset();
  }

  // Metodos para conseguir y cambiar el dinero y confianza del jugador
  getDinero() {
    return this.dinero;
  }


  compraPeriodicos(nPeriodicos){
    this.periodicos-=nPeriodicos;

    this.dinero += this.dineroXperiodico * nPeriodicos; // DEPENDERA DE CUANTO CUESTA CADA PERIODICO
    this.scene.ui.updateDinero();
    this.scene.ui.updateNumPeriodicos();
    this.scene.playSound("sold")
  }


  //Devuelve el número de periódicos
  numeroPeriodicos(){
    return this.periodicos;
  }


  //Devuelve la confianza del barrio en el que nos encontramos
  getConfianza() {
    return this.confianza[this.currentDistrict];
  }

  //Devuelve la confianza del barrio que se indique por parámetro
  getConfianzaInZone(id){
    return this.confianza[id];
  }

  //Actualiza el barrio en el que nos encontramos
  setDistrict(id){
    this.currentDistrict=id;
  }

  //Aumenta el dinero con la cantidad que se pasa como parámetro y se actualiza la UI
  changeDinero(amount) {
    this.dinero += amount;
    this.scene.ui.updateDinero();
  }

  //Muestra la tecla interactuable si nos encontramos cerca de un Npc.
  showInteractable(){
    if(!this.alreadyShown){
      this.scene.ui.showInteractive();
      this.alreadyShown=true;
    }
  }

  //Desactiva el interactuable
  removeInteractable(){
    if(this.alreadyShown){
      this.scene.ui.removeInteractive();
      this.alreadyShown=false;
    }
  }

  // Chequeamos la velocidad del juegador y cambiamos su animacion
  // En caso de que no se mueva, comprobamos su movimiento anterior y mantenemos su animacion (Para que no haya una animacion por defecto)
  checkAnims() {

    if (this.body.newVelocity.x === 0) {
      //Si esta quieto
      if (this.body.newVelocity.y === 0){

        if(this.anteriorMovimiento.x ==0 ){
          if(this.anteriorMovimiento.y==1) this.play('idleDown', true);
          else this.play('idleUp', true);
        }
        else if(this.anteriorMovimiento.y==0){
          if(this.anteriorMovimiento.x==1)  this.play('idleRight', true);
          else  this.play('idleLeft', true);
        }
      }
       
      //Arriba
      else if (this.body.newVelocity.y < 0)
        this.play('up', true);
      //Abajo
      else
        this.play('down', true);
    }
    //Izquierda
    else if (this.body.newVelocity.x < 0)
      this.play('left', true);
    //Derecha
    else
      this.play('right', true);

  }
  preUpdate(t, d) {
    //Llamamos al super para las animaciones
    super.preUpdate(t, d);
    
    if(this.periodicos <= 0)
      this.scene.finDia();

    //Al principio de cada preUpdate, el Player se para
    this.stopX()
    this.stopY()

    if(this.canMove){
    //Calculas la velocidad
      this.calculateVelocity()
    }

    //Y realizas la animacion
      this.checkAnims();
  }


  //Cambia el estado del player
  changePlayerState(move){
    this.canMove = move;
  }



}

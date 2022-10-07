import { normalizeVector } from "../libraries/mathFunc.js";

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.speed = 300;

    //Input para el movimiento
    const { LEFT, RIGHT, UP, DOWN, W, A, S, D } = Phaser.Input.Keyboard.KeyCodes;
    this.cursors = scene.input.keyboard.addKeys({
      left: A,
      right: D,
      up: W,
      down: S
    })
    this.action = scene.input.keyboard.addKey('E');

    this.anteriorMovimiento = {x : 0, y:0};

    //ANIMACIONES    
    scene.anims.create({
      key: 'left',
      frames: scene.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
      frameRate: 7,
      repeat: -1
    });
    scene.anims.create({
      key: 'idleLeft',
      frames: scene.anims.generateFrameNumbers('player', { start: 3, end: 3 }),
      repeat: 0
    });

    scene.anims.create({
      key: 'up',
      frames: scene.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
      frameRate: 7,
      repeat: -1
    });
    scene.anims.create({
      key: 'idleUp',
      frames: scene.anims.generateFrameNumbers('player', { start: 10, end: 10 }),
      repeat: 0
    });
    scene.anims.create({
      key: 'idle',
      frames: scene.anims.generateFrameNumbers('player', { start: 1, end: 1 }),
      frameRate: 7,
      repeat: -1
    });

    scene.anims.create({
      key: 'down',
      frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
      frameRate: 7,
      repeat: -1
    });
    scene.anims.create({
      key: 'right',
      frames: scene.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
      frameRate: 7,
      repeat: -1
    });
    scene.anims.create({
      key: 'idleRight',
      frames: scene.anims.generateFrameNumbers('player', { start: 6, end: 6 }),
      repeat: 0
    });
  }


  calculateVelocity() {

    let dirY = 0;
    let dirX = 0;
    //Arriba
    if (this.cursors.up.isDown) {
      dirY = -1;
    }
    //Abajo
    if (this.cursors.down.isDown) {
      dirY = 1;
    }
    //Izquierda
    if (this.cursors.left.isDown) {
      dirX = -1;
    }
    //Derecha
    if (this.cursors.right.isDown) {
      dirX = 1;
    }

    let object = { x: dirX, y: dirY }

    if(object.x!=0 || object.y!=0)
      this.anteriorMovimiento = object;

    normalizeVector(object);

    this.body.setVelocityX(object.x * this.speed);
    this.body.setVelocityY(object.y * this.speed);


  }

  stopX() {
    this.body.setVelocityX(0);
  }

  stopY() {
    this.body.setVelocityY(0);
  }

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

    //Al principio de cada preUpdate, el Player se para
    this.stopX()
    this.stopY()

    //Calculas la velocidad
    this.calculateVelocity()

    //Y realizas la animacion
    this.checkAnims();
  }

}

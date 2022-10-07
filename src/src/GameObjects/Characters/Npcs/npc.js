import NPCImage from './npcSprite.js';
import PathInsertor from '../../../libraries/pathInsertor.js';

export default class NPC extends Phaser.GameObjects.Container {
  constructor(scene, x, y, npcImage, pathName) {
    super(scene, x, y);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    //Guardamos la escena
    this.theScene = scene;

    //Sprite del container
    this.spriteImage = new NPCImage(scene, 0, 0, npcImage);

    this.isTalking = false;

    this.pathFollower = new PathInsertor({
      body: this.body,
      scene: this.theScene,
      context: this,
      path: pathName,
    })

    this.add(this.spriteImage);

    //Variables
    this.initialPosX = x;
    this.initialPosY = y;

  }

  checkAnims() {
    if (this.body.newVelocity.x === 0) {
      //Si esta quieto
      if (this.body.newVelocity.y === 0)
        this.spriteImage.play('idleNPC_' + this.spriteImage.frame.texture.key, true);
      else if (this.body.newVelocity.y < 0) //arriba
        this.spriteImage.play('upNPC_' + this.spriteImage.frame.texture.key, true);
      else //abajo
        this.spriteImage.play('downNPC_' + this.spriteImage.frame.texture.key, true);
    }
    else if (this.body.newVelocity.x < 0) //izquierda
      this.spriteImage.play('leftNPC_' + this.spriteImage.frame.texture.key, true);
    else //derecha
      this.spriteImage.play('rightNPC_' + this.spriteImage.frame.texture.key, true);

  }

  preUpdate() {
    if(!this.isTalking)this.checkAnims();
    else this.spriteImage.play(this.talkingAnimation, true)
  }

  setTalkingAnimation(direction){
    let key = this.spriteImage.frame.texture.key;
    if     (direction.x < 0 && Math.abs(direction.y) < Math.abs(direction.x)) this.talkingAnimation = 'idleRight_'+key;
    else if(direction.x > 0 && Math.abs(direction.y) < Math.abs(direction.x)) this.talkingAnimation = 'idleLeft_'+key
    else if(direction.y < 0 && Math.abs(direction.x) < Math.abs(direction.y)) this.talkingAnimation = 'idleNPC_'+key;
    else if(direction.y > 0 && Math.abs(direction.x) < Math.abs(direction.y)) this.talkingAnimation = 'idleUp_'+key
  }

}

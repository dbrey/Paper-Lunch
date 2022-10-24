
export default class NPC extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, npcName) {
    super(scene, x, y, npcName);

    //Fisicas
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.scene.physics.add.collider(this,scene.player);
    this.body.setImmovable();
  

    this.scale = (0.3,0.3);

    //ANIMACIONES    
    scene.anims.create({
      key: 'leftNPC_' + npcName,
      frames: scene.anims.generateFrameNumbers(npcName, { start: 3, end: 5 }),
      frameRate: 7,
      repeat: -1
    });
    scene.anims.create({
      key: 'idleLeft_' + npcName,
      frames: scene.anims.generateFrameNumbers(npcName, { start: 3, end: 3 }),
      repeat: 0
    });

    scene.anims.create({
      key: 'upNPC_' + npcName,
      frames: scene.anims.generateFrameNumbers(npcName, { start: 9, end: 11 }),
      frameRate: 7,
      repeat: -1
    });
    scene.anims.create({
      key: 'idleUp_'+npcName,
      frames: scene.anims.generateFrameNumbers(npcName, { start: 10, end: 10 }),
      repeat: 0
    });

    scene.anims.create({
      key: 'idleNPC_' + npcName,
      frames: scene.anims.generateFrameNumbers(npcName, { start: 1, end: 1 }),
      frameRate: 7,
      repeat: -1
    });

    scene.anims.create({
      key: 'downNPC_' + npcName,
      frames: scene.anims.generateFrameNumbers(npcName, { start: 0, end: 2 }),
      frameRate: 7,
      repeat: -1
    });
    scene.anims.create({
      key: 'rightNPC_' + npcName,
      frames: scene.anims.generateFrameNumbers(npcName, { start: 6, end: 8 }),
      frameRate: 7,
      repeat: -1
    });
    scene.anims.create({
      key: 'idleRight_'+npcName,
      frames: scene.anims.generateFrameNumbers(npcName, { start: 6, end: 6 }),
      repeat: 0
    });
  }

  preUpdate(t, d) {
    //Llamamos al super para las animaciones
    super.preUpdate(t, d);
  }
}

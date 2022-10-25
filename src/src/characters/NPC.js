
export default class NPC extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, npcName,player,zoneWidth,zoneHeight) {
    super(scene, x, y, npcName);

    //Fisicas
    this.scene.add.existing(this);
    this.overlaping = false;


    this.zonaTrigger = this.scene.add.zone(x, y);
    //this.zonaTrigger.setCircleDropZone(3);
    this.zonaTrigger.setSize(zoneWidth, zoneHeight);
    this.scene.physics.world.enable(this.zonaTrigger);
    this.zonaTrigger.body.setAllowGravity(false);


    this.barrio; //BARRIO AL QUE PERTENECE
    this.confianzaConPlayer=0.77; // VALOR ENTRE 0 Y 1


    this.actionCoolDown = 150; //MILISEGUNDOS
    this.actualCoolDown = 0;
    this.canAct=true;

    this.bought = false;

    this.scene.physics.add.existing(this);
    this.scene.physics.add.collider(this,scene.player);
    this.body.setImmovable();



    this.probability = Math.random() * 1
    //Booleano para controlar las veces que el player puede vender periodicos a un NPC
    this.canBuy = true;

    this.enterZone = false;

    this.player = player;
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

    if(this.canBuy){ //SI TODAVÍA NO HAS INTENTADO VENDERLE PERIÓDICOS A ESTE NPC, PUEDES INTERACTUAR CON ÉL


      //SI LA PROBABILIDAD DE QUE COMPRE ES MAYOR QUE LA CONFIANZA QUE TIENES, LE COMPRAS EL PERIÓDICO
      if(Phaser.Geom.Intersects.RectangleToRectangle(this.zonaTrigger.getBounds(),this.player.getBounds())){
        if(!this.enterZone){
          //AQUI PODEMOS HACER LO QUE QUERAMOS QUE OCURRA CUANDO EL PERSONAJE ENTRA EN LA ZONA
          console.log("Acabo de entrar a la zona")
          this.enterZone = true; // Utilizamos un booleano para diferenciar entre cuando acaba de entrar a la zona
                                  // y cuando ya estaba en ella
        }
        else {
          //AQUI PODEMOS HACER LO QUE QUERAMOS QUE OCURRA MIENTRAS EL PERSONAJE SE MANTIENE EN LA ZONA
          console.log("Estoy en la zona");
  
          //Si el personaje está en la zona y pulsa la tecla de accion, podemos hacer lo que queramos
          if(this.player.action.isDown){
              if(this.probability > this.confianzaConPlayer){
                //TO DO : SE COMPRA EL PERIÓDICO
                if(this.player.numeroPeriodicos()>0){
                  console.log("Perfecto, te compro el periódico");
                  this.player.compraPeriodicos(1); //SE PODRÍA HACER UN RANDOM DEL NUMERO DE PERIODICOS A COMPRAR, AUNQUE LO NORMAL ES UNO
                  this.bought=true;
                }

              }
              else console.log("Lo siento, no me interesa");
              this.canBuy=false;
              this.actualCoolDown = t;
              this.canAct=false;

          }
        }
      }
      else if(this.enterZone){ // SI EL PLAYER NO SE ENCUENTRA EN LA ZONA, PERO ESTABA DENTRO EN EL FRAME ANTERIOR, SIGNIFICA QUE ACABA DE SALIR
          //AQUÍ PODEMOS HACER LO QUE QUERAMOS QUE OCRURRA CUANDO EL PERSONAJE SALE DE LA ZONA
          console.log("Acaba de salir de la zona");
          this.enterZone=false;
      }
    
    }
    else if (Phaser.Geom.Intersects.RectangleToRectangle(this.zonaTrigger.getBounds(),this.player.getBounds()) && this.player.action.isDown && this.canAct){
      //AQUÍ PODRÍAMOS HACER QUE TE DIGA UNA FRASE QUE PODEMOS COLOCAR POR TILED
      if(this.bought)
        console.log("No necesito más periódicos gracias");
      else console.log("Te he dicho que no me interesea");

      this.actualCoolDown = t;
      this.canAct=false;
    }


    //COMPROBAMOS SI PODEMOS INTERACTUAR
    if(!this.canAct){

      if(t-this.actualCoolDown > this.actionCoolDown)
       this.canAct=true;
    }

  }
}

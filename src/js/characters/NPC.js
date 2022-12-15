
import Paths from "./paths.js"
import Dialogs from "./dialogs.js";
import CT from "../libraries/constants.js";

export default class NPC extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, npcName,player,zoneWidth,zoneHeight,barrioId) {
    super(scene, x, y, npcName);

    //Fisicas
    this.scene.add.existing(this);
    this.overlaping = false;
    this.path;


    this.zonaTrigger = this.scene.add.zone(x, y);
    this.zonaTrigger.setSize(zoneWidth, zoneHeight);
    this.scene.physics.world.enable(this.zonaTrigger);
    this.zonaTrigger.body.setAllowGravity(false);

    this.talking = false;
    this.barrio=barrioId;
    this.umbral = 25;

    for (let i = 0; i < Paths.length; i++) {
      if (Paths[i].name === npcName) this.path = Paths[i];
    }

    for (let i = 0; i < Dialogs.length; i++) {
      if (Dialogs[i].name === npcName) this.dialogs = Dialogs[i];
    }



    if(this.path.state == "Move"){
      this.indexPath = 0;
      this.destinoX = this.path.path[this.indexPath].x;
      this.destinoY = this.path.path[this.indexPath].y;
      this.dirX =  this.path.path[this.indexPath].dirX;
      this.dirY =  this.path.path[this.indexPath].dirY;
      this.offsetX=this.path.path[this.indexPath].offsetX;
      this.offsetY=this.path.path[this.indexPath].offsetY;
      this.indexPath=this.path.path[this.indexPath].index;
    }

    this.actionCoolDown = 120; //MILISEGUNDOS
    this.actualCoolDown = 0;
    this.canAct=true;

    this.bought = false;

    this.speed=100;

    this.zonaTrigger.body.setVelocityX(this.dirX * this.speed);
    this.zonaTrigger.body.setVelocityY(this.dirY * this.speed);

    this.scene.physics.add.existing(this);
    this.scene.physics.add.collider(this,scene.player);


    this.body.setImmovable();


    this.probability = (Math.random() * this.umbral*2) - this.umbral; // Le restamos el umbral por que la confianza va entre umbral y -umbral
    //Booleano para controlar las veces que el player puede vender periodicos a un NPC
    this.canBuy = true;

    this.enterZone = false;

    this.player = player;
    this.npcName = npcName;
    this.scale = (0.4,0.4);

    //ANIMACIONES    
    scene.anims.create({
      key: 'leftNPC_' + npcName,
      frames: scene.anims.generateFrameNumbers(npcName, { start: 16, end: 19 }),
      frameRate: 7,
      repeat: -1
    });
    scene.anims.create({
      key: 'idleLeft_' + npcName,
      frames: scene.anims.generateFrameNumbers(npcName, { start: 16, end: 16 }),
      repeat: -1
    });

    scene.anims.create({
      key: 'upNPC_' + npcName,
      frames: scene.anims.generateFrameNumbers(npcName, { start: 8, end: 11 }),
      frameRate: 7,
      repeat: -1
    });
    scene.anims.create({
      key: 'idleUp_'+npcName,
      frames: scene.anims.generateFrameNumbers(npcName, { start: 8, end: 8 }),
      repeat: -1
    });

    scene.anims.create({
      key: 'idleDown_' + npcName,
      frames: scene.anims.generateFrameNumbers(npcName, { start: 0, end: 3 }),
      frameRate: 7,
      repeat: -1
    });

    scene.anims.create({
      key: 'downNPC_' + npcName,
      frames: scene.anims.generateFrameNumbers(npcName, { start: 4, end: 7 }),
      frameRate: 7,
      repeat: -1
    });
    scene.anims.create({
      key: 'rightNPC_' + npcName,
      frames: scene.anims.generateFrameNumbers(npcName, { start: 12, end: 15 }),
      frameRate: 7,
      repeat: -1
    });
    scene.anims.create({
      key: 'idleRight_'+npcName,
      frames: scene.anims.generateFrameNumbers(npcName, { start: 12, end: 12 }),
      repeat: -1
    });


    this.body.setSize(32,32);
    this.setDisplaySize(32,52);
  }


  preUpdate(t, d) {
    //Llamamos al super para las animaciones
    super.preUpdate(t, d);


    //SI LA PROBABILIDAD DE QUE COMPRE ES MAYOR QUE LA CONFIANZA QUE TIENES, LE COMPRAS EL PERIÓDICO
    if(Phaser.Geom.Intersects.RectangleToRectangle(this.zonaTrigger.getBounds(),this.player.getBounds())){
      if(!this.enterZone){
        this.enterZone = true; // Utilizamos un booleano para diferenciar entre cuando acaba de entrar a la zona
                                // y cuando ya estaba en ella
        this.player.showInteractable();

        //Paramos al NPC y la zona con la que interactuar para que sea más cómodo para el player
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);

        this.talking=true;
        this.zonaTrigger.body.setVelocityX(0);
        this.zonaTrigger.body.setVelocityY(0);
      }
      else {

        //Si el personaje está en la zona y pulsa la tecla de accion, podemos hacer lo que queramos
        if(this.player.action.isDown && this.canBuy){
            if(this.probability < this.player.getConfianza(this.barrio)){
              //TO DO : SE COMPRA EL PERIÓDICO
              if(this.player.numeroPeriodicos()>0){
                
                this.scene.comienzaDialogo(this.dialogs.dialog[0].text)
                this.player.compraPeriodicos(1); 

                //SE PODRÍA HACER UN RANDOM DEL NUMERO DE PERIODICOS A COMPRAR, AUNQUE LO NORMAL ES UNO
                this.scene.ui.updateNumPeriodicos(); 
                this.bought=true;
              }
            }
            else {
              this.scene.comienzaDialogo(this.dialogs.dialog[1].text)
            }
            this.scene.playSound("NumKey");
            this.canBuy=false;
            this.actualCoolDown = 0;
            this.canAct=false;

        }
        else if(this.player.action.isDown && !this.canBuy && this.canAct){
          if(!this.scene.dialogManager.writting && this.scene.dialogManager.waitingPlayer){
            this.scene.finalizaDialogo();
          }
          else if(this.scene.dialogManager.writting){
            this.scene.terminaDialogo();
          }
          else {
            if(this.bought){
              this.scene.comienzaDialogo(this.dialogs.dialog[2].text)
            }
            else {
              this.scene.comienzaDialogo(this.dialogs.dialog[3].text)
            }
          }
          this.actualCoolDown = 0;
          this.canAct=false;
        }
      }
    }
    else if(this.enterZone){ // SI EL PLAYER NO SE ENCUENTRA EN LA ZONA, PERO ESTABA DENTRO EN EL FRAME ANTERIOR, SIGNIFICA QUE ACABA DE SALIR
        //AQUÍ PODEMOS HACER LO QUE QUERAMOS QUE OCRURRA CUANDO EL PERSONAJE SALE DE LA ZONA
        console.log("Acaba de salir de la zona");
        this.player.removeInteractable();
        this.enterZone=false;
        this.talking =false;
    }



    //COMPROBAMOS SI PODEMOS INTERACTUAR
    if(!this.canAct){
      if(this.actualCoolDown >= this.actionCoolDown){
        this.canAct=true;
        this.actualCoolDown=0;
      }
      else this.actualCoolDown+=d;
    }

    if(this.path.state == "Move"){
    //Comprobamos si hemos llegado al destino de la ruta para cambiar de destino
    if((this.x >= this.destinoX && this.x <= this.destinoX + this.offsetX) && 
      (this.y >= this.destinoY && this.y <= this.destinoY + this.offsetY)){
        
        this.destinoX = this.path.path[this.indexPath].x;
        this.destinoY = this.path.path[this.indexPath].y;
        this.dirX =  this.path.path[this.indexPath].dirX;
        this.dirY =  this.path.path[this.indexPath].dirY;
        this.offsetX=this.path.path[this.indexPath].offsetX;
        this.offsetY=this.path.path[this.indexPath].offsetY;
        this.indexPath=this.path.path[this.indexPath].index;
      }

      if(!this.talking){
        this.body.setVelocityX(this.dirX * this.speed);
        this.body.setVelocityY(this.dirY * this.speed);
        this.zonaTrigger.body.setVelocityX(this.dirX * this.speed);
        this.zonaTrigger.body.setVelocityY(this.dirY * this.speed);
      }
    }


    this.checkAnims();
  }


  cambiaDir(dirXnew,dirYnew){
    this.dirX = dirXnew;
    this.dirY = dirYnew;
  }



  checkAnims() {

    if(this.talking){
      if(this.dirX===0){
        if(this.dirY===1)
          this.play('idleDown_'+  this.npcName);
        else this.play('idleUp_'+  this.npcName);
      }
      else if(this.dirX===1)
        this.play('idleRight_'+  this.npcName);
      else this.play('idleLeft_'+  this.npcName);
    }
    else {
      if(this.dirX===0){
        if(this.dirY===1)
          this.play('downNPC_'+  this.npcName,true);
        else this.play('upNPC_'+  this.npcName,true);
      }
      else if(this.dirX===1)
        this.play('rightNPC_'+  this.npcName,true);
      else this.play('leftNPC_'+  this.npcName,true);
    }

  }

}

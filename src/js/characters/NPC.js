
import Paths from "../libraries/paths.js"
import Dialogs from "../libraries/dialogs.js";

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



    //Variables para el juego
    this.actionCoolDown = 120; //MILISEGUNDOS
    this.actualCoolDown = 0;
    this.canAct=true;
    this.bought = false;
    this.speed=200;

    // Le restamos el umbral por que la confianza va entre umbral y -umbral
    this.probability = (Math.random() * this.umbral*2) - this.umbral;
    //Booleano para controlar las veces que el player puede vender periodicos a un NPC
    this.canBuy = true;
    this.enterZone = false;

    this.scene.physics.add.existing(this);
    this.scene.physics.add.collider(this,scene.player);
    this.body.setImmovable();

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


    //Si se mueve inicializas las variables
    if(this.path.state == "Move"){
      this.indexPath = 0;
      this.destinoX = this.path.path[this.indexPath].x;
      this.destinoY = this.path.path[this.indexPath].y;
      this.dirX =  this.path.path[this.indexPath].dirX;
      this.dirY =  this.path.path[this.indexPath].dirY;
      this.offsetX=this.path.path[this.indexPath].offsetX;
      this.offsetY=this.path.path[this.indexPath].offsetY;
      this.indexPath=this.path.path[this.indexPath].index;

      this.zonaTrigger.body.setVelocityX(this.dirX * this.speed);
      this.zonaTrigger.body.setVelocityY(this.dirY * this.speed);
    } //Si no, lo colocas hacia donde está mirando
    else if(this.path.state=="NoMove"){
      this.dirX = this.path.dirX;
      this.dirY = this.path.dirY;
    }



    this.body.setSize(32,32);
    this.setDisplaySize(32,52);
  }


  preUpdate(t, d) {
    //Llamamos al super para las animaciones
    super.preUpdate(t, d);

    //Si la probabilidad de que compre es mayor que la confianza que tienes, le compras el periódico
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
              //Si tiene periódicos suficientes, se compra
              if(this.player.numeroPeriodicos()>0){
                
                //Comienza a escribir
                this.scene.comienzaDialogo(this.dialogs.compra)
                this.player.compraPeriodicos(1); 
                this.scene.ui.updateNumPeriodicos(); 
                this.bought=true;
              }
            }
            else {
              this.scene.comienzaDialogo(this.dialogs.noCompra)
            }
            this.scene.playSound("NumKey");
            //Se reinicia el cooldown para evitar la continua pulsación de tecla
            this.canBuy=false;
            this.actualCoolDown = 0;
            this.canAct=false;

        } //Si ya has interactuado con él anteriormente y vuelvesa interactuar
        else if(this.player.action.isDown && !this.canBuy && this.canAct){
          //Si el diálogo ya ha finalizado, se vuelve a la normalida
          if(!this.scene.dialogManager.writting && this.scene.dialogManager.waitingPlayer){
            this.scene.finalizaDialogo();
          }
          //Si todavía no ha terminado el diálogo, lo termina
          else if(this.scene.dialogManager.writting){
            this.scene.terminaDialogo();
          }
          //Si acabas de interactar, comienza a escribir el diálogo en función de si te ha comprado
          else {
            if(this.bought){
              this.scene.comienzaDialogo(this.dialogs.haComprado)
            }
            else {
              this.scene.comienzaDialogo(this.dialogs.noHaComprado)
            }
          }
          this.actualCoolDown = 0;
          this.canAct=false;
        }
      }
    }
    //Si el player no se encuentra en la zona, pero estaba dentro en el frame anterior, significa que acaba de salir
    else if(this.enterZone){
        //Se desactiva la ui de la tecla de interactuar
        this.player.removeInteractable();
        this.enterZone=false;
        this.talking =false;
    }



    //Comprobamos si puede interactuar, y si no, se suma al coolDown
    if(!this.canAct){
      if(this.actualCoolDown >= this.actionCoolDown){
        this.canAct=true;
        this.actualCoolDown=0;
      }
      else this.actualCoolDown+=d;
    }


    //Si el Npc se mueve
    if(this.path.state == "Move"){
      //Comprobamos si hemos llegado al destino de la ruta para cambiar de destino,dirección,etc
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

      //Si no está hablando, mueves al Npc hacia su siguiente punto
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




  //Actualiza las animaciones en función de la direccion y movimiento
  checkAnims() {

    if(this.talking || this.path.state == "NoMove"){
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

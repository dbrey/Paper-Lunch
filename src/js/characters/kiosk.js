import CT from "../libraries/constants.js";
import Dialogs from "./dialogs.js";

export default class kiosk extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, player, id, zoneWidth, zoneHeight){
        
        //Creacion del kiosko
        super(scene,x , y - 30, 'kiosko');
        this.scene.add.existing(this);
        //referencia al player
        this.player = player;

        //Id del kiosko
        this.kioskZone = id;

        //creacion de la zona del kiosko
        this.triggerZone = this.scene.add.zone(x, y);
        this.triggerZone.setSize(zoneWidth, zoneHeight);
        this.scene.physics.world.enable(this.triggerZone);
        this.triggerZone.body.setAllowGravity(false);

        //Booleanos de compra
        this.canBuy = true;
        this.bought=false;
        
        //Variables de confianza y de minimo de periodicos
        this.umbral = 25;
        this.confianzaMinima = 5;
        this.periodicosMinimos = 15;

        this.actionCoolDown = 120; //MILISEGUNDOS
        this.actualCoolDown = 0;
        this.canAct=true;

        //Dialogos
        for (let i = 0; i < Dialogs.length; i++) {
            if (Dialogs[i].name === "Kiosko") this.dialogs = Dialogs[i];
          }
    }

    

    //Metodo para realizar compra de periodicos
    isTrustWorthy(){
        //Si tiene la confianza minima
        if(this.player.getConfianzaInZone(this.kioskZone) >= this.confianzaMinima){
            
            //Compra periodicos entre un valor minimo y este anterior mas la confianza
            this.player.compraPeriodicos(Math.floor(Math.random() * (this.player.getConfianzaInZone(this.kioskZone) + this.periodicosMinimos)) + this.periodicosMinimos);
            
            //dialogo
            this.scene.comienzaDialogo(this.dialogs.compra)

            //Se ha comprado
            this.bought=true;
        }
        //Si no tiene la confianza minima
        else if(this.player.getConfianzaInZone(this.kioskZone) < this.confianzaMinima) {
            this.scene.comienzaDialogo(this.dialogs.noConfianza)
        }
        //Si ya se ha comprado
        else this.scene.comienzaDialogo(this.dialogs.noCompra)
    }

    preUpdate(t, d){
        super.preUpdate(t, d);
        
        //Si intersecta
        if(Phaser.Geom.Intersects.RectangleToRectangle(this.triggerZone.getBounds(),this.player.getBounds())){
            //Si el jugador realiza una accion
            if(this.player.action.isDown && this.canBuy && this.canAct){
                this.actualCoolDown = 0;
                this.canAct=false;
                this.isTrustWorthy();
                this.canBuy = false;
            }
            //dialogos
            else if(this.player.action.isDown  && this.canAct){

                if(!this.scene.dialogManager.writting && this.scene.dialogManager.waitingPlayer)
                    this.scene.finalizaDialogo();
                else if(this.scene.dialogManager.writting)
                    this.scene.terminaDialogo();
                else if(this.player.getConfianzaInZone(this.kioskZone) < this.confianzaMinima){
                    this.scene.comienzaDialogo(this.dialogs.noConfianza)
                }
                else {
                    if(this.bought)
                        this.scene.comienzaDialogo(this.dialogs.haComprado)
                    else 
                        this.scene.comienzaDialogo(this.dialogs.noHaComprado)
                }

                this.actualCoolDown = 0;
                this.canAct=false;
            }
        }

        //si no puede actuar
        if(!this.canAct){
            if(this.actualCoolDown >= this.actionCoolDown){
              this.canAct=true;
              this.actualCoolDown=0;
            }
            else this.actualCoolDown+=d;
          }
    }

}
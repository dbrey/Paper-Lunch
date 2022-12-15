import CT from "../libraries/constants.js";
import Dialogs from "./dialogs.js";

export default class kiosk extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, player, id, zoneWidth, zoneHeight){
        super(scene,x, y);
        this.scene.add.existing(this);
        this.player = player;
        this.kioskZone = id;
        this.triggerZone = this.scene.add.zone(x, y);
        this.triggerZone.setSize(zoneWidth, zoneHeight);
        this.scene.physics.world.enable(this.triggerZone);
        this.triggerZone.body.setAllowGravity(false);
        this.canBuy = true;
        this.bought=false;
        
        this.umbral = 25;
        this.confianzaMinima = 5;
        this.periodicosMinimos = 15;

        this.actionCoolDown = 120; //MILISEGUNDOS
        this.actualCoolDown = 0;
        this.canAct=true;

        for (let i = 0; i < Dialogs.length; i++) {
            if (Dialogs[i].name === "Kiosko") this.dialogs = Dialogs[i];
          }
    }

    

    isTrustWorthy(){
        if(this.player.getConfianzaInZone(this.kioskZone) >= this.confianzaMinima){
            
            this.player.compraPeriodicos(Math.floor(Math.random() * (this.player.getConfianzaInZone(this.kioskZone) + this.periodicosMinimos)) + this.periodicosMinimos);
            
            this.scene.comienzaDialogo(this.dialogs.compra)

            this.bought=true;
        }
        else if(this.player.getConfianzaInZone(this.kioskZone) < this.confianzaMinima) {
            this.scene.comienzaDialogo(this.dialogs.noConfianza)
        }
        else this.scene.comienzaDialogo(this.dialogs.noCompra)
    }

    preUpdate(t, d){
        super.preUpdate(t, d);
        if(Phaser.Geom.Intersects.RectangleToRectangle(this.triggerZone.getBounds(),this.player.getBounds())){
            if(this.player.action.isDown && this.canBuy && this.canAct){
                this.actualCoolDown = 0;
                this.canAct=false;
                this.isTrustWorthy();
                this.canBuy = false;
            }
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

        if(!this.canAct){
            if(this.actualCoolDown >= this.actionCoolDown){
              this.canAct=true;
              this.actualCoolDown=0;
            }
            else this.actualCoolDown+=d;
          }
    }

}
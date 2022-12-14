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
        
        this.actionCoolDown = 120; //MILISEGUNDOS
        this.actualCoolDown = 0;
        this.canAct=true;

        for (let i = 0; i < Dialogs.length; i++) {
            if (Dialogs[i].name === "Kiosko") this.dialogs = Dialogs[i];
          }
    }

    

    isTrustWorthy(){
        if(this.player.getConfianzaInZone(this.kioskZone) >= 1){
            this.player.compraPeriodicos(Math.floor(Math.random() * (this.player.getConfianzaInZone(this.kioskZone) + 25)) + 10);
            
            this.scene.ui.dialogBar.setVisible(true);
            this.scene.dialogManager.updatePosition(this.player.x - CT.offsetDialogX, this.player.y + CT.offsetDialogY);
            this.scene.dialogManager.startWritting(this.dialogs.dialog[0].text);
            this.player.canMove = false;
            
            this.bought=true;
        }
        else {
            this.scene.ui.dialogBar.setVisible(true);
            this.scene.dialogManager.updatePosition(this.player.x - CT.offsetDialogX, this.player.y + CT.offsetDialogY);
            this.scene.dialogManager.startWritting(this.dialogs.dialog[1].text);
            this.player.canMove = false;
        }
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

                if(!this.scene.dialogManager.writting && this.scene.dialogManager.waitingPlayer){
                    this.scene.dialogManager.clearText();
                    this.scene.ui.dialogBar.setVisible(false);
                    this.player.canMove = true;
                  }
                else if(this.scene.dialogManager.writting){
                    this.scene.dialogManager.finishWrittting();
                }
                else {
                    if(this.bought){
                        this.scene.ui.dialogBar.setVisible(true);
                        this.scene.dialogManager.updatePosition(this.player.x - CT.offsetDialogX, this.player.y + CT.offsetDialogY);
                        this.scene.dialogManager.startWritting(this.dialogs.dialog[2].text);
                        this.player.canMove = false;
                    }
                    else {
                        this.scene.ui.dialogBar.setVisible(true);
                        this.scene.dialogManager.updatePosition(this.player.x - CT.offsetDialogX, this.player.y + CT.offsetDialogY);
                        this.scene.dialogManager.startWritting(this.dialogs.dialog[3].text);
                        this.player.canMove = false;
                    }
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
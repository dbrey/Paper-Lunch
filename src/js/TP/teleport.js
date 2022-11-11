
import Player from "../characters/player.js"; 

export default class TP extends Phaser.GameObjects.Sprite{
    constructor(_scene, x, y, tpID,player, zoneX, zoneY){
        super(_scene, x, y, tpID);

        this.scene.add.existing(this);

        this.tpID = tpID;
        //Crear zona de trigger del tp
        this.triggerZone = this.scene.add.zone(x, y);
        this.triggerZone.setSize(zoneX, zoneY);
        this.scene.physics.world.enable(this.triggerZone);
        this.triggerZone.body.setAllowGravity(false);

        this.player = player;

        this.canTP = true;
        console.log(this);
        this._scene = _scene;
    }

    teleport(tpx, tpy){
        this.player.x = this.tpID.tpx + 20;
        this.player.y = this.tpID.tpy + 20;
    }

    preUpdate(){
        if(Phaser.Geom.Intersects.RectangleToRectangle(this.triggerZone.getBounds(),this.player.getBounds())){
            console.log("Ubicacion: " + this.tpID.nombre);
            if(this.player.action.isDown && this.canTP){
                //this.player.stopX(); this.player.stopY();
                this._scene.scene.pause();
                this._scene.scene.launch("tpMenu", {sceneName: "Dia1"});
                
                this.canTP = false;
            }
        }
        else{
            this.canTP = true;
        }
    }
}
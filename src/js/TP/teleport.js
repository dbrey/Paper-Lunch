
import Player from "../characters/player.js"; 

export default class TP extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, tpID,player, zoneX, zoneY){
        super(scene, x, y, tpID);

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
    }

    

    teleport(){
        
        this.player.x = this.tpID.tp1x + 20;
        this.player.y = this.tpID.tp1y + 20;
        this.canTP = false;
        
        
    }

    

    

    preUpdate(){
        if(Phaser.Geom.Intersects.RectangleToRectangle(this.triggerZone.getBounds(),this.player.getBounds())){
            console.log("Ubicacion: " + this.tpID.nombre);
            Phaser.scene.call(this, {sceneName: "Dia1"});
            
        }
    }
}
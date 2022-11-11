
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
        if(this.player.getDinero() >= 10){
        console.log(this.player.x + " " + this.player.y);
        this.player.x = tpx;
        this.player.y = tpy;
        console.log(this.player.x + " " + this.player.y);
        this.player.changeDinero(-10);
        
        }
    }

    preUpdate(t, d){
        super.preUpdate(t, d);
        if(Phaser.Geom.Intersects.RectangleToRectangle(this.triggerZone.getBounds(),this.player.getBounds())){
            console.log("Ubicacion: " + this.tpID);
            if(this.player.action.isDown && this.canTP){
                this.player.stopX(); this.player.stopY();
                this._scene.scene.pause();
                this._scene.scene.launch("tpMenu", { TP: this, sceneName: "Dia1"});
                
                
                
                this.canTP = false;
            }
        }
        else{
            this.canTP = true;
            
        }
    }
}
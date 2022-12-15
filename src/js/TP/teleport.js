
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
    }

    teleport(tpx, tpy){
        if(this.player.getDinero() >= 5){
        this.player.x = tpx;
        this.player.y = tpy;
        this.player.changeDinero(-5);
        this.player.resetInput();
        
        }
    }

    preUpdate(t, d){
        super.preUpdate(t, d);
        if(Phaser.Geom.Intersects.RectangleToRectangle(this.triggerZone.getBounds(),this.player.getBounds())){
            if(this.player.action.isDown && this.canTP){
                this.canTP = false;
                this.player.stopX(); this.player.stopY();
                this.scene.scene.launch("tpMenu", { TP: this, sceneName: 'PrimerDia'});
                this.scene.scene.pause();
            }
        }
        else if(this.canTP == false &&!Phaser.Geom.Intersects.RectangleToRectangle(this.triggerZone.getBounds(),this.player.getBounds())){
            this.canTP = true;
            
        }
    }
}
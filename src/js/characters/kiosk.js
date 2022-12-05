
export default class kiosk extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y,zone, player, zoneWidth, zoneHeight){
        super(scene,x, y);

        this.zone = zone;
        this.player = player;
        this.zoneWidth = zoneWidth;
        this.zoneHeight = zoneHeight;
        this.content = "DDiego";

    }

    

    isTrustWorthy(){
        if(this.player.getConfianza() >= 15){
            this.player.compraPeriodicos(25);
        }
    }

    preUpdate(t, d){
        if(Phaser.Geom.Intersects.RectangleToRectangle(this.triggerZone.getBounds(),this.player.getBounds())){
            if(this.player.action.isDown){
                this.isTrustWorthy();
            }
        }
    }

}
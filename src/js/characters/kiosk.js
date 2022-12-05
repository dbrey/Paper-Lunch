
export default class kiosk extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, player, zoneWidth, zoneHeight){
        super(scene,x, y);
        console.log(x + ' ' + y + ' ' +zoneWidth + ' ' + zoneHeight);
        this.scene.add.existing(this);
        this.player = player;
        this.triggerZone = this.scene.add.zone(x, y);
        this.triggerZone.setSize(zoneWidth, zoneHeight);
        this.scene.physics.world.enable(this.triggerZone);
        this.triggerZone.body.setAllowGravity(false);
        this.canBuy = true;
        
    }

    

    isTrustWorthy(){
        this.canBuy = false;
        console.log(this.player.getConfianza() );
        if(this.player.getConfianza() > 0){
            this.player.compraPeriodicos(25);
        }
    }

    preUpdate(t, d){
        super.preUpdate(t, d);
        if(Phaser.Geom.Intersects.RectangleToRectangle(this.triggerZone.getBounds(),this.player.getBounds())){
            console.log('jajant');
            if(this.player.action.isDown && this.canBuy){
                this.isTrustWorthy();
            }
        }
        else if(this.canBuy == false) this.canBuy = true;
    }

}
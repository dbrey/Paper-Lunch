
export default class kiosk extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, player, id, zoneWidth, zoneHeight){
        super(scene,x, y);
        console.log(x + ' ' + y + ' ' +zoneWidth + ' ' + zoneHeight);
        this.scene.add.existing(this);
        this.player = player;
        this.kioskZone = id;
        this.triggerZone = this.scene.add.zone(x, y);
        this.triggerZone.setSize(zoneWidth, zoneHeight);
        this.scene.physics.world.enable(this.triggerZone);
        this.triggerZone.body.setAllowGravity(false);
        this.canBuy = true;
        
    }

    

    isTrustWorthy(){
        console.log(this.player.getConfianzaInZone(this.kioskZone) );
        if( this.canBuy && this.player.getConfianzaInZone(this.kioskZone) >= 1){
            this.player.compraPeriodicos(Math.floor(Math.random() * (this.player.getConfianzaInZone(this.kioskZone) + 25)) + 10);
        }
    }

    preUpdate(t, d){
        super.preUpdate(t, d);
        if(Phaser.Geom.Intersects.RectangleToRectangle(this.triggerZone.getBounds(),this.player.getBounds())){
            if(this.player.action.isDown && this.canBuy){
                this.isTrustWorthy();
                this.canBuy = false;
            }
        }
    }

}
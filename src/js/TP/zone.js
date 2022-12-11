

export default class ZONE extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, id ,player, zoneX, zoneY){
        super(scene, x, y);

        this.scene.add.existing(this);
        
        //Crear zona de trigger del tp
        this.triggerZone = this.scene.add.zone(x, y);
        this.triggerZone.setSize(zoneX, zoneY);
        this.scene.physics.world.enable(this.triggerZone);
        this.triggerZone.body.setAllowGravity(false);

        this.zoneId = id;

        this.player = player;

        this.trust = 10;
        this.auxTrust;

        this.inZone = true;
        console.log(this);
        
    }

   

    preUpdate(t, d){
        super.preUpdate(t, d);
        if(Phaser.Geom.Intersects.RectangleToRectangle(this.triggerZone.getBounds(),this.player.getBounds())&& this.inZone){
            console.log(this.player.getConfianzaInZone(this.id));
            this.inZone == false;
        }
        
    }
}
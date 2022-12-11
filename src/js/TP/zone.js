

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

        this.inZone = false;
        
    }

   

    preUpdate(t, d){
        super.preUpdate(t, d);
        if(this.inZone == false && Phaser.Geom.Intersects.RectangleToRectangle(this.triggerZone.getBounds(),this.player.getBounds())){
            console.log(this.player.getConfianzaInZone(this.zoneId));
            this.inZone = true;
        }
        else if(this.inZone == true && !Phaser.Geom.Intersects.RectangleToRectangle(this.triggerZone.getBounds(),this.player.getBounds())){
            this.inZone = false;
        }
        
        
    }
}
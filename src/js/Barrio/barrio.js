export default class Barrio extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,zoneWidth,zoneHeight,barrioId , player){
        super(scene);
        this.scene.add.existing(this);

        this.barrioId = barrioId;
        this.zonaTrigger = this.scene.add.zone(x, y);
        
        //this.zonaTrigger.setCircleDropZone(3);
        this.zonaTrigger.setSize(zoneWidth, zoneHeight);
        this.scene.physics.world.enable(this.zonaTrigger);
        this.zonaTrigger.body.setAllowGravity(false);

        this.player = player;

        this.enterZone = false;

    }

    preUpdate(t, d) {
        if(Phaser.Geom.Intersects.RectangleToRectangle(this.zonaTrigger.getBounds(),this.player.getBounds())){
            if(!this.enterZone){
              //AQUI PODEMOS HACER LO QUE QUERAMOS QUE OCURRA CUANDO EL PERSONAJE ENTRA EN LA ZONA
              console.log("Acabo de entrar al barrio : " + this.barrioId);
              this.scene.ui.actualizaBarra(this.barrioId)
              this.enterZone = true; // Utilizamos un booleano para diferenciar entre cuando acaba de entrar a la zona
                                      // y cuando ya estaba en ella
            }
        }
        else this.enterZone = false;
    }
}

export default class npc_path extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, npcName,zoneWidth,zoneHeight,nextX,nextY) {
        super(scene, x, y);
    
        this.scene.add.existing(this);
        this.overlaping = false;
        this.enterZone = false;

    
        this.npcAsignado = npcName;
        this.zonaTrigger = this.scene.add.zone(x, y);
        //this.zonaTrigger.setCircleDropZone(3);
        this.zonaTrigger.setSize(zoneWidth, zoneHeight);
        this.scene.physics.world.enable(this.zonaTrigger);
        this.zonaTrigger.body.setAllowGravity(false);

        this.nextX = nextX;
        this.nextY=nextY;


    }



    preUpdate(t,d){

        super.preUpdate(t, d);

        if(Phaser.Geom.Intersects.RectangleToRectangle(this.zonaTrigger.getBounds(),this.npcAsignado.getBounds())){
            if(!this.enterZone){
              //AQUI PODEMOS HACER LO QUE QUERAMOS QUE OCURRA CUANDO EL PERSONAJE ENTRA EN LA ZONA
              console.log("Acabo de entrar a la zona")
              this.enterZone = true; // Utilizamos un booleano para diferenciar entre cuando acaba de entrar a la zona
                                      // y cuando ya estaba en ella
              this.npcAsignado.cambiaDir(this.nextX,this.nextY);
            }
            else {
              //AQUI PODEMOS HACER LO QUE QUERAMOS QUE OCURRA MIENTRAS EL PERSONAJE SE MANTIENE EN LA ZONA
              console.log("Estoy en la zona");
      
            }
        }
        else if(this.enterZone){ // SI EL PLAYER NO SE ENCUENTRA EN LA ZONA, PERO ESTABA DENTRO EN EL FRAME ANTERIOR, SIGNIFICA QUE ACABA DE SALIR
              //AQUÍ PODEMOS HACER LO QUE QUERAMOS QUE OCRURRA CUANDO EL PERSONAJE SALE DE LA ZONA
              console.log("Acaba de salir de la zona");
              this.enterZone=false;
       }
    }
}

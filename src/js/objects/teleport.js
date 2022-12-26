
export default class TP extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, tpID,player, zoneX, zoneY){
        super(scene, x, y, 'bus');

        this.scene.add.existing(this);
        

        //numero identificador del tp
        this.tpID = tpID;
        
        //Crear zona de trigger del tp
        this.triggerZone = this.scene.add.zone(x, y);
        this.triggerZone.setSize(zoneX, zoneY);
        this.scene.physics.world.enable(this.triggerZone);
        this.triggerZone.body.setAllowGravity(false);

        //Referencia al player
        this.player = player;

        //Booleano de tp para no hacer llamadas innecesarias
        this.canTP = true;
    }

    //Funcion que realiza el Teleport del player
    teleport(tpx, tpy){
        if(this.player.getDinero() >= 5){ //Si el jugador tiene suficiente dinero
        this.player.x = tpx;
        this.player.y = tpy;
        this.player.changeDinero(-5); //Se le resta el dinero
        }
        this.player.resetInput();     //Debido a que la operacion se realiza en una escena, se debe resetear el input
    }

    preUpdate(t, d){
        super.preUpdate(t, d);
        if(Phaser.Geom.Intersects.RectangleToRectangle(this.triggerZone.getBounds(),this.player.getBounds())){ //Si el jugador y la zona de tp intersectan
            if(this.player.action.isDown && this.canTP){ //Si se puede hacer tp el jugador
                this.canTP = false;     
                this.player.stopX(); this.player.stopY(); //Se para al jugador
                this.scene.scene.launch("tpMenu", { TP: this, sceneName: this.scene}); //Se lanza la escena del tp
                this.scene.scene.pause(); //Se pausa la escena actual
            }
        }
        else if(this.canTP == false &&!Phaser.Geom.Intersects.RectangleToRectangle(this.triggerZone.getBounds(),this.player.getBounds())){ //Si el jugador esta fuera de la zona y no se puede tp
            this.canTP = true; 
            
        }
    }
}
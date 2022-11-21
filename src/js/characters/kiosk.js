
export default class kiosk extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y,zone, player, zoneWidth, zoneHeight){
        super(scene,x, y);

        this.zone = zone;
        this.player = player;
        this.zoneWidth = zoneWidth;
        this.zoneHeight = zoneHeight;

    }

    buy(){}

    isTrustWorthy(){

    }

    preupdate(){

    }

}
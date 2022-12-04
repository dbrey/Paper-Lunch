
export default class kiosk extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y,zone, player, zoneWidth, zoneHeight){
        super(scene,x, y);

        this.zone = zone;
        this.player = player;
        this.zoneWidth = zoneWidth;
        this.zoneHeight = zoneHeight;
        this.content = "DDiego";

    }

    buy(){}

    isTrustWorthy(){

    }

    preupdate(){
        if(this.player.action.isDown){
            var text = this.add.text(160,"PATATA",{fontFamily:'Arial', color:'#FFA500', wordWrap:{width:310}}).setOrigin(0);
        }

    }

}
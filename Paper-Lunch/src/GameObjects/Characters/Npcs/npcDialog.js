import NPC from './npc.js';
import Dialoguer from '../../../libraries/dialoguer.js'
import Dialog from '../../../configs/dialogConfig.js';
import Vector2 from '../../../libraries/vector2.js'

export default class NPCDialog extends NPC {
    constructor(data) {
        super(data.scene, data.x, data.y, data.sprite, data.pathName);
        this.dialog = new Dialoguer({
            scene: data.scene,
            dialog: data.dialog,
            x: 0,
            y: 0,
            xSize: data.xTriggerSize,
            ySize: data.yTriggerSize,
            isForced: false,
            callbackArguments: { npc: this },
            onStart: () => {
                this.isTalking = true;
                let missionsHide = data.scene.player.missionList.hideAnim;
                if (!missionsHide.hidden) missionsHide.Toggle()
                if (this.path) {
                    this.path.setMove(false)
                    this.path.stop();
                }
                this.getTogether(data.scene, data.offset);
                let menu = data.scene.pause.animation;
                if (!menu.hidden && !menu.locked) {
                    menu.Toggle()
                }
                menu.locked = true;
            },
            onFinish: () => {
                this.isTalking = false;
                let missionsHide = data.scene.player.missionList.hideAnim;
                if (missionsHide.hidden) missionsHide.Toggle()
                if (this.path) {
                    this.path.setMove(true)
                    this.path.setVelocity()
                }
                data.scene.pause.animation.locked = false;
            },
        });
        this.add(this.dialog.trigger.trigger)
    }

    getTogether(scene, offset) {
        //Uso mi propia clase vector2 porque la de Phaser me da problemas

        //Calcular vectores
        let playerPos = new Vector2(scene.player.x, scene.player.y)
        let thisPos = new Vector2(this.x, this.y)

        //Calcular distancia
        let direction = Vector2.direction(playerPos, thisPos)

        scene.player.setTalkingAnimation(direction);
        this.setTalkingAnimation({ x: direction.x * -1, y: direction.y * -1 })

        //Si no hay ningún offset en este NPC, se usar el offset por defecto
        let charOffset = Dialog.characterOffset;
        if (typeof offset !== 'undefined') charOffset = offset
        if (charOffset === 0) return;

        //Mover al jugador al punto correspondiente con la info calculada
        scene.tweens.add({
            targets: scene.player,
            duration: 250,
            y: this.y + charOffset * direction.y,
            x: this.x + charOffset * direction.x,
        })
    }
}


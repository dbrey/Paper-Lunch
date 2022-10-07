import Trigger from '../libraries/trigger.js'

export default class Tp extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.transform.x, config.transform.y);

        config.scene.add.existing(this);
        this.playerRef = config.scene.player
        this.depth = 200;

        this.offset = config.offset;
        this.id = config.transform.id
        this.linkId = config.link;

        this.canTp = true;
        this.pair = {};

        this.internalTP = new Trigger({
            x: this.x,
            y: this.y,
            scene: config.scene,
            xSize: config.transform.width,
            ySize: config.transform.height,
            enter: () => { if (this.canTp) this.animateTp(config.scene); },
            exit: () => { this.tpActivated(config.scene, true); this.cancelPairTp(config.scene) },
            stay: () => { },
        })
    }


    tp(scene) {
        if ('pair' in this) this.pair = this.searchPair(scene)
        this.playerRef.x = this.pair.x
        this.playerRef.y = this.pair.y + this.offset;
        this.tpActivated(scene, false)
    }

    tpActivated(scene, isActivated) {
        for (const tp of scene.tpList) tp.canTp = isActivated;
    }

    cancelPairTp(scene) {
        if ("pair" in this) this.pair = this.searchPair(scene);
        this.pair.canTp = false;
    }

    searchPair(scene) {
        for (const tp of scene.tpList) {
            if (tp.id === this.linkId) return tp;
        }
    }

    animateTp(scene) {
        scene.tweens.add({
            targets: scene.transitionImg,
            duration: 250,
            alpha: 1,
            ease: 'Circ',
            onStart: () => {
               
            },
            onComplete: () => {
                scene.tweens.add({
                    targets: scene.transitionImg,
                    duration: 1000,
                    alpha: 0,
                    ease: 'Circ',
                    onStart: () => {
                        this.tp(scene)
                        this.playerRef.isTalking = false
                    }
                })
            }
        })
    }
}
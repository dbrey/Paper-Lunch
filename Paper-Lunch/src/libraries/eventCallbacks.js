import PathInsertor from '../libraries/pathInsertor.js'

const events =
{
    RemoveItem: (data, itemName) => {
        let foo = data.scene.player.inventory.removeItemById(itemName)
        if (foo !== -1) data.scene.inventoryBar.updateSlot(foo);
    },
    AddItem: (data, itemName) => {
        let foo = data.scene.player.inventory.addItem(itemName)
        if (foo !== -1) data.scene.inventoryBar.updateSlot(foo);
    },
    PegarPaliza: (data) => {
        let npc = data.arguments.npc;
        if (npc.hitEvenet && !npc.dialog.dialogSttoped) {
            //Si ya existe y no hay otro en segundo plano, volvemos a empezarlo
            npc.hitEvenet()
            npc.dialog.dialogSttoped = true;
        }
        //Si no existe el tween, es que es la primera vez que se ejecuta
        //Asi que lo creo la funcion que lo crea (hay que crearlo cada vez porque el onStart
        //No funciona el recrear
        else {
            npc.hitEvenet = () => {
                if (npc.hit) npc.hit.remove();
                npc.hit = data.scene.tweens.add({
                    targets: data.scene.transitionImg,
                    duration: 250,
                    alpha: 1,
                    ease: 'Circ',
                    onStart: () => { data.scene.hitSound.play(); },
                    onComplete: () => {
                        data.scene.tweens.add({
                            targets: data.scene.transitionImg,
                            duration: 1000,
                            alpha: 0,
                            onComplete: () => {
                                npc.dialog.dialogSttoped = false;
                            }
                        })
                    }
                })
            }
            npc.hitEvenet();
        }
    },
    CreateDailyMissions: (data) => {
        data.scene.player.missionList.deleteAll()
        data.scene.player.missionList.initialiceTexts();
    },
    FadeInOut: (data) => {
        data.arguments.npc.dialog.index = -1;
        data.scene.player.isTalking = true;
        data.scene.fadeIn(() => {
            events.DestroyNPC(data)
            data.scene.player.isTalking = false;
            data.scene.fadeOut();
        });
    },

    Mina: (data) => {
        data.scene.player.isTalking = true;
        data.scene.fadeIn(() => {
            data.arguments.image.destroy(true)
            data.scene.fadeOut();
        });
    },

    DestroyDialoguer: (data) => {
        data.arguments.npc.dialog.dialogSttoped = true;
        data.scene.player.isTalking = true;
        data.arguments.npc.dialog.destroy();
    },

    DestroyNPC(data) { data.arguments.npc.destroy(true); },

    CoronelEvent: (data) => {  events.InsertPath(data, 'coronel')  },

    Ferianta: (data) => { events.InsertPath(data, 'ferianta');},

    InsertPath: (data, pathName) => {
        events.DestroyDialoguer(data)
        data.arguments.npc.irse = new PathInsertor({
            body: data.arguments.npc.body,
            scene: data.arguments.npc.scene,
            context: data.arguments.npc,
            path: pathName,
        })
    },
}

export default events;
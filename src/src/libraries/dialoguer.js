import Dialog from '../configs/dialogConfig.js';
import { loop } from "../libraries/mathFunc.js";
import { getRandomInt } from "../libraries/mathFunc.js";
import * as utils from '../libraries/phaserUtilities.js'
import SocialStatePeople from '../configs/npcSocialGroups.js'
import AnimatedText from '../libraries/animatedText.js'
import Trigger from '../libraries/trigger.js'
/**
 * @param {Phaser.Scene} scene ref to current scene
 * @param {Dialog} dialog dialog object to read
 * @param {function} onStart function called when the dialog is triggered
 * @param {function} onExit function called when the dialog is finished
 * @param {bool} isForced controls wheter the player starts the dialog or is auto
 * @param {object} arguments objeto que se pasa como parametro en los callbacks
 */
export default class Dialoguer {
    constructor(data) {
        this.scene = data.scene;
        this.dialog = data.dialog
        this.isTalking = false;
        this.choosing = false
        this.state = 0;
        this.index = -1;
        this.selection = 0
        this.description = this.scene.add.bitmapText(Dialog.xDialogTextPos, Dialog.yDialogTextPos, Dialog.dialogFont, "foo", Dialog.dialogSize, Dialog.dialogAlign);
        this.name = this.scene.add.bitmapText(Dialog.xDialogNamePos, Dialog.yDialogNamePos, Dialog.dialogFont, "foo", Dialog.dialogSize, Dialog.dialogAlign);
        this.dialogOptions = [1, 2, 3]
        this.arrow = this.scene.add.image(Dialog.xDialogTextPos + Dialog.xSubDialogSpacing + Dialog.xDialogSelection,
            Dialog.yDialogTextPos + Dialog.subDialogInSpacing + Dialog.yDialogSelection, 'arrow');
        this.initializeText([this.name, this.description, this.arrow], false)
        this.onStart = data.onStart;
        this.onFinish = data.onFinish;
        this.isForced = data.isForced
        this.arguments = data.callbackArguments;
        this.dialogSttoped = false;

        this.trigger = new Trigger({
            x: data.x,
            y: data.y,
            scene: data.scene,
            xSize: (typeof data.xSize !== 'undefined') ? data.xSize : 100,
            ySize: (typeof data.ySize !== 'undefined') ? data.ySize : 100,
            enter: () => { },
            stay: () => { this.talk(data.scene) },
            exit: () => { },
        })
    }

    destroy() {
        this.trigger.destroy(true)
    }

    talk(scene) {
        if (!this.choosing && (scene.player.keyDown().interact || this.isForced)) {
            scene.dialogSound.play();
            this.isForced = false;
            if (!this.isTalking) this.StartDialog(scene)
            else if (this.isTalking) {
                if (this.index === -1) this.FinishDialog(scene)
                else this.ContinueDialog(scene)
            }
        }
        else if (this.choosing) {
            let input = scene.player.keyDown()
            if (input.any) this.chooseOption(scene, input)
        }
    }

    currentDialog() {
        return this.dialog[this.index !== -1 ? this.index : this.dialog.length - 1];
    }

    StartDialog(scene) {
        this.animateDialog(scene, 50)
        this.setTalking(scene, true)
        if(this.onStart)this.onStart();
        utils.setVisiblity([this.description, this.name, scene.dialogueImage], true)
        this.initializeIndex(scene)
        this.ContinueDialog(scene)
    }

    checkCallbacks(scene, context = this.currentDialog()) {
        if ("callback" in context) {
            context.callback(
                {
                    arguments: this.arguments,
                    scene: scene
                });
        }
    }

    checkItem(scene, context = this.currentDialog()) {
        if (!('required' in context)) return;
        if (!('mustHaveAll' in context)) context.mustHaveAll = false;
        let hasItem = true;
        for (let i = 0; i < context.required.item.length; i++) {
            hasItem &&= this.containtItems(scene, context.required.item[i])
            if (!hasItem && context.required.item.mustHaveAll) return;
        }
        if (hasItem) {
            this.index = context.required.hasItemIndex;
        }

    }

    containtItems(scene, itemName) {
        return scene.player.inventory.contains(itemName)
    }

    ContinueDialog(scene) {

        //Aunque le des a interactuar el dialogo no avanza 
        //Si el creador por alguna razon decide qeu no debe, ya sea
        //Para esperar a un evento o algo
        if (this.dialogSttoped) return;

        //Comprobar item
        this.checkItem(scene)

        //Actualizar textos
        this.updateTexts()

        this.animateText(scene, this.description)
        //this.animateText(scene, this.name)

        this.checkCallbacks(scene)
        if (this.index === -1) {
            this.FinishDialog(scene)
            return;
        }

        //Miramos si este dialogo era necesario para completar alguna mision
        this.checkMissionCompleted(scene, this.currentDialog())

        this.changeDialogImage(this.checkSocialGroup(), scene)

        //Actualizar índice y estado (el indice cambia en función del estado actual)
        if (!("options" in this.currentDialog())) this.iterateStates(this.updateStateAndIndex)
        else {
            this.arrow.visible = true

            //Creacion opciones de dialogo
            this.dialogOptions = []

            //Actualizar textos
            for (let i = 0; i < this.currentDialog().options.length; i++) {
                this.dialogOptions.push(scene.add.bitmapText(
                    Dialog.xDialogTextPos + Dialog.xSubDialogSpacing, Dialog.yDialogTextPos + Dialog.subDialogInSpacing + i * Dialog.ySubDialogSpacing,
                    Dialog.dialogFont, this.currentDialog().options[i].text, Dialog.subDialogSize, Dialog.dialogAlign))

                this.animateText(scene, this.dialogOptions[i])
            }

            //Poner textos visible
            this.initializeText(this.dialogOptions, true)

            this.choosing = true;
        }
    }

    FinishDialog(scene) {
        if ("timer" in this) this.timer.stopAnimation()
        this.animateDialog(scene, 50, false)
        utils.setVisiblity([this.description, this.name], false)
        this.setTalking(scene, false)
        if (this.onFinish) this.onFinish()
        this.checkCallbacks(scene)
    }

    chooseOption(scene, input) {
        let down = input.down
        let up = input.up

        //Actualizar selección y posicion del cursor
        if (up || down) {
            //Ejecutar sonido de seleccion
            scene.selection.play();

            //Actualiza internamente el indice
            this.selection = up ? this.selection - 1 : this.selection + 1;
            this.selection = loop(this.selection, this.currentDialog().options.length)

            //Actualiza la posicion del cursor en pantalla
            this.arrow.y = (Dialog.yDialogTextPos +
                Dialog.subDialogInSpacing +
                (this.selection * Dialog.ySubDialogSpacing) +
                Dialog.yDialogSelection)
        }

        if (input.interact) {
            //Ejecutar sonido
            scene.dialogSound.play();
            let selection = this.currentDialog().options[this.selection]
            this.checkCallbacks(scene, selection)
            this.checkMissionCompleted(scene, selection)
            this.arrow.visible = false
            this.choosing = false

            if (selection.nextState) this.state = selection.nextState;
            this.index = selection.nextIndex


            utils.setVisiblity(this.dialogOptions, false)
            if (this.index === -1) this.FinishDialog(scene)
            else this.ContinueDialog(scene)
        }
    }

    //Metoodos auxiliares

    animateDialog(scene, value, start = true) {
        let imgAlpha = 0
        scene.dialogueImage.y = Dialog.yDialogImage
        if (start) {
            scene.dialogueImage.y += value
            scene.dialogueImage.alpha = 0
            imgAlpha = 1
            value *= -1
        }

        scene.tweens.add({
            targets: scene.dialogueImage,
            duration: 150,
            y: scene.dialogueImage.y + value,
            alpha: imgAlpha,
            ease: 'Circ',
            onComplete: () => { if (!start) scene.dialogueImage.y -= value }
        })
    }

    animateText(scene, target) {
        target.visible = false
        if ("timer" in this) this.timer.stopAnimation()
        this.timer = new AnimatedText(scene, this.description)
    }

    changeDialogImage(SocialName, scene) {
        scene.dialogueImage.setFrame(SocialName)
    }

    checkSocialGroup() {
        let groups = SocialStatePeople.length
        for (let i = 0; i < groups; i++) {
            if (SocialStatePeople[i].peopleIn.includes(this.currentDialog().name)) {
                return SocialStatePeople[i].name
            }
        }
    }

    checkMissionCompleted(scene, context) {
        if ("completed" in context) scene.player.missionList.setCompleted(context.completed)
        if ("points" in context) scene.player.missionList.setPoints(context.points, scene)

    }

    updateTexts() {
        this.initializeIndex()
        this.name.text = this.currentDialog().name
        //console.log(this.index + " " +this.currentDialog().text)    
        let random = getRandomInt(this.currentDialog().text.length)
        this.description.text = this.currentDialog().text[random]
        this.description.text = this.indentText(this.description.text)
        this.description.update()
    }

    indentText(text) {
        let l = text.length
        for (let i = Dialog.textLimit; i < l; i += Dialog.textLimit) {
            let wordEnd = i
            while (wordEnd < l && text[wordEnd] !== " ") { wordEnd++; }
            wordEnd++;

            let wordBeggining = i
            while (wordBeggining > 0 && text[wordBeggining] !== " ") { wordBeggining--; }
            wordBeggining++

            let final = (wordEnd - i) >= (i - wordBeggining) ? wordBeggining : wordEnd
            text = text.insert(final, "\n")
        }
        return text;
    }

    indentTexts(texts) {
        for (let i = 0; i < texts.length; i++) this.indentText(texts[i]);
    }

    initializeIndex() {
        if (this.index === -1) {
            this.index = this.dialog.length - 1
            this.iterateStates(this.updateIndex)
        }
    }

    updateIndex(context, i = 0) {
        context.index = context.currentDialog().state[i].nextIndex;
    }

    updateState(context, i = 0) {
        if ("nextState" in context.currentDialog().state[i]) {
            context.state = context.currentDialog().state[i].nextState;
        }
    }

    updateStateAndIndex(context, i = 0) {
        context.updateState(context, i)
        context.updateIndex(context, i)
    }

    iterateStates(doThing) {
        loop:
        for (let i = 0; i < this.currentDialog().state.length; i++) {
            for (let j = 0; j < this.currentDialog().state[i].targetState.length; j++) {
                if (this.currentDialog().state[i].targetState[j] === this.state
                    || this.currentDialog().state[i].targetState[j] === "any") {
                    doThing(this, i)
                    break loop;
                }
            }
        }
    }

    initializeText(texts, visibility) {
        utils.setVisiblity(texts, visibility)
        utils.setStatic(texts)
        utils.setDepth(texts, 100)
    }

    setTalking(scene, bool) {
        scene.player.isTalking = bool;
        this.isTalking = bool
    }
}


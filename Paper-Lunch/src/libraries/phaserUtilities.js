/**
 * Set the visibilty of a group of Phaser Objects
 * @param {object array} objects object array to setvisibily
 * @param {boolean} visibility should the objects be visible
 */
export function setVisiblity(objects, visibility){
    for (let i = 0; i < objects.length; i++) {
        objects[i].visible = visibility;
    }
}

/**
 * SetScroll factor to 0 to multiple Phaser objects at once
 * @param {object array} objects objects to set statis
 */
export function setStatic(objects) {
    for (let i = 0; i < objects.length; i++){
        objects[i].setScrollFactor(0);;
    }
}

/**
 * Set the depth of multiplke objects at a time
 * @param {object array} objects objects to set the depth
 * @param {number} depth depth to give to the objects 
 */
export function setDepth(objects, depth) {
    for (let i = 0; i < objects.length; i++){
        objects[i].depth = depth;
    }
}
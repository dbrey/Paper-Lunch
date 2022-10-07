import PathFollower from './pathFollower.js'
import PathNode from './pathNode.js'
import Paths from '../paths/genericPath.js'

/**
 * Class that insert a path from a js object in other object
 * @param {Object} data needed for constructing the class
 * 
 * // PARAMS NEEDED TO PASS AS AN OBJECT WHEN CREATING ///
 * 
 * @param {Phaser.GameObject} context where to insert the pathFollower
 * @param {Phaser.Scene} scene scene wheere the gameObject is located
 * @param {string} path pathName to be converted to inset
 * @param {PathInsertor.Body} body body of the Phaser.GameObject
 */
export default class PathInsertor {
    constructor(data) {
        this.body = data.body;
        this.scene = data.scene
        this.context = data.context;
        this.path = this.searchPath(data.path);
        this.inserPath()
    }

    inserPath() {
        this.move(this.path)
    }

    move(data) {
        this.context.path = new PathFollower({
            path: this.generatePathFromObject(data.path),
            sceneRef: this.scene,
            body: this.body,
            loop: data.loop,
            entity: this.entity,
            onFinish: () => { //This method is located in the path object file
                if ('onFinish' in data) {
                    data.onFinish({
                        scene: this.scene,
                        context: this.context,
                    })
                }
               
            }
        })
    }

    //Asumimos que siempre va a existir un path a encontrar
    searchPath(path) {
        for (let i = 0; i < Paths.length; i++) {
            if (Paths[i].name === path) return Paths[i]
        }
    }

    generatePathFromObject(path) {
        let paths = [];
        let pathLengh = path.length;
        let xTotal = 0;
        let yTotal = 0;
        for (let i = 0; i < pathLengh; i++) {
            xTotal += path[i].x;
            yTotal += path[i].y;
            paths.push(new PathNode({
                x: this.body.position.x + xTotal,
                y: this.body.position.y + yTotal,
                speed: path[i].speed,
                delay: path[i].delay,
            }))
        }
        return paths;
    }
}



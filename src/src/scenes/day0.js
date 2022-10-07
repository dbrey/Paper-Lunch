import BaseDay from './dayBase.js'

export default class Day0F extends BaseDay {
    constructor() {
        super({
            key: 'day0',
            objectLayerName: 'Dia0',
            nextLevel: 'day1',
        })
    }
}
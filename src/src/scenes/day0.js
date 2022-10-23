import DIA_DEFAULT from './dayBase.js'

export default class Day0F extends DIA_DEFAULT {
    constructor() {
        super({
            key: 'day0',
            objectLayerName: 'Dia0',
            nextLevel: 'day1',
        })
    }
}
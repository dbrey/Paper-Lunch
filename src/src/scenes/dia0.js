import DIA_DEFAULT from './dia_default.js'

export default class Dia0 extends DIA_DEFAULT {
    constructor() {
        super({
            key: 'Dia0',
            objectLayerName: 'PrimerDia',
            nextLevel: 'Dia1',
        })
    }
}
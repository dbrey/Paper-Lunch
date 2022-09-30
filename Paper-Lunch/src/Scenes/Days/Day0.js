import BaseDay from './DayBase.js'
import dialogs from '../../dialogs/packedDialogs/dialogs0.js'

export default class Day0F extends BaseDay {
    constructor() {
        super({
            key: 'day0',
            dialog: dialogs,
            objectLayerName: 'Dia0',
            nextLevel: 'day1',
        })
    }
}
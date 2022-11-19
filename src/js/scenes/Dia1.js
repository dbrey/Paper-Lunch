import DIA_DEFAULT from "./dia_default";

export default class Day0 extends DIA_DEFAULT
{
    constructor(config) {
        super({ 
        key: 'Dia1',
        objectLayerName: config.objectLayerName,
        numN: config._numN,
        money: config._money,
        nextDay: config.nextDay,
    });
    }

    create()
    {
        super.create();
    }
}
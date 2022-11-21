import DIA_DEFAULT from "./dia_default.js";

export default class Day0 extends DIA_DEFAULT
{
    constructor(config) {
        super( 'PrimerDia',{ 
        objectLayerName: 'PrimerDia',
        //numN: config._numN,
        //money: config._money,
        nextDay: 'SegundoDia',
    });
    }

    create()
    {
        console.log("Tremendo dia");
        super.create();
    }
}
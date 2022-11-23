import DIA_DEFAULT from "./dia_default.js";

export default class Day0 extends DIA_DEFAULT
{
    constructor() {
        super( 'PrimerDia', 
        'PrimerDia',
        'SegundoDia',);

        
    }

    init(data)
    {
        super.init(data);
    }

    create()
    {
        console.log("Tremendo dia");
        super.create();
    }
}
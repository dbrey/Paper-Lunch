import DIA_DEFAULT from "./dia_default.js";

export default class Day2 extends DIA_DEFAULT
{
    constructor() {
        super( 'SegundoDia', 
        'PrimerDia',
        'TercerDia',);

        
    }

    init(data)
    {
        super.init(data);
    }

    create()
    {
        console.log("Segundo dia");
        super.create();
    }
}
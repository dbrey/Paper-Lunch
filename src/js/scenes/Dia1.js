import DIA_DEFAULT from "./dia_default.js";

export default class Day1 extends DIA_DEFAULT
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
        console.log("Primer dia");
        super.create();
    }
}
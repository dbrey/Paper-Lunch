import DIA_DEFAULT from "./dia_default.js";

export default class Day4 extends DIA_DEFAULT
{
    constructor() {
        super( 'SeptimoDia', 
        'PrimerDia',
        'NoMas',);

        
    }

    init(data)
    {
        super.init(data);
    }

    create()
    {
        console.log("Septimo dia");
        super.create();
    }
}
import DIA_DEFAULT from "./dia_default.js";

export default class Day3 extends DIA_DEFAULT
{
    constructor() {
        super( 'TercerDia', 
        'PrimerDia',
        'CuartoDia',);

        
    }

    init(data)
    {
        super.init(data);
    }

    create()
    {
        console.log("Tercer dia");
        super.create();
    }
}
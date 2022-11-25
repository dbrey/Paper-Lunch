import DIA_DEFAULT from "./dia_default.js";

export default class Day4 extends DIA_DEFAULT
{
    constructor() {
        super( 'CuartoDia', 
        'PrimerDia',
        'QuintoDia',);

        
    }

    init(data)
    {
        super.init(data);
    }

    create()
    {
        console.log("Cuarto dia");
        super.create();
    }
}
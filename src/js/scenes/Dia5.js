import DIA_DEFAULT from "./dia_default.js";

export default class Day4 extends DIA_DEFAULT
{
    constructor() {
        super( 'QuintoDia', 
        'PrimerDia',
        'SextoDia',);

        
    }

    init(data)
    {
        super.init(data);
    }

    create()
    {
        console.log("Quinto dia");
        super.create();
    }
}
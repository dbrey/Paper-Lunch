import Names from '../../configs/npcNames.js'
import events from '../../libraries/eventCallbacks.js';

const Dialog =
    [
        {
            id: 0,
            name: Names.Ferianta,
            text: ["¿Cómo has sabido que estoy aquí? Ni si quiera se lo he dicho a mi marido. ¡Quién se ha chivado!"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 1
                },
            ]
        },
        {
            id: 1,
            name: Names.Ferianta,
            text: ["Si piensas atraparme estás jodido. Gracias por la ayuda anciano. Dile a mi marido que es un inútil."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 2
                },
            ],
        },
        {
            id: 2,
            name: Names.Ferianta,
            text: ["Hasta nunca"],
            completed: 4,
            state: [
                {
                    targetState: ["any"],
                    nextIndex: -1
                },
            ],
        },
        {
            id: -1,
            //CALLBACK DE QUE SE PIRA HACIA LA DERECHA HACIA EL BOSQUE
            callback: (data) => { events.Ferianta(data)},
            state: [
                {
                    targetState: [0],
                    nextIndex: 0
                }
            ]
        }
    ]

export default Dialog;
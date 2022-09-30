import Names from '../../configs/npcNames.js'
import item from '../../configs/itemNames.js'
import events from '../../libraries/eventCallbacks.js';

const Dialog =
    [
        {
            id: 0,
            name: Names.Lola,
            text: ["Muy buenas señor Policía, ¿Qué le trae por aquí?"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 1
                },
            ]
        },
        {
            id: 1,
            name: Names.Police,
            text: ["(¿Soy discreto o voy al grano?)"],
            options:
                [

                    {
                        text: "Vengo a detenerte por apoyar a la revolución a escondidas",
                        nextIndex: 2,
                    },
                    {
                        text: "Creo que sabes de sobra a qué he venido...",
                        nextIndex: 3,
                    },
                ],
        },
        {
            id: 2,
            name: Names.Lola,
            text: ["No sé de que me hablas...mi marido apoya al dictador y tengo una familia y una hija..."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 4
                },
            ],
        },
        {
            id: 3,
            name: Names.Police,
            text: ["(¿Se piensa que somos tontos?)"],
            options:
                [

                    {
                        text: "Detener",
                        nextIndex: 4,
                    },
                    {
                        text: "Detener",
                        nextIndex: 4,
                    },
                ],
        },
        {
            id: 4,
            name: Names.Lola,
            text: ["VALE SI SOY CULPABLE. Yo incité la manifestación de ayer, pero por favor no me detengas haré lo que sea"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 5
                },
            ]
        },
        {
            id: 5,
            name: Names.Lola,
            text: ["Te daré una bolsa de oro y hasta mi anillo de casada"],
            options:
                [

                    {
                        text: "Aceptar soborno y dejarla libre",
                        nextIndex: 6,
                        points: 40
                    },
                    {
                        text: "Detener igualmente",
                        nextIndex: 8,
                        points: -40
                    },
                ],
        },
        {
            id: 6,
            //Te da la bolsa y el anillo de casada
            callback: (data) => {
                events.AddItem(data, item.BolsaDinero);
                events.AddItem(data, item.Anillo);
            },
            name: Names.Lola,
            text: ["¡TOMA TODO! Muchas gracias. Si sigues así mañana el dictador no te mandará ninguna orden. ¡Sigue apoyándonos!"],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                },
            ],
            completed: 1
        },
        {
            id: 7,
            name: Names.Lola,
            text: ["Continúa así y mañana será un gran día."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: -1
                },
            ]
        },
        {
            id: 8,
            name: Names.Lola,
            text: ["Estábamos A PUNTO de asesinar a Reltih. Pero tú sigue así, que igual el que muere es otro..."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 9
                },
            ],
        },
        {
            id: 9,
            name: Names.Lola,
            text: ["Continúa así y mañana el que no despierta eres tú...No pienses que me vas a pillar tan facilmente jeje"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 10
                },
            ],
            completed: 1
        },
        {
            id: 10,
            callback: (data) => {
                events.FadeInOut(data)
            },

            name: Names.Lola,
            text: ["Nos vemos..."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: -1
                },
            ]
        },
        {
            id: -1,
            state: [
                {
                    targetState: [0],
                    nextIndex: 0
                },
                {
                    targetState: [1],
                    nextIndex: 7
                }
            ]
        }
    ]

export default Dialog;
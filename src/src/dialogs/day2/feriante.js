import Names from '../../configs/npcNames.js'
import event from '../../libraries/eventCallbacks.js'
import item from '../../configs/itemNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Feriante,
            text: ["Ya sé a lo que vienes, pero no te puedo ofrecer nada más que 5 monedas... No hemos conseguido las 2 bolsas que necesitas"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 1
                },
            ]
        },
        {
            id: 1,
            name: Names.Feriante,
            text: ["Con las limitaciones de Reltih no ganamos lo suficiente como para saldar las deudas...Por favor di al dictador que te hemos pagado"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 2
                },
            ],
        },
        {
            id: 2,
            name: Names.Police,
            text: ["..."],
            options:
                [
                    {
                        text: "Chivarse",
                        nextIndex: 3,
                        points: -20
                    },
                    {
                        text: "Guardar el secreto",
                        nextIndex: 5,
                        points: 20
                    }
                ],
        },
        {
            id: 3,
            name: Names.Feriante,
            text: ["Madre mía. Mi mujer desaparece y encima me deja sin blanca...de aquí no salgo vivo."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 4
                },
            ],
            completed:3,
        },
        {
            id: 4,
            name: Names.Feriante,
            text: ["Gracias por nada"],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1

                },
            ]
        },
        {
            id: 5,
            name: Names.Feriante,
            text: ["GRACIAS. En cuanto aparezca mi mujer te prometo que lo pago todo. Gracias de corazón"],
            state: [
                {
                    targetState: ["any"],
                    nextState: 2,
                    nextIndex: -1
                },
            ],
            completed:3
        },
        {
            id: 6,
            name: Names.Feriante,
            text: ["Gracias por tu comprensión"],
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
                    nextIndex: 4
                },
                {
                    targetState: [2],
                    nextIndex: 6
                }
            ]
        }
    ]

export default Dialog;
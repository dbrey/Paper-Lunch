import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Tabernera,
            text: ["Tú debes de ser el nuevo policía que ha venido a sustituir al antiguo. Supongo que estarás haciendo el protocolo de hablar con todos como siempre. ¿Quieres una birra? Son 2 pavos"],
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
            text: ["Hmmm..."],
            options:
            [
                {
                    text: "¿2 pavos? No gracias.",
                    nextIndex: 2,
                    points:-20
                },
                {
                    text: "Si me lo sirves tú, encantado.",
                    nextIndex: 3,
                    points:15
                },
                {
                    text: "Venga Vale.",
                    nextIndex: 4,
                    points:5
                }
            ],
        },
        {
            id: 2,
            name: Names.Tabernera,
            text: ["Madre mía, has tenido un mal día?Como seas así en el pueblo vas a durar 3 días contados...mucha suerte canalla, la vas a necesitar."],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                },
            ],
            completed:0
        },
        {
            id: 3,
            name: Names.Tabernera,
            text: ["Uhh, que lanzado. Me gusta tu iniciativa, pero estoy casado con el borracho que tienes ahí en frente cielo. Aquí tienes tu cerveza. Mucha suerte en este sitio."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 6
                },
            ],

        },
        {
            id: 4,
            name: Names.Tabernera,
            text: ["Aqui tienes cielo, mucha suerte por aquí, la vas a necesitar."],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                },
            ],
            completed:0
        },
        {
            id: 5,
            name: Names.Tabernera,
            text: ["Estoy ocupado cielo, ¿Podrías volver luego?","Aprovecha y conoce a todos que aqui todos somos muy agradables."],
            state: [
                {
                    targetState:["any"],
                    nextIndex: -1
                },
            ]
        },
        {
            id: 6,
            name: Names.Tabernera,
            text: ["Espero que no te pase lo mismo que le ocurrio al otro policia...se te ve buen chaval."],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                },
            ],
            completed:0

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
                    nextIndex: 5
                }
            ]
        }
    ]

export default Dialog;
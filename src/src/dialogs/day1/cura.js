import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Cura,
            text: ["Dios le bendiga, ¿Qué le trae por aquí señor?"],
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
            text: ["Hmm"],
            options:
                [
                    {
                        text: "Nada nada",
                        nextIndex: -1,
                        points: 0
                    },
                    {
                        text: "Venia a rezar un poco",
                        nextIndex: 2,
                        points: -5
                    },
                    {
                        text: "Pasaba de paso y queria presentarme",
                        nextIndex: 2,
                        points: 0
                    },
                ],
        },
        {
            id: 2,
            name: Names.Cura,
            text: ["Veo que usted tiene una muy buena voluntad. Recuerde que la Iglesia siempre apoya a los superiores, que tenga un buen dia y Dios le bendiga"],
            state: [
                {
                    targetState: ["any"],
                    nextState:1,
                    nextIndex: -1
                },
            ],
        },
        {
            id: 3,
            name: Names.Cura,
            text: ["Que Dios le bendiga"],
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
                    nextIndex: 3
                },
            ]
        }
    ]

export default Dialog;
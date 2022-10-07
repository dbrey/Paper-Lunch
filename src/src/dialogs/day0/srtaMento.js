import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.SrtaMento,
            text: ["¡Oh! Que traje más guay llevas puesto. ¿Me lo dejas?"],
            options:
            [
                {
                    text: "...(¿Quién es esta cria?)",
                    nextIndex: 2,
                    points:-10
                },
                {
                    text: "¿Quizás otro día vale cielo?",
                    nextIndex: 1,
                    points:10
                },
                {
                    text: "ehm...No.",
                    nextIndex: 2,
                    points:-10
                }
            ],
        },
        {
            id: 1,
            name: Names.SrtaMento,
            text: ["Bueno...pues vale."],
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
            id: 2,
            name: Names.SrtaMento,
            text: ["¡ERES UN CASCARRABIAS!"],
            state: [
                {
                    targetState: ["any"],
                    nextState: 2,
                    nextIndex: -1
                },
            ],
            completed:0
        },
        {
            id: 3,
            name: Names.SrtaMento,
            text: ["A ver que dia me dejas tu ropa.","Con tu ropa me pido ser la policia y tu el ladron.","..."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: -1
                },
            ]
        },
        {
            id: 4,
            name: Names.SrtaMento,
            text: ["Eres un rancio!","¡Viejo!","Solo queria jugar un rato."],
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
                {
                    targetState: [2],
                    nextIndex: 4
                }
            ]
        }
    ]

export default Dialog;
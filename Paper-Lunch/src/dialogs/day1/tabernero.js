import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Tabernero,
            text: ["..."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 1
                }
            ]
        },
        {
            id: 1,
            name: Names.Police,
            text: ["(¿Ya va borracho a estas horas del dia?)"],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                }
            ],
        },
        {
            id: 2,
            name: Names.Tabernero,
            text:
                [
                    "...", "*Burp*"
                ],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: -1
                }
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
                    nextIndex: 2
                }
            ]
        }
    ]

export default Dialog;
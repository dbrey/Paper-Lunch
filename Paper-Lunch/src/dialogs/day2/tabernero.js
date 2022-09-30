import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Tabernero,
            text: ["Cuidadito con mi mujer *Burp*, que soy un borracho pero leal. *Burp*"],
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
            text: ["(Lo mismo de siempre)"],
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
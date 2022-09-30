import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Tabernero,
            //callback: (context) => {context.y += 50},
            text: ["(Borracho) Burp...¿ Eres el nuevo policía de la zona? A ver si te gastas más dinero en mi taberna que el antiguo, sois todos unos tacaños."],
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
            text:["...", "No te preocupes..."],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                }
            ],
            completed: 0,
        },
        {
            id: 2,
            name: Names.Police,
            text:
                [
                    "...", "No te preocupes..."
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
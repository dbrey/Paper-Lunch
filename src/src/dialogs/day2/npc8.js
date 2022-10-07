import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Pueblerina,
            text: ["Dicen que en el bosque al Este de la ciudad vive un anciano solitario...nadie ha llegado a verlo todavia."],
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
                }
            ]
        }
    ]

export default Dialog;
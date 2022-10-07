import Names from '../../configs/npcNames.js'
import events from '../../libraries/eventCallbacks.js';

const Dialog =
    [
        {
            id: 0,
            name: Names.MadMan,
            text: ["¡Cuá,cuá!"],
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
            text: ["..."],
            options:
                [
                    {
                        text: "Pegar",
                        nextIndex: 2,
                    },
                    {
                        text: "Dejarle",
                        nextIndex: -1,
                    },
                ],
        },
        {
            callback: (data) => {  events.PegarPaliza(data) },
            id: 2,
            name: Names.MadMan,
            text: ["¡Cuá,cuá,cuá!", "¡Cuá!", "¡Cuaaaa!", "¡Cuá cuá!"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 1
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
            ]
        }
    ]

export default Dialog;
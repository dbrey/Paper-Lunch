import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Carcelero,
            text: ["No te preocupes, ya estoy yo vigilando la carcel. A ver si consigues traer al ladrón que anda suelto"],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                },
            ]
        },
        {
            id: 1,
            name: Names.Carcelero,
            text: ["...","No me molestes","Estoy concentrado","Déjame y ponte a trabajar"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: -1
                },
            ],
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
                    nextIndex: 1
                }
            ]
        }
    ]

export default Dialog;
import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Agricultor,
            text: ["Cada vez somos más ancianos y nadie quiere tener hijos en un sitio como este"],
            state: [
                {
                    targetState: ["any"],
                    nextState:1,
                    nextIndex: -1
                },
            ]
        },
        {
            id: 1,
            name: Names.Pueblerino,
            text: ["¿A quién le daré mis tierras?","No sé ni por qué sigo sembrando..."],
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
                    nextIndex: 1
                }
            ]
        }
    ]

export default Dialog;
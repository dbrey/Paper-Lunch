import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Homeless,
            text: ["Por gente como tú me quede en trabajo y vivo en la calle","¿Se puede saber por qué apoyas a un dictador?","No se como puedes dormir con la conciencia tranquila"],
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
import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Ferianta,
            text: ["Bla bla bla. Ya sabemos quien eres, no hace falta presentaciones."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 1
                },
            ]
        },
        {
            id: 1,
            name: Names.Ferianta,
            text: ["El show comienza dentro de unos días. Espero que me traigas los carteles en cuanto te lleguen"],
            state: [
                {
                    targetState: ["any"],
                    nextState:1,
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
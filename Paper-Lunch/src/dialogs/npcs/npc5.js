import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.PueblerinoRico,
            text: ["¿Sabías que hay un loco en el pueblo al que puedes pegarle siempre que quieras? Nunca se queja. No sabemos que le pasa"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 1
                },
            ]
        },
        {
            id: 1,
            name: Names.PueblerinoRico,
            text: ["Suele estar a la izquierda del castillo, dando vueltas a un arbol constantemente"],
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
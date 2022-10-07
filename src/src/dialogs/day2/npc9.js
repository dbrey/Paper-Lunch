import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.PueblerinoRico,
            text: ["Puedes soltar cualquier objeto si no lo quieres pulsando el objeto y la flecha que tienes en la esquina inferior izquierda"],
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
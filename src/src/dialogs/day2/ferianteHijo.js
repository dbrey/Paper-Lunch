import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.SrFeriante,
            text: ["Blin Blin","Pe-pe-pe...","Weeeee"],
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
import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Police,
            text: ["Supuestamente mañana viene la revolución...Yo me he posicionado donde he considerado."],
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
            text: ["Mi trabajo está hecho. Buenas Noches..."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: -1
                },
            ],
            completed:0,
        },
        {
            id: -1,
            callback: (data) => {
                data.scene.changeScene();
            },
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 0
                },
            ]
        }
    ]

export default Dialog;
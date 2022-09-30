import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Police,
            text: ["Hoy ha sido un dia duro", "Vaya dia", "Estoy reventado"],
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
            text: ["Me voy a dormir, mañana mas"],
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
import Names from '../../configs/npcNames.js'
import events from '../../libraries/eventCallbacks.js';
import PathInsertor from '../../libraries/pathInsertor.js';

const Dialog =
    [
        {
            id: 0,
            name: Names.Coronel,
            callback: (data) => {
                data.scene.player.missionList.addText("Ve a hablar con el dictador", false)
            },
            text: ["Supongo que tú serás el nuevo Policia. Ven cuanto antes al castillo. Está justo aquí encima de tu casa. El dictador te está esperando para darte tus misiones"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 1
                },
            ]
        },
        {
            id: 1,
            name: Names.Coronel,
            text: ["Yo soy el Coronel, y no me fio de NADIE, así que ten cuidadito con lo que haces."],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                },
            ],
            completed: 0,
        },
        {
            id: 2,
            name: Names.Coronel,
            text: ["Estaré vigilando..."],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                },
            ]
        },
        {
            id: 3,
            name: Names.Coronel,
            text: ["Te estoy vigilando", "No pienses que porque seas nuevo te voy a ayudar", "El dictador te está esperando"],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                },
            ]
        },
        {
            id: -1,
            callback: (data) => {  events.CoronelEvent(data) },
            state: [
                {
                    targetState: [0],
                    nextIndex: 0
                },
                {
                    targetState: [1],
                    nextIndex: 3
                }
            ]
        }
    ]

export default Dialog;
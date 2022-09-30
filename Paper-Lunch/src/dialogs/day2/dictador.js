import Names from '../../configs/npcNames.js'
import event from '../../libraries/eventCallbacks.js'
import item from '../../configs/itemNames.js'
import events from '../../libraries/eventCallbacks.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Dictator,
            text: ["Hoy es un día importante. La revolución está al llegar. Voy a ser breve con las misiones:"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 1
                },
            ]
        },
        {
            id: 1,
            name: Names.Dictator,
            text: ["Ve a cobrar la deuda de los feriantes. Este mes no me han pagado"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 2
                },
            ],
        },
        {
            id: 2,
            name: Names.Dictator,
            text: ["Deten a Lola Mento. Hay que quitarse a los cabecillas de encima para debilitarlos"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 3
                },
            ]
        },
        {
            id: 3,
            name: Names.Dictator,
            text: ["Encuentra a la feriante, lleva un día desaparecida y me da muy mala espina...la ultima vez se la vio yendo al bosque del este"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 4
                },
            ]
        },
        {
            id: 4,
            name: Names.Dictator,
            text: ["Luego detienes a Paca, si no puede ser mía no se merece ninguna libertad, me tiene harto ya."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 5
                },
            ]
        },
        {
            id: 5,
            name: Names.Dictator,
            text: ["Y ya de paso cuando acabes comprame una alfombra persa en la tienda de empeños. El castillo está muy soso. Toma el dinero"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 6
                },
            ]
        },
        {
            id: 6,
            callback: (data) => {
                event.AddItem(data, item.BolsaDinero);
            },
            name: Names.Dictator,
            text: ["Te dejaré las misiones escritas en la libreta por si se te olvidan. Recuerda que al acabarlas puedes irte a casa a descansar, mañana será un dia duro..."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 7
                },
            ]
        },
        {
            id: 7,
            name: Names.Dictator,
            text: ["¿Estás preparado para el dia final?"],
            options:
                [
                    {
                        text: "Por supuesto señor",
                        nextIndex: 8,
                    },
                    {
                        text: "¡Ahora y siempre!",
                        nextIndex: 8,
                    }
                ],
        },
        {
            id: 8,
            name: Names.Dictator,
            callback: (data) => { events.CreateDailyMissions(data) },
            text: ["Así me gusta. ¡Ahora sal ahí y frena esa ola!"],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                },
            ],
        },
        {
            id: 9,
            name: Names.Dictator,
            text: ["Recuerda mirar la libreta si no te acuerdas de las misiones", "A por todas", "Cuento contigo"],
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
                    nextIndex: 9
                }
            ]
        }
    ]

export default Dialog;
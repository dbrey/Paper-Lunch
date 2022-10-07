import Names from '../../configs/npcNames.js'
import events from '../../libraries/eventCallbacks.js';

const Dialog =
    [
        {
            id: 0,
            name: Names.Dictator,
            text: ["Buenos días. Espero que hayas dormido bien. Hoy viene un dia duro"],
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
            text: ["Supongo que ayer habrás hablado con la mayoria de gente así que te voy a comentar las misiones de hoy"],
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
            text: ["Me han llegado dos formatos de carteles feriales para los feriantes del pueblo. Se encuentran en el sur de la ciudad, necesito que vayas a darles los carteles que veas, que no veo bien."],
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
            text: ["Por otra parte no se si hablaste con la mujer del carcelero, pero me está resultando un tanto sospechosa. Necesito que vayas e investigues sobre si está conspirando contra mi"],
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
            text: ["También me han comunicado que hay un ladrón suelto por el pueblo. Tiene un gorro rojo. Encuentralo y arrestalo. La ultima vez se le vio por el oeste del pueblo"],
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
            text: ["Por la zona de los pobres hay una aglomeración de gente que necesito que disipes. Esos pobres revolucionarios no se van a salir con la suya"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 6
                },
            ]
        },
        {
            id: 6,
            name: Names.Dictator,
            text: ["Por último he descubierto que hay un grupo de revolucionarios ahí. Te he dejado el material al lado de la mina jeje. Se encuentra en el suroeste del pueblo"],
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
            text: ["Te dejaré las misiones escritas en la libreta por si se te olvidan. Recuerda que al acabarlas puedes irte a casa a descansar"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 8
                },
            ]
        },
        {
            id: 8,
            name: Names.Dictator,
            text: ["¿Estás dispuesto a darlo todo por tu dictador?"],
            options:
                [
                    {
                        text: "Por supuesto señor",
                        nextIndex: 9,
                    },
                    {
                        text: "¡Hasta el dia que me muera!",
                        nextIndex: 9,
                    }
                ],
        },
        {
            id: 9,
            name: Names.Dictator,
            callback: (data) => { events.CreateDailyMissions(data) },
            text: ["Así me gusta. ¡Ahora sal ahí y ve a por todas!"],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                },
            ],
        },
        {
            id: 10,
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
                    nextIndex: 10
                }
            ]
        }
    ]

export default Dialog;
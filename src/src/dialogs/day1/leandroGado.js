import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.BestFriend,
            text: ["Veo que te has desenvuelto muy bien por el pueblo."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 1
                },
            ]
        },
        {
            id: 1,
            name: Names.BestFriend,
            text: ["Yo me iré a pescar un rato luego...desde que me quedé sin trabajo no tengo mucho más que hacer por aquí."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 2
                },
            ]
        },
        {
            id: 2,
            name: Names.BestFriend,
            text: ["Aunque por lo que veo tu no tienes ni descanso. Desde que Reltith vino aqui no hace más que estragos en el pueblo..."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 3
                },
            ]
        },
        {
            id: 3,
            name: Names.BestFriend,
            text: ["Pero bueno...no te voy a contar toda la historia. Prefiero contar un chiste verde antes de irme."],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: 4
                },
            ]
        },
        {
            id: 4,
            name: Names.BestFriend,
            text: ["¿QUE DIFERENCIA HAY ENTRE LÁSTIMA Y LASTIMA?"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 5
                },
            ]
        },
        {
            id: 5,
            name: Names.BestFriend,
            text: ["¡EL TAMAÑO!"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 6
                },
            ]
        },
        {
            id: 6,
            name: Names.BestFriend,
            text: ["Y con esto y un bizcocho me voy. ¡Mucho ánimo en el trabajo!"],
            state: [
                {
                    targetState: ["any"],
                    nextState:1,
                    nextIndex: -1
                },
            ]
        },
        {
            id: 7,
            name: Names.BestFriend,
            text: ["A ver si un dia que trabajes menos me avisas y hacemos algo","Dime, ¿Ya has arrestado a alguien?"],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                },
            ]
        },
        {
            id: 7,
            name: Names.BestFriend,
            text: ["Si mañana estas mas libre ven a verme!", "Recuerda venir mañana cuando tengas tiempo"],
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
                    nextIndex: 7
                }
            ]
        }
    ]

export default Dialog;
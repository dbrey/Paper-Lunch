import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.OldMan,
            text: ["No pretendas luchar conmigo. Solo soy un pobre anciano haciendo el bien. ¿O piensas que la feriante es la mala de la película?"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 1
                },
            ]
        },
        {
            id: 1,
            name: Names.OldMan,
            text: ["Ya está, la revolución está cerca, y no puedes hacer nada para frenarlo. Ahora deja a este pobre anciano disfrutar el día en el bosque"],
            state: [
                {
                    targetState: ["any"],
                    nextState:1,
                    nextIndex: -1
                },
            ],
            completed:4
        },
        {
            id: 2,
            name: Names.OldMan,
            text: ["Me estás tapando del sol","La revolución está cerca..."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 4
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
                    nextIndex: 2
                }
            ]
        }
    ]

export default Dialog;
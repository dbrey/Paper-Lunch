import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Carcelero,
            text: ["*sigh* Déjame trabajar tranquilo, hoy no tienes nada que hacer por aquí"],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                },
            ]
        },
        {
            id: 1,
            name: Names.Carcelero,
            text: ["...","Dame al menos un dia de paz por favor","No me apetece a hablar","Déjame y ponte a trabajar"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: -1
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
                    nextIndex: 1
                }
            ]
        }
    ]

export default Dialog;
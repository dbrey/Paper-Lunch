import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Carcelero,
            text: ["*sigh* Ya hablaremos mañana en el curro,novato, déjame descansar hoy que es mi día libre."],
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
            text: ["(¿Aquí todo el mundo está amargado?)"],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                },
            ],
            completed:0,
        },
        {
            id: 2,
            name: Names.Carcelero,
            text: ["Ya te dire mañana lo que hay que hacer, no seas impaciente.","No me apetece hablar."],
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
                    nextIndex: 2
                }
            ]
        }
    ]

export default Dialog;
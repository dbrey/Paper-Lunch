import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Agronomo,
            text: ["Ten cuidado a quien apoyas. señor Policia..."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 1
                },
            ]
        },
        {
            id: 1,
            name: Names.Agronomo,
            text: ["El anterior policia no controló muy bien sus decisiones...y digamos que eso ha sido algo reciente, así que apoya a quien quieras pero sin llamar la atención."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex:2
                },
            ]
        },
        {
            
            id: 2,
            name: Names.Police,
            text: ["(Arriba a la derecha tienes el medidor de apoyo. Si está muy alto apoyas mucho al dictador, y si está muy bajo apoyas mucho a la revolución)"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 3
                },
            ]
        },
        {
            
            id: 3,
            name: Names.Police,
            text: ["(Intenta estar dentro de los límites apoyando a quien tú consideres...)"],
            state: [
                {
                    targetState: ["any"],
                    nextState:1,
                    nextIndex: -1
                },
            ],
            completed:0,
        },
        {
            
            id: 4,
            name: Names.Police,
            text: ["(Arriba a la derecha tienes el medidor de apoyo. Si está muy alto apoyas mucho al dictador, y si está muy bajo apoyas mucho a la revolución)"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 5
                },
            ]
        },
        {
            
            id: 5,
            name: Names.Police,
            text: ["(Intenta estar dentro de los límites apoyando a quien tú consideres...)"],
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
                    nextIndex: 4
                }
            ]
        }
    ]

export default Dialog;
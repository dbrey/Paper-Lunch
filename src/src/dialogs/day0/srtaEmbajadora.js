import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.SrtaEmbajadora,
            text: ["Ya se quien eres, te he visto llegar al pueblo antes. Soy la hija de los embajadores del pueblo."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 1
                },
            ],
        },
        {
            id: 1,
            name: Names.SrtaEmbajadora,
            text: ["A ver si al menos me entretienes alguna tarde y me cuentas algo cuando no tengas mucho trabajo, que ultimamente no pasa nada nuevo por aquí"],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                },
            ],
            completed:0
        },
        {
            id: 2,
            name: Names.SrtaEmbajadora,
            text: ["¿Algún cotilleo?","Ojalá suceda algo interesante","Si pasa algo ya sabes, avisame que me aburro"],
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
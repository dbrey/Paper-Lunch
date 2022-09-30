import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Tabernera,
            text: ["¿Que tal ayer como primer día? Espero que no te haya asustado el loco del pueblo-"],
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
            text: ["(...)"],
            options:
            [
                {
                    text: "En absoluto",
                    nextIndex: 2,
                },
                {
                    text: "La única persona que me impone eres tú",
                    nextIndex: 3,
                    points:15
                }
            ],
        },
        {
            id: 2,
            name: Names.Tabernera,
            text: ["Así me gusta. Cada vez me gustas más canalla."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 4
                },
            ],
        },
        {
            id: 3,
            name: Names.Tabernera,
            text: ["Uhh, ya ni te cortas en decirme nada canalla. Que yo soy una mujer casada por desgracia, pero gracias."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 4
                },
            ],
        },
        {
            id: 4,
            name: Names.Tabernera,
            text: ["¿Quieres una birra? Son 2 pavos, y por 1 más te pongo una tapita"],
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
            text: ["Hmmm..."],
            options:
            [
                {
                    text: "¿Las tapas no son gratis aquí? Que ruina",
                    nextIndex: 6,
                },
                {
                    text: "Ponme una birra pero sin tapa",
                    nextIndex: 7,
                },
                {
                    text: "Lo que sea mientras me lo pongas tú",
                    nextIndex: 8,
                }
            ],
        },
        {
            id: 6,
            name: Names.Tabernera,
            text: ["No me calientes que si hace falta te echo del bar, grosero."],
            state: [
                {
                    targetState: ["any"],
                    nextState: 2,
                    nextIndex: -1
                },
            ],
        },
        {
            id: 7,
            name: Names.Tabernera,
            text: ["Que raro eres jaja, pero bueno, aquí tienes cielo."],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                },
            ],

        },
        {
            id: 8,
            name: Names.Tabernera,
            text: ["Al final dejo al mueble que tengo de marido y me voy contigo ¿Eh? Es broma, pero eres un encanto , aquí tienes."],
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
            name: Names.Tabernera,
            text: ["Para hablarme así de mal vete a otro sitio","A ver si mañana estás mas calmado","Déjame trabajar, cuando se te bajen los humos me hablas"],
            state: [
                {
                    targetState:["any"],
                    nextIndex: -1
                },
            ]
        },
        {
            id: 10,
            name: Names.Tabernera,
            text: ["Tu casa es mi casa guapo, ven cuando quieras","A ver si vienes más dias y me alegras las mañanas","Si te hubiera conocido antes de casarme...no te me escapabas mozo"],
            state: [
                {
                    targetState:["any"],
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
                },
                {
                    targetState: [2],
                    nextIndex: 9
                }
            ]
        }
    ]

export default Dialog;
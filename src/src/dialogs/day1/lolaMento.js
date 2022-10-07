import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Lola,
            text: ["Buenos días Policia. ¿A qué se debe su visita?"],
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
            text: ["Buenas Lola, solo vengo a hablar...¿Qué tal os llevais con Relith?"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 2
                },
            ]
        },
        {
            id: 2,
            name: Names.Lola,
            text: ["A ver cielo, pues se lleva, que no es poco, tiene cosas buenas como la buena gestion y el proteccionismo, pero ya no se sí reir o llorar. Al inicio mejor...pero es que llega un punto..."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 3
                },
            ],
        },
        {
            id: 3,
            name: Names.Lola,
            text: ["Estoy HARTA de sus normas nefastas. Nadie puede circular por la noche pero él sí. Nadie puede decir una critica constructiva o se va a la carcel."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 4
                },
            ]
        },
        {
            id: 4,
            name: Names.Lola,
            text: ["HARTA ESTOY. Y SI TOLERO ESTO ES PORQUE RELITH LE DA TRABAJO A MI MARIDO"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 5
                },
            ]
        },
        {
            id: 5,
            name: Names.Lola,
            text: ["Uy...me he sobrepasado...espero que esto último no se lo digas al Dictador o me meterás en lios. ¿Qué le vas a contar?"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 6
                },
            ]
        },
        {
            id: 6,
            name: Names.Police,
            text: ["(¿Debería comentárselo al Dictador?)"],
            options:
                [
                    {
                        text: "Anotar solo comentarios positivos",
                        nextIndex: 7,
                        points: 35
                    },
                    {
                        text: "¡TODO! Hago lo que sea por Reltih, trabajo para él",
                        nextIndex: 8,
                        points: -35
                    },
                ],
        },
        {
            id: 7,
            name: Names.Lola,
            text: ["Ay cielo, eres un amor...no sé ni cómo sigues trabajando para él. Si alguna vez necesitas ayuda escríbeme, buen dia"],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                },
            ],
            completed:1
        },
        {
            id: 8,
            name: Names.Lola,
            text: ["¿O sea que has venido a mi casa para chivarte? Eres lo peor que ha podido traer Relith! Fuera de mi casa ya"],
            state: [
                {
                    targetState: ["any"],
                    nextState: 2,
                    nextIndex: -1
                },
            ],
            completed:1
        },
        {
            id: 9,
            name: Names.Lola,
            text: ["Aquí me tienes para lo que quieras","Pasa un buen día"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: -1
                },
            ]
        },
        {
            id: 10,
            name: Names.Lola,
            text: ["He dicho que te vayas","Ni un día aquí y ya me estás dando disgustos"],
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
                },
                {
                    targetState: [2],
                    nextIndex: 10
                }
            ]
        }
    ]

export default Dialog;
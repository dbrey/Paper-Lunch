import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Ladron,
            text: ["Ehh...buenas señor...solo venía de paso,no se preocupe"],
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
            text: ["(Hmm...no le he visto antes por aquí)"],
            options:
                [
                    {
                        text: "Examinar...parece el ladrón de la nota",
                        nextIndex: 2,

                    },
                    {
                        text: "Preguntarle por qué vino",
                        nextIndex: 3,

                    },
                ],
        },
        {
            id: 2,
            name: Names.Ladron,
            text: ["Vale sí soy yo.¡Que mala suerte tengo siempre! Solo dejame irme. NO PIDO MÁS"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 4
                },
            ],
        },
        {
            id: 3,
            name: Names.Ladron,
            text: ["Emm...venía solo a...emm..."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 2
                },
            ]
        },
        {
            id: 4,
            name: Names.Police,
            text: ["(¿Le detengo?)"],
            options:
                [
                    {
                        text: "Arrestarle",
                        nextIndex: 5,
                        points: -20,
                        completed:2

                    },
                    {
                        text: "Dejarle libre aún sabiendo que es culpable",
                        nextIndex: 6,
                        points: 20,
                        completed:2

                    },
                ],
        },
        {
            id: 5,
            name: Names.Ladron,
            text: ["Joder, pues a la carcel de nuevo ¡Que mala suerte!"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: -1
                },
            ]
        },
        {

            id: 6,
            name: Names.Ladron,
            text: ["Te debo una bien grande. Me voy corriendo"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: -1
                },
            ]
        },
        {
            id: -1,
            callback: (data) => {
                data.scene.tweens.add({
                    targets: data.scene.transitionImg,
                    duration: 500,
                    alpha: 1,
                    ease: 'Circ',
                    onComplete: () => {
                        data.arguments.npc.destroy(true)
                        data.scene.tweens.add({
                            targets: data.scene.transitionImg,
                            duration: 1500,
                            alpha: 0,
                            ease: 'Circ',
                        })
                    }
                })
            },
            state: [
                {
                    targetState: [0],
                    nextIndex: 0
                }
            ]
        }
    ]

export default Dialog;
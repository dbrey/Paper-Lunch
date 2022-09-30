import Names from '../../configs/npcNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.BestFriend,
            text: ["¡Buenas! ¿Acabas de llegar no? Me dijo Paca que se había mudado alguien nuevo en la ciudad y venía a presentarme."],
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
            text: ["Soy Leandro Gado.Llevo un tiempo algo solo y me gustaría hacer nuevos amigos.¿Cómo que has venido a aquí?"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 2
                },
            ]
        },
        {
            id: 2,
            name: Names.Police,
            text: ["(...)"],
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
            text: ["¡¿COMO?! ¡Que eres el nuevo Policía que ha venido a ayudar al Dictador!Lo siento mucho! No sabía nada...a mí solo me dijeron que venía un nuevo vecino...espero no molestarte."],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex:4
                },
            ]
        },
        {
            id: 4,
            name: Names.BestFriend,
            text: ["Igualmente me gustaría que fueramos amigos...los del pueblo son unos rancios, así que ya nos veremos.¿Te parece?"],
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
            text: ["(Parece majo...)"],
            options:
            [
                {
                    text: "Por mi genial, ¡Nos vemos!",
                    nextIndex: 6,
                    points: 10
                },
                {
                    text: "Adios",
                    nextIndex: 6,
                    points: -10
                },
                {
                    text: "Vale,chao",
                    nextIndex: 6,
                    points: -5
                }
            ],
        },
        {
            id: 6,
            name: Names.BestFriend,
            text: ["¡Perfecto! Si me buscas estaré por el sur del pueblo, no tengo tanto dinero como para vivir en el norte."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 7
                },
            ]
        },
        {
            id: 7,
            name: Names.BestFriend,
            completed: 0,
            text: ["El resto de gente que buscas estará en la taberna del pueblo. Esta aquí a mano derecha, la taberna llena de barriles. Yo me voy, Un saludo."],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                },
            ]
        },
        {
            id: 8,
            name: Names.BestFriend,
            text: ["Si mañana estas mas libre ven a verme!","Recuerda venir mañana cuando tengas tiempo"],
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
                    nextIndex: 8
                }
            ]
        }
    ]

export default Dialog;
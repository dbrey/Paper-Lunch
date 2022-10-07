import Names from '../../configs/npcNames.js'
import event from '../../libraries/eventCallbacks.js'
import item from '../../configs/itemNames.js'

const Dialog =
    [
        {
            id: 0,
            required: {
                item: [item.Monedas],
                hasItemIndex: 1
            },
            name: Names.Empeñista,
            text: ["El empeñista, si soy. Todos me conocen así. Cuando tengas algo que adquirir, ya sabes a donde ir"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: -1
                },
            ]
        },
        {
            id: 1,
            name: Names.Empeñista,
            text: ["El empeñista, si soy. Todos me conocen así"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 2
                },
            ]
        },
        {
            id: 2,
            name: Names.Empeñista,
            text: ["Tengo todo tipo de cosas que te puedes imaginar. ¿Que necesitas?"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 3
                },
            ]
        },
        {
            id: 3,
            name: Names.Empeñista,
            text: ["¿Un tinte para la embajadora? ¡Se cuales le gustan! Pero tienes dinero para pagarlo, ¿no? La embajadora es muy exquisita con sus tintes"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 4
                },
            ],
        },
        {
            id: 4,
            name: Names.Empeñista,
            text: ["¿Tienes el dinero para los tintes?"],
            options:
                [
                    {
                        text: "¡Si!",
                        nextIndex: 5,
                    },
                    {
                        text: "No",
                        nextState: 1,
                        nextIndex: -1,
                    }
                ],
        },
        {
            id: 5,
            required: {
                item: [item.Monedas],
                hasItemIndex: 6
            },
            name: Names.Empeñista,
            text: ["Mm,no gracias. Sin dinero no te puedo dar nada. O me traes las monedas o no hay tinte"],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                },
            ]
        },
        {
            id: 6,
            //Te da el tinte y se lleva las monedas
            callback: (data) => {
                event.RemoveItem(data, item.Monedas);
                event.AddItem(data, item.CepilloYJabon);
            },

            name: Names.Empeñista,
            text: ["Veo que la embajadora te ha dado una buena cantidad jeje...aquí tienes tu tinte. Que tengas un buen dia"],
            state: [
                {
                    targetState: ["any"],
                    nextState: 2,
                    nextIndex: -1
                },
            ],
            completed:0
        },
        {
            id: 7,
            name: Names.Empeñista,
            text: ["¡Vuelve siempre que necesites algo!", "Ya sabes que tengo todo lo que necesites tu o el dictador"],
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
                    nextIndex: 4
                },
                {
                    targetState: [2],
                    nextIndex: 7
                }
            ]
        }
    ]

export default Dialog;
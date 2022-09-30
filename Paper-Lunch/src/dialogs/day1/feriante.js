import Names from '../../configs/npcNames.js'
import event from '../../libraries/eventCallbacks.js'
import item from '../../configs/itemNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Feriante,
            text: ["Hombre, ya iba siendo hora. Ayer no pude ir a presentarme. Nosotros somos los feriantes del pueblo"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 1
                },
            ]
        },
        {
            id: 1,
            name: Names.Feriante,
            text: ["Si alguna vez necesitas algo siempre solemos estar por el sur de la ciudad. La gente por esta zona es muy humilde y sencilla..."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 2
                },
            ],
        },
        {
            id: 2,
            name: Names.Feriante,
            text: ["Pero bueno que me desvio"],
            state: [
                {
                    targetState: ["any"],
                    nextState:1,
                    nextIndex: 3
                },
            ]
        },
        {
            id: 3,
            name: Names.Feriante,
            text: ["¿Tienes los carteles que tenia Reltih?"],
            options:
                [
                    {
                        text: "Claro",
                        nextIndex: 5,
                    },
                    {
                        text: "Todavia no",
                        nextIndex: 4,
                    }
                ],
        },
        {
            id: 4,
            name: Names.Feriante,
            text: ["Ven a verme cuando los tengas"],
            state: [
                {
                    targetState: ["any"],
                    nextState:1,
                    nextIndex: -1

                },
            ]
        },
        {
            id: 5,
            //Comprueba si tienes en el inventario los dos carteles
            required: {
                item: [item.CartelesFeriales,item.CartelesCuestionables],
                mustHaveAll:true,
                hasItemIndex: 6
            },
            name: Names.Feriante,
            text: ["No me mientas si no tienes las cosas hombre. Cuando las tengas vuelve."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: -1
                },
            ]
        },
        {
            id: 6,
            name: Names.Feriante,
            text: ["Perfecto. Pues entrégamelos"],
            options:
            [
                {
                    text: "Entregar carteles cuestionables",
                    nextIndex: 7,
                    points:-30
                },
                {
                    text: "Entregar carteles feriales",
                    nextIndex: 7,
                    points:30
                }
            ],
        },
        {
            id: 7,
            //Borra los dos carteles
            callback: (data) => {
                event.RemoveItem(data, item.CartelesFeriales);
                event.RemoveItem(data, item.CartelesCuestionables);
            },

            name: Names.Feriante,
            text: ["Muchas gracias muchacho, nos vemos por ahí"],
            state: [
                {
                    targetState: ["any"],
                    nextState:2,
                    nextIndex: -1
                },
            ],
            completed:0
        },
        {
            id: 7,
            name: Names.Feriante,
            text: ["Déjame trabajar ahora hombre, ya verás la actuación cuando lo promocione."],
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
                    nextIndex: 3
                },
                {
                    targetState: [2],
                    nextIndex: 8
                }
            ]
        }
    ]

export default Dialog;
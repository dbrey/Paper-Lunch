import Names from '../../configs/npcNames.js'
import event from '../../libraries/eventCallbacks.js'
import item from '../../configs/itemNames.js'

const Dialog =
    [
        {
            id: 0,
            required: {
                item: [item.BolsaDinero],
                hasItemIndex: 1
            },
            name: Names.Empeñista,
            text: ["Mientras no tengas dinero en el inventario no te molestes en hablarme"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: -1
                },
            ]
        },
        {
            id:1,
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
            name: Names.Police,
            text: ["(Este tio está chalado)"],
            options:
                [
                    {
                        text: "Una alfombra persa para el dictador",
                        nextIndex: 5,
                    },
                    {
                        text: "Sacar buena nota y aprobar PVLI",
                        nextIndex: 4,
                    }
                ],
        },
        {
            id: 4,
            name: Names.Empeñista,
            text: ["Sigue soñando,cariño. Pero bueno ya sé a que vienes. El coronel vino antes para que dejara el pedido preparado"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 5
                },
            ]
        },
        {
            id: 5,
            name: Names.Empeñista,
            text: ["Tengo justo lo que necesitas, pero espero que tengas suficiente dinero jeje..."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 6
                },
            ]
        },
        {
            id: 6,
            name: Names.Empeñista,
            text: ["Puedes hacer 2 cosas...o comprarle al dictador su fantástica alfombra persa por una bolsa entera llena de monedas"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 7
                },
            ]
        },
        {
            id: 7,
            name: Names.Empeñista,
            text: ["O...comprarle esta alfombra más barata y comprarte este muñeco budú para nada maldito para que te perturbe por las noches "],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 8
                },
            ]
        },
        {   
            id: 8,
            name: Names.Police,
            text: ["Hmm...suena tentador"],
            options:
                [
                    {
                        text: "Alfombra Persa",
                        nextIndex:9,
                        points:-25
                    },
                    {
                        text: "Alfombra barata y muñeco budú",
                        nextIndex: 10,
                        points:25
                    }
                ],
        },
        {
            id: 9,
            //Te da el muñeco la alfombra y te quita la bolsa de dinero
            callback: (data) => {
                event.RemoveItem(data, item.BolsaDinero);
                event.AddItem(data, item.AlfombraPersa);
                event.AddItem(data, item.OsoPelucheSona);
            },

            name: Names.Empeñista,
            text: ["Una pena, nadie quiere comprar el muñeco.¿Sabes qué? Te lo regalo igualmente"],
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
            id: 10,
            //Te da el muñeco la alfombra y te quita la bolsa de dinero
            callback: (data) => {
                event.RemoveItem(data, item.BolsaDinero);
                event.AddItem(data, item.AlfomombraBarata);
                event.AddItem(data, item.OsoPelucheSona);            
            },
            name: Names.Empeñista,
            text: ["¡Así me gusta! Por fin me deshago de este trasto...digo, fantástico muñeco. Aqui tienes el muñeco y la alfombra."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: -1
                },
            ],
            completed:0
        },
        {
            id: 11,
            
            name: Names.Empeñista,
            text: ["¡Que tengas un buen día!","Vuelve siempre que quieras"],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
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
                    nextIndex: 11
                }
            ]
        }
    ]

export default Dialog;
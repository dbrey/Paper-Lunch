import Names from '../../configs/npcNames.js'
import event from '../../libraries/eventCallbacks.js'
import item from '../../configs/itemNames.js'

const Dialog =
    [
        {
            id: 0,
            name: Names.Embajadora,
            text: ["¡Uy! ¿Tú eres el nuevo Policía no? "],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 1
                },
            ]
        },
        {
            id: 1,
            name: Names.Embajadora,
            text: ["Yo soy la embajadora del pueblo. Me iba a la tienda de empeños de aquí a comprar unas cosas,que aquí hay de todo, así que ya sabes a donde ir a comprar objetos si el dictador necesita algo."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 2
                },
            ]
        },
        {
            id: 2,
            //Te da el dinero
            callback: (data) => { event.AddItem(data, item.Monedas); },
            name: Names.Embajadora,
            text: ["De hecho,¿Podrías ir tú a comprármelo, y así conoces al empeñista? Necesito cepillo y jabón para mi hija. Aquí tienes el dinero"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 3
                },
            ]
        },
        {

            id: 3,
            name: Names.Embajadora,
            text: ["Cuando tengas el tinte tráemelo. Yo me quedaré por aqui"],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                },
            ]
        },
        {
            id: 4,
            name: Names.Embajadora,
            text: ["¿Ya compraste mi tinte?"],
            options:
                [
                    {
                        text: "¡Si!,Aqui tienes",
                        nextIndex: 5,
                    },
                    {
                        text: "Todavía no",
                        nextIndex: 3,
                    }
                ],
        },
        {
            id: 5,
            required: {
                item: [item.CepilloYJabon],
                hasItemIndex: 6
            },
            name: Names.Embajadora,
            text: ["Vaya, pero si todavia no lo has comprado. La tienda de empeños está justo aquí. Vuelve cuando lo tengas."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: -1
                },
            ]
        },
        {
            id: 6,
            callback: (data) => { event.RemoveItem(data, item.CepilloYJabon); },
            name: Names.Embajadora,
            text: ["¡Muchas gracias! Si me buscas otro dia estaré cerca de la embajada. Es la casa a la izquierda del castillo."],
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
            name: Names.Embajadora,
            text: ["Cualquier cosa ya sabes", "Aquí me tienes para todo", "Recuerda que estoy de tu parte"],
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
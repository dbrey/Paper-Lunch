import Names from '../../configs/npcNames.js'
import events from '../../libraries/eventCallbacks.js';
import item from '../../configs/itemNames.js'

const Dialog =
    [
        {
            id: 0,
            required: {
                item: [item.Dinamita,item.CerillasYAceite],
                mustHaveAll:true,
                hasItemIndex: 1
            },
            name: Names.Police,
            text: ["Mejor voy a coger primero los dos objetos que me dejó Reltih por aquí"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: -1
                },
            ]
        },
        {
            id: 1,
            name: Names.Police,
            text: ["(Puedes escuchar unas voces en el fondo de la mina)"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 2
                },
            ],
        },
        {
            id: 2,
            name: Names.Pueblerino,
            text: ["Dentro de dos días será el gran día chicos (...)"],
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
            text: ["Con la dinamita todo se derrumbará y los dejarás encerrados, pero con las cerillas y el aceite podrías avisarles y que salgan"],
            state: [
                {
                    targetState: ["any"],
                    nextState:1,
                    nextIndex: 4
                },
            ]
        },
        {
            id: 4,
            name: Names.Police,
            text: ["¿Que prefieres usar?"],
            options:
                [
                    {
                        text: "Dinamita y derrumbarlo",
                        nextIndex: 5,
                        points:-35
                    },
                    {
                        text: "Cerilla y aceite y avisarlos para que salgan",
                        nextIndex: 7,
                        points:35
                    }
                ],
        },
        {
            id: 5,
            callback: (data) => {
                events.RemoveItem(data, item.Dinamita);
            },
            completed: 4,
            name: Names.Police,
            text: ["Ves las piedras caerse mientras escuchas las voces de fondo. Tú no sabes nada de lo que acaba de suceder"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 6
                },
            ]
        },
        {
            id: 6,
            callback: (data) => {
                events.Mina(data);
            },
            name: Names.Police,
            text: ["No sientes remordimiento"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: -1
                },
            ]
        },
        {
            id: 7,
            callback: (data) => {
                events.RemoveItem(data, item.CerillasYAceite);
            },
            completed: 4,
            name: Names.Police,
            text: ["Pese al intento de aviso, solo consigues quemar la entrada de madera y dejarlos incomunicados"],
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
            text: ["Lo que importa es la intención...supongo"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 9
                },
            ]
        },
        {
            id: 9,
            callback: (data) => {
                events.Mina(data);
            },
            name: Names.Police,
            text: ["..."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: -1
                },
            ]
        },
        {
            id: 10,
            name: Names.Police,
            text: ["(Sigues escuchando algunas voces de fondo...)"],
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
                    nextIndex: 10
                }
            ]
        }
    ]

export default Dialog;
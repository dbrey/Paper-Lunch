import Names from '../../configs/npcNames.js'
import events from '../../libraries/eventCallbacks.js';

const Dialog =
    [
        {
            id: 0,
            name: Names.Paca,
            text: ["¡NO VAMOS A TOLERAR MÁS RESTRICCIONES!"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 1
                },
            ]
        },
        {
            id: 1,
            name: Names.Paca,
            text: ["Y HABLO EN REPRESENTACIÓN DE TODOS"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 2
                },
            ],
        },
        {
            id: 2,
            name: Names.Police,
            text: ["(...)"],
            options:
                [
                    {
                        text: "¿Por qué estais protestando?",
                        nextIndex: 3,
                        points: 10
                    },
                    {
                        text: "Solo hago mi labor, os vais u os arresto.",
                        nextIndex: 4,
                        points: -10
                    },
                ],
        },
        {
            id: 3,
            name: Names.Paca,
            text: ["No protestamos en contra del dictador, pero necesitamos que sea más flexible ¡Si mi marido se pone malo por la madrugada no puedo ir a comprar nada!"],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 5
                },
            ],
        },
        {
            id: 4,
            name: Names.Paca,
            text: ["Solo protestamos de manera pacífica, ten algo de piedad, si no fueras policía estarías hasta más cabreado que nosotras. Estos tratos no son justos."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 5
                },
            ],
        },
        {
            id: 5,
            name: Names.Police,
            text: ["(¿Que debería hacer?)"],
            options:
                [
                    {
                        text: "Permitir la protesta.",
                        nextIndex: 6,
                        points: 40,
                        completed: 3
                    },
                    {
                        text: "No permitir la protesta y multar a todos.",
                        nextIndex: 7,
                        points: -40,
                        completed: 3
                    },
                ],
        },
        {
            id: 6,
            name: Names.Paca,
            text: ["¡Muchas gracias! Nosotras no diremos nada...si preguntan tu no apareciste por aquí"],
            state: [
                {
                    targetState: ["any"],
                    nextState: 1,
                    nextIndex: -1
                },
            ],
        },
        {
            //CALLBACK DE DESAPARISION
            id: 7,
            name: Names.Paca,
            text: ["Si aspiras a ser fiel a una persona que te va a dejar tirado en cuanto igual la persona detestable eres tú. Vigila donde duermes..."],
            state: [
                {
                    targetState: ["any"],
                    nextIndex: 8
                },
            ],
        },
        {
            id: 8,
            name: Names.Paca,
            text: ["Adios..."],
            callback: (data) => {
                events.FadeInOut(data)
                data.scene.crowd.destroy(true);
            },
            state: [
                {
                    targetState: ["any"],
                    nextIndex: -1
                },
            ],
        },
        {
            id: 9,
            name: Names.Paca,
            text: ["Gracias por ayudarnos de corazón."],
            state: [
                {
                    targetState: ["any"],
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
                    nextIndex: 9
                }
            ]
        }
    ]

export default Dialog;
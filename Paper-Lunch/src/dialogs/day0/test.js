import itemNames from '../../configs/itemNames.js';
import Names from '../../configs/npcNames.js'
import events from '../../libraries/eventCallbacks.js';


const Dialog = [
    {
        id: 0,
        name: Names.Agricultor,
        text: ["Espero no verte pisando lo que he sembrado.", "..."],
        state: [
            {
                targetState: ["any"],
                nextIndex: -1
            },
        ]
    },
    {
        id: -1,
        callback: (data) => { events.FadeInOut(data) },
        state: [
            {
                targetState: [0],
                nextIndex: 0
            }
        ]
    }
]

export default Dialog;
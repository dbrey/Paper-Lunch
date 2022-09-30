const Paths = [
    {
        name: 'test',
        path: [
            {
                x: 0,
                y: 0,
                speed: 50,
                delay: 150,
            },
            {
                x: 100,
                y: 0,
                speed: 75,
                delay: 250,
            },
            {
                x: -50,
                y: 100,
                speed: 50,
                delay: 375,
            },
        ],
        loop: true,
    },
    {
        name: 'quieto',
        path: [
            {
                x: 0,
                y: 0,
                speed: 0,
                delay: 0,
            },
        ],
        loop: false,
    },
    {
        name: 'coronel',
        path: [
            {
                x: 0,
                y: 0,
                speed: 50,
                delay: 150,
            },
            {
                x: 0,
                y: 100,
                speed: 75,
                delay: 150,
            },
            {
                x: 320,
                y: 0,
                speed: 75,
                delay: 250,
            },
            {
                x: 0,
                y: 300,
                speed: 150,
                delay: 350,
            },
        ],
        loop: false,
        onFinish: (data) => {
            data.context.destroy(true)
            data.scene.player.isTalking = false;
        },
    },
    {
        name: 'square',
        path: [
            {
                x: 0,
                y: 0,
                speed: 75,
                delay: 0,
            },
            {
                x: 0,
                y: 120,
                speed: 75,
                delay: 0,
            },
            {
                x: -120,
                y: 0,
                speed: 75,
                delay: 0,
            },
            {
                x: 0,
                y: -120,
                speed: 75,
                delay: 0,
            },
        ],
        loop: true,
    },

    {
        name: 'horizontal',
        path: [
            {
                x: 0,
                y: 0,
                speed: 75,
                delay: 1500,
            },
            {
                x: 120,
                y: 0,
                speed: 100,
                delay: 2500,
            }
        ],
        loop: true,
    },
    {
        name: 'vertical',
        path: [
            {
                x: 0,
                y: 0,
                speed: 75,
                delay: 3500,
            },
            {
                x: 0,
                y: 120,
                speed: 75,
                delay: 1500,
            },
        ],
        loop: true,
    },
    {
        name: 'afilador',
        path: [
            {
                x: 0,
                y: 0,
                speed: 100,
                delay: 3500,
            },
            {
                x: -1300,
                y: 0,
                speed: 100,
                delay: 1500,
            }
        ],
        loop: true,
    },
    {
        name: 'ferianta',
        path: [
            {
                x: 0,
                y: 0,
                speed: 100,
                delay: 0,
            },
            {
                x: 750,
                y: 0,
                speed: 250,
                delay: 0,
            }
        ],
        onFinish: (data) => {
            data.context.destroy(true)
            data.scene.player.isTalking = false;
        },
        loop: false,
    }
]

export default Paths
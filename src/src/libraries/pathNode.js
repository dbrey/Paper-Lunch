/**
 * Simple object that has a vector2 an a delay, used for making characters Paths
 */
export default class Path
{
    constructor(data)
    {
        this.x = data.x;
        this.y = data.y;
        this.speed = data.speed;
        this.delay = data.delay;
    }
}
import { draw } from './events'

export class ThEngine {
    constructor(canvas) {
        this.canvas = canvas
        this.objectsInScena = []

        draw({
            context: this.canvas.getContext('2d'),
            contents: this.objectsInScena
        })
    }

    addObject(id, options) {
        this.objectsInScena.push({
            id,
            options
        })
    }
}
let realese = true
const contents = []

function draw({ contents, context }) {
    drawning();
}

function drawning() {
    


    if (realese)
        requestAnimationFrame(drawning.bind(this))
}

export { draw, realese }
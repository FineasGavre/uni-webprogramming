//
//  Background Image Button
//
const backgroundImages = ['double-bubble-dark.png', 'more-leaves-on-green.png', 'moroccan-flower.png', 'moroccan-flower-dark.png', 'watercolor.png']
let currentBackgroundImage = 0

function changeBackground() {
    if (currentBackgroundImage >= backgroundImages.length - 1) {
        currentBackgroundImage = 0
    } else {
        currentBackgroundImage++
    }

    document.body.style.backgroundImage = `url('./assets/img/${backgroundImages[currentBackgroundImage]}')`
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.backgroundImage = `url('./assets/img/${backgroundImages[currentBackgroundImage]}')`
})

//
//  Shapes and Colors Button
//
const shapes = ['square', 'circle', 'oval', 'parallelogram', 'rectangle']
const colors = ['white', 'red', 'green', 'yellow', 'brown']

function changeShape() {
    document.querySelectorAll('[data-shape]').forEach((element) => {
        element.className = `${getRandomShape()} ${getRandomColor()} shape`
    })
}

function getRandomShape() {
    return shapes[Math.floor(Math.random() * shapes.length)]
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

document.addEventListener('DOMContentLoaded', () => {
    changeShape()
})


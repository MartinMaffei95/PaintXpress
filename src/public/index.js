const socket = io()
let click = false
let movingMouse = false
let xPosition = 0
let yPosition = 0

let color = 'black'
let previousPosition = null


const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const width = window.innerWidth
const height = window.innerHeight

canvas.width = width;
canvas.height = height;

canvas.addEventListener('mousedown', ()=>{
    click = true
})

canvas.addEventListener('mouseup', ()=>{
    click = false
})

canvas.addEventListener('mousemove', (e)=>{ 
    xPosition = e.clientX
    yPosition = e.clientY
    movingMouse = true
})

 // EVENT TOUCH
canvas.addEventListener('touchstart', (e)=>{
    click = true
})

canvas.addEventListener('touchend', (e)=>{
    click = false
})

canvas.addEventListener('touchmove', (e)=>{ 
    e.preventDefault()
    xPosition = e.targetTouches[0].clientX
    yPosition = e.targetTouches[0].clientY
    movingMouse = true
})

const colorHandler = (c)=>{
    color = c
    context.strokeStyle = color
    context.stroke()
}

const draw = ()=>{
    if(click && movingMouse && previousPosition != null){
        let drawing ={
            xPosition:xPosition,
            yPosition:yPosition,
            color:color,
            previousPosition:previousPosition
        }
        socket.emit('drawing',drawing)
    }
    previousPosition={
        xPosition   :  xPosition,
        yPosition   :  yPosition
    }
    setTimeout(draw,25)
}

    socket.on('showDrawing',(drawing)=>{
        context.beginPath()
        context.lineWidth = 3
        context.strokeStyle = drawing.color
        context.moveTo(drawing.xPosition,drawing.yPosition)
        context.lineTo( drawing.previousPosition.xPosition,
                        drawing.previousPosition.yPosition)
        context.stroke()
    })

draw()
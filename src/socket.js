module.exports = (io)=>{
    let data = []
    io.on('connection',(socket)=>{
        for (let i = 0; i < data.length; i++) {
            io.emit('showDrawing',data[i])            
        }
        socket.on('drawing',(drawing)=>{
            data.push(drawing)
            io.emit('showDrawing',drawing)
        })
    })
}
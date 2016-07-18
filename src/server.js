var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var bodyParser = require('body-parser')

var url = 'http://localhost'
var port = 3000

var debuglisteners = []

app.use(bodyParser.json())

io.on('connection', function (socket) {
  console.log('a debug-listener connected')

  socket.on('debug-request', function (data) {
    console.log('Received debug request for node: "' + data.node + '" on port: "' + data.port + '".')
    debuglisteners.push({ socket: socket, node: data.node, port: data.port })
  })

  socket.on('disconnect', function () {
    console.log('debug-listener disconnected')
  })
})

app.post('/', function (req, res) {
  res.send('Got a POST request')

  for (var listener of debuglisteners) {
    if (listener.node === req.body.node && listener.port === req.body.port) {
      listener.socket.emit('debug-info', { node: req.body.node, port: req.body.port, value: req.body.value })
    }
  }
})

http.listen(port, function () {
  console.log('listening on', url + ':' + port)
})

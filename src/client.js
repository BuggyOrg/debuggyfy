var api = {

  addlistener: (url, node, port) => {
    var socket = require('socket.io-client')(url)

    // Add a connect listener
    socket.on('connect', function () {
      socket.emit('debug-request', { node: node, port: port })
    })

    socket.on('debug-info', function (data) {
      console.log('Received debug info:', data.node, data.port, data.value)
    })
  }
}

export default api

// import _ from 'lodash'
// import graphlib from 'graphlib'
import hash from 'object-hash'

var api = {

  // adds a listener between given nodes AFTER and BEFORE
  // but only if there is a direct edge between those two
  // if after and before are null, everything is listened to
  listento: (graph, before, after) => {
    for (let e of graph.edges()) {
      if (after && before) {
        if (e.v !== before || e.w !== after) continue
      }
      let listener = 'listener_' + hash(graph.node(e.v))
      let listenerLbl = {
        name: listener,
        id: 'debug/listener',
        nodeType: process,
        atomic: true,
        inputPorts: { },
        outputPorts: { },
        debugInfo: { }
      }
      graph.setNode(listener, listenerLbl)
      graph.removeEdge(e.v, e.w)
      graph.setEdge(e.v, listener)
      graph.setEdge(listener, e.v)
    }
  }
}

export default api

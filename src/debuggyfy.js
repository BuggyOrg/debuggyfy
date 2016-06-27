// import _ from 'lodash'
// import graphlib from 'graphlib'
import hash from 'object-hash'

var api = {

  // adds listener nodes between nodes connected with the given edge.
  // if edge is null, everything is listened to
  listento: (graph, edge) => {
    for (let e of graph.edges()) {
      if (edge) {
        if (e.v !== edge.v || e.w !== edge.w) continue
      }
      let listener = 'listener_' + hash(graph.node(e.v))
      let listenerLbl = {
        name: listener,
        id: 'debug/listener',
        nodeType: process,
        atomic: true,
        inputPorts: { },
        outputPorts: { }
      }
      graph.setNode(listener, listenerLbl)
      graph.removeEdge(e.v, e.w)
      graph.setEdge(e.v, listener)
      graph.setEdge(listener, e.v)
    }
  }
}

export default api

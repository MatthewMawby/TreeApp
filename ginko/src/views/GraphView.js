import React, { Component } from 'react'

import GraphControlPanel from '../components/GraphControlPanel'
import GraphContainer from '../components/GraphContainer'
import '../styles/graphView.css'

class GraphView extends Component {
  render() {
    return (
      <div className="graphView">
        <GraphControlPanel />
        <GraphContainer />
      </div>
    )
  }
}

export default GraphView

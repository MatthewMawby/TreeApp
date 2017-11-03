import React, { Component } from 'react'

import '../styles/graphControlPanel.css'


class GraphControlPanel extends Component {
  constructor() {
    super()
    this.state = {
      nodes: [],
      edges: []
    }
  }

  state: {
    nodes: [any],
    edges: [any]
  };


  render() {
    return (
      <div className="graphControlPanel">
        {'graph control panel'}
      </div>
    )
  }
}

export default GraphControlPanel

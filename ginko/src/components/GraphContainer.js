import React, { Component } from 'react'

import _ from 'lodash'
import ginko from 'ginko-api-service'
import '../styles/graphContainer.css'
import {
  InteractiveForceGraph,
  ForceGraphNode,
  ForceGraphLink } from 'react-vis-force'


class GraphContainer extends Component {
  constructor() {
    super()
    this.state = {
      nodes: [],
      edges: [],
      shouldRender: false
    }
  }

  state: {
    nodes: [any],
    edges: [any]
  };

  componentWillMount() {
    // get our Person test fixtures
    ginko.getPerson({ last_name: 'fixture', limit: 50 }).then((people) => {
      let peopleIds = people.map(x => x.id)
      let picParams = {
        where: {
          id: peopleIds
        },
        limit: 50
      }

      // then get a picture for each person
      ginko.getPicture(picParams).then((pics) => {
        for (let i = 0; i < people.length; i++) {
          people[i].thumbnail = pics[i].image_string
        }
        // finally add the nodes to state
        this.setState({nodes: people})
      })

      // load relations for nuclear families & filter so we only have edges
      // for people we found
      ginko.getRelation({ classification: 'fixture_marriage', limit: 250 })
        .then((nuclear_relations) => {
          nuclear_relations.filter((edge) => {
            let relatedTo = _.find(people, (person) => {
              return person.id === edge.related_to
            })
            let relatedFrom = _.find(people, (person) => {
              return person.id === edge.related_from
            })
            return relatedFrom && relatedTo
          })
          this.setState({edges: nuclear_relations})
        })
    })
  }

  renderNode(nodeData) {
    if (!nodeData) return (null)
    return (
      <ForceGraphNode
        node={{ id: nodeData.id, label: nodeData.first_name }}
        fill="green"
      />
    )
  }

  renderLink(linkData) {
    if (!linkData) return (null)
    return (
      <ForceGraphLink
        link={{ source: linkData.related_from, target: linkData.related_to }}
        fill="green"
      />
    )
  }

  render() {
    let simHeight = window.innerHeight
    let simWidth = window.innerWidth * 0.8
    let display = (null)
    if (this.state.nodes.length > 0 &&
        this.state.edges.length > 0) {
      display = (
        <InteractiveForceGraph
          simulationOptions={{ height: simHeight, width: simWidth }}
          labelAttr="label"
          onSelectNode={(node) => console.log(node)}
          highlightDependencies
          animate
          zoom
        >
          {this.state.nodes.map((n) => this.renderNode(n))}
          {this.state.edges.map((e) => this.renderLink(e))}
        </InteractiveForceGraph>
      )
    }
    return (
      <div className="graphContainer">
        {display}
      </div>
    )
  }
}

export default GraphContainer

import React from 'react'
import Component from 'hyper/component'
import git from 'git-state'


class PluginIcon extends Component {
  styles() {
    return {
      'git-icon': {
        fill: '#fff'
      }
    }
  }
}


export default class Git extends Component {
  static displayName() {
    return 'Git status plugin'
  }


  constructor(props) {
    super(props)
  }
}

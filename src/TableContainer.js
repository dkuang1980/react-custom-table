import React, { Component }  from 'react'
import Table from './Table'


class TableContainer extends React.Component {

  static propTypes = {
    containerClass: React.PropTypes.string
  }

  render(){
    const { containerClass, children } = this.props

    return (
      <div className={containerClass}>
        { children }
      </div>
    )
  }
}

export { TableContainer, Table }
import React, { Component, cloneElement, Children, PropTypes }  from 'react'
import Table from './Table'
import Paginator from './Paginator'


class TableContainer extends Component {

  static propTypes = {
    containerClass: PropTypes.string,
    columns: PropTypes.array,
    rows: PropTypes.array
  }

  render(){
    const { containerClass,
            columns,
            rows,
            children } = this.props

    return (
      <div className={containerClass}>
        {Children.map(children, child =>{
            if (child.type.name === 'Table')
              return cloneElement(child, { ...child.props, columns, rows})
            if (child.type.name === 'ColumnSelector')
              return cloneElement(child, { ...child.props, columns })
            return child
        })}
      </div>
    )
  }
}

export { TableContainer, Table, Paginator }
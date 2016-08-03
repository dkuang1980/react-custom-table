import React, { Component } from 'react'
import classNames from 'classnames/bind'
import { Set, Map } from 'immutable'


export default class Table extends Component {

  static propTypes = {
    idKey: React.PropTypes.string,
    tableClass: React.PropTypes.string,
    sortableClass: React.PropTypes.string,
    sortDescClass: React.PropTypes.string,
    sortAscClass: React.PropTypes.string,
    selectedClass: React.PropTypes.string,
    selectable: React.PropTypes.bool,
    columns: React.PropTypes.array,
    rows: React.PropTypes.array,
    selectColumnFormat: React.PropTypes.func,
    onSort: React.PropTypes.func,
    onRowClick: React.PropTypes.func
  }

  static defaultProps = {
    idKey: "id",
    selectable: false,
    columns: [],
    rows: []
  }

  constructor(props){
    super(props)

    this.state = {
      sortCol: null,
      SortDesc: Map(props.columns.map(col => [col.id, false])),
      selected: Set()
    }
  }

  handleSort(colId){
    const { SortDesc } = this.state
    const { onSort } = this.props

    this.setState({
      sortCol: colId,
      SortDesc: SortDesc.set(colId, !SortDesc.get(colId))
    })

    onSort && onSort(colId, SortDesc.get(colId))
  }

  handleRowClick(rowId){
    const { selected } = this.state
    const { onRowClick } = this.props

    this.setState({
      selected: selected.has(rowId) ? selected.delete(rowId) : selected.add(rowId)
    })

    onRowClick && onRowClick(colId)
  }

  render(){
    const { idKey,
            tableClass,
            columns,
            rows,
            sortableClass,
            sortDescClass,
            sortAscClass,
            selectedClass,
            selectable } = this.props

    const { sortCol,
            SortDesc,
            selected } = this.state

    return (
      <table className={tableClass}>
        <thead>
          <tr>
            {columns.map(col =>
              <th
                key={`th-${col.id}`}
                className={classNames({
                  [sortableClass]: sortableClass && col.sortable,
                  [sortDescClass]: sortDescClass && col.id === sortCol && SortDesc.get(col.id),
                  [sortAscClass]: sortAscClass && col.id === sortCol && !SortDesc.get(col.id)
                })}
                onClick={col.sortable ? this.handleSort.bind(this, col.id): null}>

                { col.title }

              </th>
            )}
            </tr>
        </thead>

        <tbody>
          {rows.map(row =>
            <tr
              key={`tr-${row[idKey]}`}
              className={classNames({
                [selectedClass]: selectedClass && selected.find(row[idKey])
              })}
              onClick={selectable ? this.handleRowClick.bind(this, row[idKey]) : null}>

                {selectable && selectColumnFormat ? <td>selectColumnFormat(!!selected.find(row[idKey]))</td> : null}

                {columns.map(col =>
                  <td key={`td-${row[idKey]}-${col.id}`}>
                    {col.formatFunc ? col.formatFunc(row) : row[col.id]}
                  </td>
                )}

            </tr>
          )}
        </tbody>
      </table>
    )
  }
}
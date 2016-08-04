import React, { Component, PropTypes } from 'react'
import classNames from 'classnames/bind'


export default class Table extends Component {

  static propTypes = {
    idKey: PropTypes.string,
    tableClass: PropTypes.string,
    sortableClass: PropTypes.string,
    sortDescClass: PropTypes.string,
    sortAscClass: PropTypes.string,
    selectedClass: PropTypes.string,
    sortCol: PropTypes.string,
    sortDesc: PropTypes.bool,
    selectable: PropTypes.bool,
    selected: PropTypes.array,
    columns: PropTypes.array,
    rows: PropTypes.array,
    selectColumnFormat: PropTypes.func,
    onSort: PropTypes.func,
    onRowClick: PropTypes.func,
    onSelectAll: PropTypes.func
  }

  static defaultProps = {
    idKey: 'id',
    selectable: false,
    columns: [],
    rows: []
  }

  handleSort(colId){
    const { onSort } = this.props

    onSort && onSort(colId)
  }

  handleRowClick(rowId){
    const { onRowClick } = this.props

    onRowClick && onRowClick(rowId)
  }

  renderTableHead(){
    const { idKey,
            rows,
            columns,
            selected,
            selectable,
            sortableClass,
            sortDescClass,
            sortAscClass,
            sortCol,
            sortDesc,
            selectColumnFormat,
            selectAllFormat,
            onSelectAll } = this.props

    const rowIds = rows.map(row => row[idKey])

    return (
      <thead>
        <tr>
          {selectColumnFormat ?
            <td onClick={onSelectAll ? onSelectAll.bind(null, rowIds) : null}>
              {selectAllFormat && selectAllFormat(rowIds.every(id => selected.indexOf(id) > -1))}
            </td>
            : null
          }

          {columns.map(col =>
            <th
              key={`th-${col.id}`}
              className={classNames({
                [sortableClass]: sortableClass && col.sortable,
                [sortDescClass]: sortDescClass && col.id === sortCol && sortDesc,
                [sortAscClass]: sortAscClass && col.id === sortCol && !sortDesc
              })}
              onClick={col.sortable ? this.handleSort.bind(this, col.id): null}>

              { col.title }

            </th>
          )}
          </tr>
      </thead>
    )
  }

  renderTableBody(){
    const { idKey,
            columns,
            rows,
            selectedClass,
            selected,
            selectColumnFormat } = this.props

    return (
      <tbody>
        {rows.map(row =>
          <tr
            key={`tr-${row[idKey]}`}
            className={classNames({
              [selectedClass]: selectedClass && selected.find(row[idKey])
            })}
            onClick={selectColumnFormat ? this.handleRowClick.bind(this, row[idKey]) : null}>

              {selectColumnFormat ? <td>{selectColumnFormat(selected.indexOf(row[idKey]) > -1)}</td> : null}

              {columns.map(col =>
                <td key={`td-${row[idKey]}-${col.id}`}>
                  {col.formatFunc ? col.formatFunc(row) : row[col.id]}
                </td>
              )}

          </tr>
        )}
      </tbody>
    )
  }

  render(){
    const { tableClass } = this.props

    return (
      <table className={tableClass}>
        { this.renderTableHead() }
        { this.renderTableBody() }
      </table>
    )
  }
}
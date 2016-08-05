import React, { Component, PropTypes } from 'react'
import classNames from 'classnames/bind'


export default class Table extends Component {

  static propTypes = {
    idKey: PropTypes.string,
    tableClass: PropTypes.string,
    sortableClass: PropTypes.string,
    sortDescClass: PropTypes.string,
    sortAscClass: PropTypes.string,
    selectedRowClass: PropTypes.string,
    sortCol: PropTypes.string,
    sortDesc: PropTypes.bool,
    selectable: PropTypes.bool,
    selected: PropTypes.array,
    columns: PropTypes.array,
    rows: PropTypes.array,
    noResultTemplate: PropTypes.func,
    selectColumnTemplate: PropTypes.func,
    onSort: PropTypes.func,
    onRowClick: PropTypes.func,
    onSelectAll: PropTypes.func
  }

  static defaultProps = {
    idKey: 'id',
    selectable: false,
    columns: [],
    rows: [],
    noResultTemplate: (cols) => {
      return (
        <tbody>
          <tr>
            <td colSpan={cols} style={{textAlign: "center"}}>
              Sorry, we could not find any data!
            </td>
          </tr>
        </tbody>
      )
    }
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
            selectColumnTemplate,
            selectAllTemplate,
            onSelectAll } = this.props

    const rowIds = rows.map(row => row[idKey])

    return (
      <thead>
        <tr>
          {selectColumnTemplate ?
            <td onClick={onSelectAll ? onSelectAll.bind(null, rowIds) : null}>
              {selectAllTemplate && selectAllTemplate(rowIds.length > 0 && rowIds.every(id => selected.indexOf(id) > -1))}
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
            selectedRowClass,
            selected,
            selectColumnTemplate } = this.props

    return (
      <tbody>
        {rows.map(row =>
          <tr
            key={`tr-${row[idKey]}`}
            className={classNames({
              [selectedRowClass]: selectedRowClass && selected.indexOf(row[idKey]) > -1
            })}
            onClick={selectColumnTemplate ? this.handleRowClick.bind(this, row[idKey]) : null}>

              {selectColumnTemplate ? <td>{selectColumnTemplate(selected.indexOf(row[idKey]) > -1)}</td> : null}

              {columns.map(col =>
                <td key={`td-${row[idKey]}-${col.id}`}>
                  {col.template ? col.template(row) : row[col.id]}
                </td>
              )}

          </tr>
        )}
      </tbody>
    )
  }

  render(){
    const { tableClass,
            noResultTemplate,
            selectColumnTemplate,
            rows,
            columns } = this.props

    const tableColNumber = columns.length + (selectColumnTemplate ? 1 : 0)

    return (
      <table className={tableClass}>
        { this.renderTableHead() }
        { rows.length > 0 ? this.renderTableBody() : noResultTemplate(tableColNumber) }
      </table>
    )
  }
}
import React, { Component, cloneElement, Children, PropTypes }  from 'react'
import Table from './Table'
import Paginator from './Paginator'
import { Set } from 'immutable'


class TableContainer extends Component {

  static propTypes = {
    containerClass: PropTypes.string,
    columns: PropTypes.array,
    rows: PropTypes.array,
    onRowSelect: PropTypes.func,
    onAllRowsSelect: PropTypes.func,
    onPageChange: PropTypes.func,
    onSort: PropTypes.func
  }

  constructor(props){
    super(props)

    this.state = {
      sortCol: null,
      sortDesc: false,
      selectedRows: Set(),
      activePage: 0
    }
  }

  handlePageClick(page){
    const { onPageChange } = this.props

    const { sortCol, sortDesc } = this.state

    this.setState({
      activePage: page
    })

    onPageChange && onPageChange(page, sortCol, sortDesc)
  }

  handleSort(colId){
    const { sortCol, sortDesc, activePage } = this.state
    const { onSort } = this.props

    const newSortDesc = colId === sortCol ? !sortDesc : false

    this.setState({
      sortCol: colId,
      sortDesc: newSortDesc
    })

    onSort && onSort(activePage, colId, newSortDesc)
  }

  handleSelect(rowId){
    const { selectedRows } = this.state
    const { onRowSelect } = this.props

    const newSelectedRows = selectedRows.has(rowId) ? selectedRows.delete(rowId) : selectedRows.add(rowId)
    this.setState({
      selectedRows: newSelectedRows
    })

    onRowSelect && onRowSelect(rowId, newSelectedRows.toJS())
  }

  handleSelectAll(rowIds){
    const { selectedRows } = this.state
    const { onAllRowsSelect } = this.props

    const newSelectedRows = selectedRows.intersect(rowIds).size === rowIds.length ? selectedRows.subtract(rowIds) : selectedRows.union(rowIds)
    this.setState({
      selectedRows: newSelectedRows
    })

    onAllRowsSelect && onAllRowsSelect(newSelectedRows.toJS())
  }

  render(){
    const { containerClass,
            columns,
            rows,
            children } = this.props

    const { activePage,
            sortCol,
            sortDesc,
            selectedRows } = this.state

    return (
      <div className={containerClass}>
        {Children.map(children, child => {
            if (child.type.name === 'Table')
              return cloneElement(child, {
                ...child.props,
                columns,
                rows,
                sortCol,
                sortDesc,
                selected: selectedRows.toJS(),
                onSort: this.handleSort.bind(this),
                onRowClick: this.handleSelect.bind(this),
                onSelectAll: this.handleSelectAll.bind(this)
              })
            if (child.type.name === 'Paginator')
              return cloneElement(child, {
                 ...child.props,
                 activePage,
                 onPageClick: this.handlePageClick.bind(this)
               })
            return cloneElement(child, {
              activePage,
              sortCol,
              sortDesc,
              selectedRows: selectedRows.toJS(),
              onSort: this.handleSort.bind(this),
              onRowClick: this.handleSelect.bind(this),
              onSelectAll: this.handleSelectAll.bind(this),
              ...child.props
            })
        })}
      </div>
    )
  }
}

export { TableContainer, Table, Paginator }
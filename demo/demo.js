import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { TableContainer, Table, Paginator } from '../src/TableContainer';

export const TopBar = ({
  rows,
  query,
  onQueryChange,
  onRowDelete,
  sortCol,
  sortDesc,
  selectedRows,
  activePage
}) => {

  return (
    <div className="row" style={{padding: "10px 0"}}>
        <div className="col-sm-6">
            <input
                className="form-control"
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value, activePage, sortCol, sortDesc)}
                placeholder="Search ..."/>
        </div>
        <div className="col-sm-6 text-right">
            <button
                className="btn btn-danger"
                onClick={onRowDelete.bind(this, selectedRows, activePage)}>
                Delete
            </button>
        </div>
    </div>
  )
}

export const PaginationInfo = ({
    total,
    pageSize,
    activePage
}) => {
    const totalPages = total % pageSize === 0 ? parseInt(total / pageSize) : parseInt(total / pageSize) + 1
    return (
        <div className="pull-left" style={{margin: "20px 0", fontSize: "16px"}}>
            <b>Total rows:</b> <i>{total}</i>
            <span style={{marginLeft: "20px"}}><b>Page:</b> <i>{activePage + 1} / {totalPages}</i></span>
        </div>
    )
}

export const PageSizeSelector = ({
    activePage,
    pageSizeList,
    currentPageSize,
    onChange
}) => {
    return (
        <div className="pull-right btn-group" style={{margin: "20px 20px", fontSize: "16px"}}>
            {pageSizeList.map(size => {
                return(
                    <button
                        className={`btn btn-${currentPageSize===size ? 'success' : 'default'}`}
                        onClick={onChange.bind(this, size, activePage)}>
                            {`${size} per page`}
                     </button>
                )
            })
        }
        </div>
    )
}

class TableDemo extends Component {
    constructor(props){
        super(props)

        const rows = [
            {id: "1", name: "David", gender: "Male", age: "17", height: "176"},
            {id: "2", name: "Kelly", gender: "Female", age: "19", height: "180"},
            {id: "3", name: "James", gender: "Male", age: "12", height: "150"},
            {id: "4", name: "Tim", gender: "Male", age: "39", height: "180"},
            {id: "5", name: "Sam", gender: "Male", age: "49", height: "176"},
            {id: "6", name: "Annie", gender: "Female", age: "26", height: "160"},
            {id: "7", name: "Lucy", gender: "Female", age: "19", height: "170"}
        ]

        this.state = {
            rows: rows,
            filteredRows: rows,
            query: '',
            pageSize: 4,
            pageData: rows.slice(0, 4),
            columns: [
                {id: "name", title: "Name", sortable: true},
                {id: "gender", title: "Gender", template: (v) => <b style={{color: v.gender === "Male" ? 'blue' : 'pink'}}>{v.gender}</b>},
                {id: "age", title: "Age", sortable: true},
                {id: "height", title: "Height", sortable: false}
            ],
            currentPage: 0
        }

        this.reloadData.bind(this)
    }

    reloadData(col, desc, query){
        const { rows } = this.state

        let newRows = rows

        if (col)
            newRows = newRows.sort((a, b) => {
                return desc ?
                    (b[col] > a[col] ? -1 : 1) :
                    (b[col] > a[col] ? 1 : -1)
            })

        newRows = newRows.filter(r => r.name.toLowerCase().indexOf(query.toLowerCase()) > -1)

        return newRows
    }

    handleSort(page, col, desc){
        const { query, pageSize } = this.state

        const newRows = this.reloadData(col, desc, query)

        this.setState({
            filteredRows: newRows,
            pageData: newRows.slice(page*pageSize, (page+1)*pageSize)

        })
    }

    handlePageClick(page, col, desc){
        const { rows, pageSize } = this.state

        this.setState({
            pageData: rows.slice(page*pageSize, (page+1)*pageSize)
        })
    }

    handleQueryChange(query, page, col, desc){
        const { pageSize } = this.state
        const newRows = this.reloadData(col, desc, query)

        this.setState({
            query,
            filteredRows: newRows,
            pageData: newRows.slice(0, pageSize)
        })
    }

    handleDelete(selectedRows, page){
        const { rows, pageSize } = this.state
        const newRows = rows.filter(r => selectedRows.indexOf(r.id) === -1)
        let newPage = page
        if ((page+1)*pageSize > newRows.length)
            newPage =  newRows.length % pageSize === 0 ? parseInt(newRows.length / pageSize) - 1 : parseInt(newRows.length / pageSize)

        this.setState({
            rows: newRows,
            filteredRows: newRows,
            pageData: newRows.slice(newPage*pageSize, (newPage+1)*pageSize)
        })
    }

    handlePageSizeChange(pageSize, page){
        const { rows } = this.state

        let newPage = page
        if ((page+1)*pageSize > rows.length)
            newPage =  rows.length % pageSize === 0 ? parseInt(rows.length / pageSize) - 1 : parseInt(rows.length / pageSize)


        this.setState({
            pageData: rows.slice(newPage*pageSize, (newPage+1)*pageSize),
            pageSize
        })
    }

    render(){
        const { rows, columns, filteredRows, pageData, query, pageSize } = this.state
        return (
            <div style={{padding: "30px"}}>
                <h2 className="text-center"> React Custom Table with Bootstrap </h2>
                <TableContainer
                    containerClass="table-responsive"
                    columns={columns}
                    rows={pageData}
                    onSort={this.handleSort.bind(this)}
                    onPageChange={this.handlePageClick.bind(this)}>
                    <TopBar
                        rows={rows}
                        query={query}
                        onRowDelete={this.handleDelete.bind(this)}
                        onQueryChange={this.handleQueryChange.bind(this)} />
                    <Table
                        tableClass="table table-bordered table-hover"
                        sortableClass="sortable"
                        sortDescClass="desc"
                        sortAscClass="asc"
                        selectedRowClass="selected-row"
                        selectable={true}
                        selectColumnTemplate={(v) => <input type='checkbox' checked={v}/>}
                        selectAllTemplate={(v) => <input type='checkbox' checked={v}/>}/>
                    <PaginationInfo
                        total={filteredRows.length}
                        pageSize={pageSize} />

                    <Paginator
                        paginatorClass="pagination pull-right"
                        total={filteredRows.length}
                        firstPageTemplate={() => <a>{"<<"}</a>}
                        prevPageTemplate={() => <a>{"<"}</a>}
                        pageTemplate={(p) => <a>{p}</a>}
                        nextPageTemplate={() => <a>{">"}</a>}
                        lastPageTemplate={() => <a>{">>"}</a>}
                        pageSize={pageSize}/>
                    <PageSizeSelector
                        pageSizeList={[1, 2, 4]}
                        currentPageSize={pageSize}
                        onChange={this.handlePageSizeChange.bind(this)} />
                </TableContainer>
            </div>
        )
    }
}

ReactDOM.render(<TableDemo />, document.getElementById("demo"));


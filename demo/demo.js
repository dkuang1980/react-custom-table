import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { TableContainer, Table, Paginator } from '../src/TableContainer';

const simpleTable =
    <TableContainer
        columns={[{id: "name", title: "Name"}, {id: "gender", title: "Gender"}]}
        rows={[{id: "1", name: "David", gender: "Male"}, {id: "2", name: "Kelly", gender: "Female"}]} >
        <Table/>
    </TableContainer>

const formattedTable =
    <TableContainer
        columns={[{id: "name", title: "Name", formatFunc: (v) => <i>{v["name"]}</i>}, {id: "gender", title: "Gender"}]}
        rows={[{id: "1", name: "David", gender: "Male"}, {id: "2", name: "Kelly", gender: "Female"}]}>
        <Table/>
    </TableContainer>

class TableParent extends Component {
    constructor(props){
        super(props)

        const rows = [
            {id: "1", name: "David", gender: "Male"},
            {id: "2", name: "Kelly", gender: "Female"},
            {id: "3", name: "James", gender: "Male"},
            {id: "4", name: "Tim", gender: "Male"},
            {id: "5", name: "Sam", gender: "Male"},
            {id: "6", name: "Annie", gender: "Female"},
            {id: "7", name: "Lucy", gender: "Female"}
        ]

        this.state = {
            rows: rows,
            pageData: rows.slice(0, 4),
            columns: [{id: "name", title: "Name", sortable: true}, {id: "gender", title: "Gender", sortable: false}],
            currentPage: 0
        }
    }

    handleSort(page, col, desc){
        const { rows } = this.state
        const newRows = rows.sort((a, b) => {
            return desc ?
                (b[col] > a[col] ? -1 : 1) :
                (b[col] > a[col] ? 1 : -1)
        })
        this.setState({
            rows: newRows,
            pageData: newRows.slice(page*4, (page+1)*4)

        })
    }

    handlePageClick(page, col, desc){
        const { rows } = this.state
        this.setState({
            pageData: rows.slice(page*4, (page+1)*4)
        })
    }

    render(){
        const { rows, columns, pageData} = this.state
        return (
            <TableContainer
                columns={columns}
                rows={pageData}
                onSort={this.handleSort.bind(this)}
                onPageChange={this.handlePageClick.bind(this)}>
                <Table
                    selectable={true}
                    selectColumnFormat={(v) => <input type='checkbox' checked={v}/>}
                    selectAllFormat={(v) => <input type='checkbox' checked={v}/>}/>
                <Paginator
                    total={rows.length}
                    pageSize={4}/>
            </TableContainer>
        )
    }
}

ReactDOM.render(simpleTable, document.getElementById("simpleTable"));
ReactDOM.render(formattedTable, document.getElementById("formattedTable"));
ReactDOM.render(<TableParent />, document.getElementById("TableParent"));


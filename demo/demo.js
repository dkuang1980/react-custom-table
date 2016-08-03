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

const simplePaginatedTable =
    <TableContainer
        columns={[{id: "name", title: "Name"}, {id: "gender", title: "Gender"}]}
        rows={[{id: "1", name: "David", gender: "Male"}, {id: "2", name: "Kelly", gender: "Female"}]} >
        <Table/>
        <Paginator
            total={14}
            pageSize={5} />
    </TableContainer>

ReactDOM.render(simpleTable, document.getElementById("simpleTable"));
ReactDOM.render(formattedTable, document.getElementById("formattedTable"));
ReactDOM.render(simplePaginatedTable, document.getElementById("simplePaginatedTable"));


import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { TableContainer, Table } from '../src/TableContainer';

const simpleTable =
    <TableContainer>
        <Table
            columns={[{id: "name", title: "Name"}, {id: "gender", title: "Gender"}]}
            rows={[{id: "1", name: "David", gender: "Male"}, {id: "2", name: "Kelly", gender: "Female"}]} />
    </TableContainer>

const formattedTable =
    <TableContainer>
        <Table
            columns={[{id: "name", title: "Name", formatFunc: (v) => <i>{v["name"]}</i>}, {id: "gender", title: "Gender"}]}
            rows={[{id: "1", name: "David", gender: "Male"}, {id: "2", name: "Kelly", gender: "Female"}]} />
    </TableContainer>

ReactDOM.render(simpleTable, document.getElementById("simpleTable"));
ReactDOM.render(formattedTable, document.getElementById("formattedTable"));



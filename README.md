# ReactCustomTable

Render table in react, fully customizable, compatible with redux.

## Our features:
- We render table and handle pagination, the data passed into our table is only for the CURRENT PAGE rather than the entire collection of data, so in this case we didn't implement the data layer logic for sorting as well as the pagination, however, we provide the callbacks with all the params you need (sorted column, sorting direction, current page) to you, you can implement the logic yourself (usually for server side query).
- We are not including any css, you can use whatever css library (i.e. Bootstrap, Foundation) you want, and it is easy to integrate.
- This plugin is designed to work with redux. For all data query events (i.e. sorting, changing page), we provide a callback with the current state of the table (i.e. active page, sorted column, sorting direction), you can easily hook it up with your action (i.e. trigger ajax request) for redux to get the new data back to the table.
- Since the UI and DOM can be totally different for users, we didn't implement the additional features like search and page size selector. However, as long as you define your component within our scope (under TableContainer), you will get all the data you need in your component props. You can easily extend the functionality to do something like keywords search, delete selected rows, edit selected row, etc. In our demo, we will show you how to add those components by yourself.

## Demo

Live Demo: https://dkuang1980.github.io/react-custom-table/

Run demo locally:
```
git clone https://github.com/Da-Kuang/react-custom-table.git
npm run demo
http://localhost:8080
```

## Install

```
npm install react-custom-table --save
```

## Usage

### To generate a simple table

```
import React from 'react';
import { TableContainer, Table } from 'react-custom-table';

<TableContainer
    columns={[
    	{id: "name", title: "Name"},
    	{id: "gender", title: "Gender"}
    ]}
    rows={[
    	{id: "1", name: "David", gender: "Male"},
        {id: "2", name: "Kelly", gender: "Female"},
        {id: "3", name: "James", gender: "Male"},
        {id: "4", name: "Tim", gender: "Male"}
    ]} >

    <Table/>

</TableContainer>
```

### To generate a table with pagination

```
import React from 'react';
import { TableContainer, Table, Paginator } from 'react-custom-table';

<TableContainer
    columns={[
    	{id: "name", title: "Name"},
    	{id: "gender", title: "Gender"}
    ]}
    rows={[
    	{id: "1", name: "David", gender: "Male"},
        {id: "2", name: "Kelly", gender: "Female"},
        {id: "3", name: "James", gender: "Male"},
        {id: "4", name: "Tim", gender: "Male"}
    ]}>

    <Table/>

    <Paginator total={7} pageSize={4} />
</TableContainer>
```

### A more complicated example

```
import React from 'react';
import { TableContainer, Table, Paginator } from 'react-custom-table';

const columns = [
    {id: "name", title: "Name", sortable: true},
    {id: "gender", title: "Gender", template: (v) => <b style={{color: v.gender === "Male" ? 'blue' : 'pink'}}>{v.gender}</b>},
    {id: "age", title: "Age", sortable: true},
    {id: "height", title: "Height", sortable: false}
]
const pageData = [
    {id: "1", name: "David", gender: "Male", age: "17", height: "176"},
    {id: "2", name: "Kelly", gender: "Female", age: "19", height: "180"},
    {id: "3", name: "James", gender: "Male", age: "12", height: "150"},
    {id: "4", name: "Tim", gender: "Male", age: "39", height: "180"}
]

<TableContainer
    containerClass="table-responsive"
    columns={columns}
    rows={pageData}
    onSort={this.handleSort}
    onPageChange={this.handlePageClick}>

    <Table
        tableClass="table table-bordered table-hover"
        sortableClass="sortable"
        sortDescClass="desc"
        sortAscClass="asc"
        selectedRowClass="selected-row"
        selectable={true}
        selectColumnTemplate={(v) => <input type='checkbox' checked={v}/>}
        selectAllTemplate={(v) => <input type='checkbox' checked={v}/>}/>

    <Paginator
        paginatorClass="pagination pull-right"
        total={7}
        firstPageTemplate={() => <a>{"<<"}</a>}
        prevPageTemplate={() => <a>{"<"}</a>}
        pageTemplate={(p) => <a>{p}</a>}
        nextPageTemplate={() => <a>{">"}</a>}
        lastPageTemplate={() => <a>{">>"}</a>}
        pageSize={4}/>

</TableContainer>
```

To see more details for the usage, please check the code in our demo folder.
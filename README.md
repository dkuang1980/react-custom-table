# ReactCustomTable

Render table in react, fully customizable, compatible with redux.

Our features:
1. We render table and handle pagination.
2. We are not including any css, you can use whatever css library (i.e. Bootstrap, Foundation, Material-UI) you want, and it is easy to integrate.
3. This plugin is designed to work with redux. For all data query events (i.e. sorting, changing page), we provide a callback with the current state of the table (i.e. active page, sorted column, sorting direction), you can easily hook it up with your action (i.e. trigger ajax request) for redux to get the new data back to the table.
4. You can easily extend the functionality of the table to do something like keywords search, delete selected rows, edit selected row, etc. As long as you define your component within our scope, you will get all state of the table through your props.


## Demo

Live Demo: https://da-kuang.github.io/react-custom-table/

Run demo locally:
```
npm run demo
http://localhost:8080
```

## Install

```
npm install react-custom-table --save
```

## Usage

To generate a simple table:

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
        {id: "4", name: "Tim", gender: "Male"},
        {id: "5", name: "Sam", gender: "Male"},
        {id: "6", name: "Annie", gender: "Female"},
        {id: "7", name: "Lucy", gender: "Female"}
    ]} >

    <Table/>

</TableContainer>
```

To generate a table with pagination

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
    ]} >

    <Table/>

    <Paginator total={7} pageSize={4} />
</TableContainer>
```

To see more details for the usage, please check the code in our demo folder.
# ReactCustomTable

Render table in react, fully customizable, compatible with redux

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

To see more details for the usage, please checkout our demo folder.
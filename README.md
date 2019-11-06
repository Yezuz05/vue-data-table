# Vue Data Table

# Project details
This is a vue project that houses a reusable vue data table component. This project was created using vue cli. 

# Data Table Component Usage
The Data Table component can be found in the components folder as DataTable.vue and it can be extracted and used in any other vue project. I plan to deploy the component as an npm module soon.

# Features
* Search through any column
* Sortable columns
* Editable cells
* Regex search pattern
* Custom style classes for table

### View live demo on Netlify ###
<https://vue-data-table.netlify.com>

# Input Data
The component expects the following variables
```
    dataSource,      // Table data as an array of objects
    columns,         // columns to display as an array of objects
    // Each column should be in this format
    {
        title: '**',
        dataIndex: '**',
        editable: true, (optional)
        sortable: true,  (optional)
        type: 'Date' (optional) //pass date for proper date display
    }
    config: {
        total,      // pass number for server-side pagination
        itemsPerPage, // defaults to 10
        frontPagination: true,  //pass false for server-side pagination
        tableClass, (optional)
        thClass, (optional)
        tdClass, (optional)
        hasSearch (optional) // pass for omnisearch functionality
    } 
```

# Example
#### In parent component template ####
```
    <DataTable @cell-change="handleCellChange" :dataSource="dataSourceVariable" :columns="columnsVariable" :config="configVariable" />
```

Listen for cell change with the `cell-change` event. It returns data in this format
```
    {
        row,        //changed row
        cell        //changed cell property
    }
```
Listen for page change with the `page-change` event. It emits the current page

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

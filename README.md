# BriteCore Frontend Engineering Challenge

# Project details
This is a vue project that houses a reusable vue data table component. This project was created using vue cli. 

# Data Table Component Usage
The Data Table component can be found in the components folder as DataTable.vue and it can be extracted and used in any other vue project. I plan to deploy the component as an npm module in a few weeks.

# Features
* Search any column
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
        total,
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
    <DataTable @cell-change="handleCellChange" :dataSource="payments" :columns="columns" :config="config" />
```

Listen for cell change with the `cell-change` event. It returns data in this format
```
    {
        row,        //changed row
        cell        //changed cell property
    }
```

## Follow Up Questions ##
1. How long did you spend on the test? Would you do anything differently if you had more time
    Ans. I spent about 19 hours on the test spread over three days. If I had more time I would love to extract the pagination and make it a component of it's own. I would also like to make the data table component allow custom sorting and filter functions. I believe there are alot more things to add, there are endless possibilities.

2. In what ways would you adapt your component so that it could be used in many different scenarios where a data table is required?
    Ans. Firstly, I would deploy as an npm module for vue applications. I'm also thinking of creating a standalone vue component build so it can be used in any frontend project.
3. What is one CSS property that you recently learned about that helped you solve a problem?
    Ans. Well, all the css properties I used in this test have been used by me at some point in the past. But a new thing I learned while solving this problem is, the use of the HTML5 contenteditable property. 

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

<template>
  <div id="app">
    <h3>My Custom Data Table</h3>
    <DataTable :dataSource="payments" :columns="columns" />
  </div>
</template>

<script>
import DataTable from './components/DataTable.vue'
import { payments } from './payments.js'

export default {
  name: 'app',
  components: {
    DataTable
  },
  data () {
    return {
      payments,
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: 'Name',
          dataIndex: 'name'
        },
        {
          title: 'Description',
          dataIndex: 'description'
        },
        {
          title: 'Date',
          dataIndex: 'date'
        },
        {
          title: 'Amount',
          dataIndex: 'amount'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  div#app {
    padding: 30px;
    text-align: center;
  }
</style>

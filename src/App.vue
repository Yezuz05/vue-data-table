<template>
  <div id="app">
    <h3>Payments for Product SKU #746824</h3>
    <DataTable @cell-change="handleCellChange" :dataSource="payments" :columns="columns" :config="config" />
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
          dataIndex: 'name',
          sortable: true
        },
        {
          title: 'Description',
          dataIndex: 'description',
          dataEditable: true
        },
        {
          title: 'Date',
          dataIndex: 'date',
          type: 'Date',
          sortable: true
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          sortable: true
        }
      ],
      config: {
        total: null,
        itemsPerPage: 5,
        frontPagination: true,
        tableClass: '',
        thClass: '',
        tdClass: '',
        hasSearch: true,
      }
    }
  },
  methods: {
    handleCellChange(event) {
      console.log(event);
    }
  }
}
</script>

<style lang="scss">
  div#app {
    padding: 30px;
    text-align: center;
    h3 {
      font-weight: 300;
      font-size: 30px;
      margin-bottom: 25px;
    }
  }
</style>

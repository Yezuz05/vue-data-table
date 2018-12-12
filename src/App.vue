<template>
  <div id="app">
    <DataTable msg="hello from parent" />
  </div>
</template>

<script>
import DataTable from './components/DataTable.vue'

export default {
  name: 'app',
  components: {
    DataTable
  }
}
</script>

<style lang="scss">
  div#app {
    padding: 30px;
  }
</style>

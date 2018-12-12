<template>
    <div id="data-table">
        <table class="table">
            <thead>
                <tr>
                    <td v-for="(column, index) in tableColumns" :key="index">{{column.title}}</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
                    <td v-for="(column, index) in tableColumns" :key="index">{{row[column.dataIndex]}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'DataTable',
    props: {
        dataSource:Array,
        columns:Array
    },
    data() {
        return {
            tableData: this.dataSource,
            tableColumns: this.columns
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
    #data-table {
        width: 100%;
        .table {
            width: inherit;
            text-align: left;
        }
    }
</style>

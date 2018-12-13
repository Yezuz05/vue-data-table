<template>
    <div id="data-table">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="(column, index) in tableColumns" :key="index">{{column.title}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
                    <td v-for="(column, index) in tableColumns" :key="index">
                         <span spellcheck="false" :contenteditable="column.dataEditable && row.edit">
                            {{row[column.dataIndex]}}
                         </span>
                         <span @click="editCell(rowIndex, true)" v-if="column.dataEditable && !row.edit">
                            <i class="fas fa-pencil-alt"></i>
                        </span>
                         <span v-if="column.dataEditable && row.edit">
                            <i @click="editCell(rowIndex, false, $event, column.dataIndex)" class="fas fa-check"></i>
                        </span>
                    </td>
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
    },
    methods: {
        editCell(index, state, event = null, dataIndex = null) {
            const row = this.tableData[index];
            row.edit = state;
            if (!state) {
                const editedContent = event.target.parentElement.previousElementSibling.innerText;
                if (editedContent !== row[dataIndex]) {
                    row[dataIndex] = editedContent;
                    this.$emit('cell-change', {row, cell: dataIndex});
                }
            }
            this.tableData.splice(index, 1, row);
        }
    }
}
</script>

<style lang="scss" scoped>
    #data-table {
        width: 100%;
        overflow-x: scroll;
        .table {
            width: inherit;
            text-align: left;
            box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
            padding: 20px;
            border-collapse: collapse;
            border: 1px solid #EEF6F8;
            th {
                padding: 20px 10px;
                border-bottom: 1px solid #EEF6F8;
            }
            td {
                padding: 20px 10px;
                border-bottom: 3px solid #EEF6F8;
                max-width: 300px;

                &:hover {
                    &> {
                        span:nth-child(2) {
                            opacity: 1;
                        }
                    }
                }

                span {
                    display: inline-block;
                }

                span:first-child {
                    width: max-content;
                    max-width: 85%;
                    overflow-wrap: break-word;
                }

                span:nth-child(2) {
                    opacity: 0;
                    color: #25cbf5;
                    transition: opacity .2s ease-in;
                }

                span[contenteditable="true"] {
                    outline: none;
                    padding: 7px;
                    border-radius: 4px;
                    border: 1px solid #25cbf5;
                    text-indent: 5px;
                }
                .fas {
                    margin: 0 5px;
                    cursor: pointer;
                    font-size: 10px;
                }
                .fa-check {
                    color: #41B883;
                }
                .fa-times {
                    color: rgb(255, 128, 128);
                }
            }
        }
    }
</style>

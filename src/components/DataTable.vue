<template>
    <div id="data-table">
        <div v-if="config.hasSearch" class="search-box">
            <label for="">Search:</label>
            <input style="position: relative" @keyup="search()" v-model="searchString" type="text" class="search-input">
            <i @click="clearSearch()" v-if="this.hasSearch" class="fas fa-times"></i>
        </div>
        <div class="table-wrapper">
            <table :class="config.tableClass ? config.tableClass : 'table'">
                <thead>
                    <tr>
                        <th :class="config.thClass ? config.thClass : 'th'" v-for="(column, index) in tableColumns" :key="index">
                            {{column.title}}
                            <i @click="sort(column,index)" v-if="column.sortable" :class="[!!column.sort_order ? 'has-sort' : '', column.sort_order === 'asc' ? 'fa-sort-amount-up': (column.sort_order === 'desc' ? 'fa-sort-amount-down': 'fa-sort-amount-up')]" class="fas"></i>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
                        <td :class="config.tdClass ? config.tdClass : 'td'" v-for="(column, index) in tableColumns" :key="index">
                            <span spellcheck="false" :contenteditable="column.dataEditable && row.edit">
                                {{ column.type === 'Date' ? new Date(row[column.dataIndex]).toLocaleString() : row[column.dataIndex]}}
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
        <div class="pagination-box">
            <div class="pages">
                Page <input @change="goToPage()" type="number" :min="1" :max="pages" name="current-page" v-model.number="currentPage"> of {{pages}}
            </div>
            <div class="buttons">
                <button :disabled="currentPage === 1" @click="paginate(-1)">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button :disabled="currentPage === pages" @click="paginate(1)">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import _ from 'lodash';
export default {
    name: 'DataTable',
    props: {
        dataSource:Array,
        columns:Array,
        config:Object
    },
    data() {
        return {
            compSource: this.dataSource,
            tableData: null,
            tableColumns: this.columns,
            currentPage: 1,
            itemsPerPage: 10,
            pages: null,
            totalData: null,
            perPageArray:Array,
            hasSearch: false,
            searchString: null,
            searchSource: null,
        }
    },
    mounted() {
        const {total, itemsPerPage, frontPagination} = this.config;
        this.totalData = frontPagination ? this.compSource.length : total;
        this.itemsPerPage = itemsPerPage ? itemsPerPage : this.itemsPerPage;
        this.pages = Math.ceil(this.totalData / this.itemsPerPage);
        this.fetchData();
    },
    methods: {
        editCell(index, state, event = null, dataIndex = null) {
            const row = this.tableData[index];
            row.edit = state;
            if (!state) {
                const editedContent = event.target.parentElement.previousElementSibling.innerText.trim();
                if (editedContent !== row[dataIndex]) {
                    row[dataIndex] = editedContent;
                    this.$emit('cell-change', {row, cell: dataIndex});
                }
            }
            this.tableData.splice(index, 1, row);
        },
        paginate(direction) {
            this.currentPage += direction;
            if (this.config.frontPagination) {
                this.fetchData();
            } else {
                this.$emit('pageIndexChange', this.currentPage);
            }
        },
        goToPage() {
            this.fetchData();
        },
        fetchData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = ((this.currentPage - 1) * this.itemsPerPage) + this.itemsPerPage;
            if (this.hasSearch) {
                this.tableData = this.searchSource.slice(start, end);
            } else {
                this.tableData = this.compSource.slice(start, end);
            }
        },
        search: _.debounce(function() {
            if (this.searchString.trim() === "") {
                this.hasSearch = false;
                this.resetPaginator();
                return;
            }
            if (!this.hasSearch) {
                this.hasSearch = true;
            }
            this.searchSource = _.filter(this.compSource, (o) => Object.values(o).some((value) => new RegExp(this.searchString.trim(), 'i').test(value)));
            this.resetPaginator();
            this.fetchData();
        }, 600),
        resetPaginator() {
            this.currentPage = 1;
            this.totalData = this.hasSearch ? this.searchSource.length : this.compSource.length;
            this.pages = Math.ceil(this.totalData / this.itemsPerPage);
            this.fetchData();
        },
        clearSearch() {
            this.searchString = null;
            this.hasSearch = false;
            this.resetPaginator();
        },
        sort(column, index) {
            column.sort_order = column.sort_order === 'asc' ? 'desc' : 'asc';
            this.tableColumns.splice(index, 1, column);
            if (this.hasSearch) {
                this.searchSource = _.orderBy(this.searchSource, [column.dataIndex], [column.sort_order]);
                this.fetchData();
            } else {
                this.compSource = _.orderBy(this.compSource, [column.dataIndex], [column.sort_order]);
                this.fetchData();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    #data-table {
        width: 100%;
        div.table-wrapper {
            width: 100%;
            overflow-x: auto;
            .table {
                width: inherit;
                text-align: left;
                box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
                padding: 20px;
                border-collapse: collapse;
                border: 1px solid #EEF6F8;
                th {
                    .fas {
                        transition: color .17s;
                        cursor: pointer;
                        &:hover {
                            color: rgb(54, 177, 248);
                        }
                        &.has-sort {
                            color: rgb(22, 103, 253);
                        }
                    }
                }
                .th {
                    padding: 20px 10px;
                    border-bottom: 1px solid #EEF6F8;
                }
                .td {
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
        .pagination-box {
            display: flex;
            justify-content: flex-end;
            padding: 10px 0;
            align-items: center;
            & > * {
                margin-right: 20px;
            }
            .pages {
                input {
                    width: 40px;
                    height: 30px;
                    text-indent: 10px;
                    font-size: 15px;
                }
            }
            .buttons {
                display: flex;
                justify-content: space-between;
                button {
                    border: 1px solid rgba(37, 203, 245, 0.576);
                    background-color: #fff;
                    border-radius: 4px;
                    height: 30px;
                    width: 30px;
                    margin-right: 10px;
                    outline: none;
                    display: block;
                    cursor: pointer;
                    transition: all .3s;
                    &:active {
                        transform: scale(.9);
                    }
                }
            }
        }

        .search-box {
            margin-bottom: 10px;
            width: 350px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            position: relative;
            .fa-times {
                position: absolute;
                cursor: pointer;
                color: rgb(247, 99, 99);
                font-size: 12px;
                right: 3%;
            }
        }

        .search-input {
            width: 100%;
            height: 30px;
            border: 2px solid rgb(188, 236, 248);
            border-radius: 4px;
            text-indent: 10px;
            font-size: 14px;
            outline: none;
        }
    }
</style>
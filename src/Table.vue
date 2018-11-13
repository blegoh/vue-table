<template>
    <div>
        <div class="columns">
            <div class="column">
                <input v-model="search" v-on:keypress="page = 1" class="input" type="search" placeholder="Search"
                       aria-label="Search">
            </div>
            <div class="column">
                <div class="select">
                    <select v-model="perPage" v-on:change="page=1">
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                    </select>
                </div>
            </div>
            <div class="column">
                <div v-on:click="dropdown" v-bind:class="{'dropdown': true, 'is-active': isActive }">
                    <div class="dropdown-trigger">
                        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu2">
                            <span>Show/hide column</span>
                            <span class="icon is-small">
                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu2" role="menu">
                        <div class="dropdown-content">
                            <div class="dropdown-item" v-for="(value, key) in data[0]">
                                <label class="checkbox">
                                    <input type="checkbox" :value="key" v-model="checkedColumn">
                                    {{key}}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <table class="table is-bordered">
            <thead>
            <tr>
                <th scope="col" v-on:click="sort(key)" v-for="(value, key) in data[0]"
                    v-if="checkedColumn.indexOf(key) != -1">{{key}} <i v-bind:class="icon"
                                                                       v-if="sort_by == key"></i>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="datum in filtered">
                <td v-for="(value, key) in datum" v-if="checkedColumn.indexOf(key) != -1">{{value}}</td>
            </tr>
            </tbody>
        </table>

        <nav class="pagination is-centered" role="navigation" aria-label="pagination">
            <a class="pagination-previous" v-on:click="page -= 1">Previous</a>
            <a class="pagination-next" v-on:click="page += 1">Next page</a>
            <ul class="pagination-list">
                <li v-for="n in pageCount"><a v-on:click="page = n" v-bind:class="classListPage(n)">{{n}}</a></li>

            </ul>
        </nav>
    </div>
</template>
<script>
    export default {
        name: "Table",
        props: ['data'],
        data: function () {
            return {
                search: '',
                sort_by: '',
                sort_method: 'asc',
                perPage: 10,
                page: 1,
                checkedColumn: Object.keys(this.data[0]),
                isActive: false
            }
        },
        computed: {
            filterSearch: function () {
                let f = this.data.filter((p) => {
                    let x = (this.search == '');
                    for (let key in p) {
                        let value = p[key] + '';
                        if (value.toLowerCase().match('.*' + this.search.toLowerCase() + '.*')) {
                            x = true;
                        }
                    }
                    return x;
                });
                return f;
            },
            filtered: function () {
                let f = this.filterSearch;
                if (this.sort_by != '') {
                    let k = this.sort_by;
                    let m = this.sort_method;
                    f.sort(function (a, b) {
                        if (m == 'asc') {
                            if (a[k] < b[k]) {
                                return -1;
                            }
                            if (a[k] > b[k]) {
                                return 1;
                            }
                        }

                        if (m == 'desc') {
                            if (a[k] > b[k]) {
                                return -1;
                            }
                            if (a[k] < b[k]) {
                                return 1;
                            }
                        }

                        return 0;
                    });
                }
                return f.slice((this.page - 1) * this.perPage, this.page * this.perPage);
            },
            icon: function () {
                if (this.sort_method == 'asc') {
                    return "fas fa-sort-up";
                } else {
                    return "fas fa-sort-down";
                }
            },
            pageCount: function () {
                let count = Math.ceil(this.filterSearch.length / this.perPage);
                return count;
            }
        },
        methods: {
            dropdown: function () {
                this.isActive = !this.isActive;
            },
            sort: function (s) {
                this.sort_by = s;
                this.sort_method = (this.sort_method == 'asc') ? 'desc' : 'asc';
            },
            classListPage: function (p) {
                if (p == this.page) {
                    return 'pagination-link is-current'
                } else {
                    return 'pagination-link'
                }
            },
            classPrevNext: function (p) {
                if (p == 'prev' && this.page == 1) {
                    return 'page-item disabled'
                }
                if (p == 'next' && this.page == Math.ceil(this.data.length / this.perPage)) {
                    return 'page-item disabled'
                }
                return 'page-item'
            }
        },
        created() {

        }
    }
</script>

<style>

    .table{
        width: 100%;
        overflow-x: auto;
    }
    thead {
        display: block;
        position: sticky;
        top: 0;
        background-color: grey;
    }

    thead th { min-width: 500px}

    tbody, thead tr {
        display: table;
        width: 100%;
        table-layout: fixed;
    }

    td {
        border: 1px solid;
        word-break: break-all;
    }

    * {
        box-sizing: border-box;
        border-collapse: collapse;
    }
</style>
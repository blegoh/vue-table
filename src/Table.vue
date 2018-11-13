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
                        <button class="button" aria-haspopup="true" >
                            <span>Show/hide column</span>
                            <span class="icon is-small">
                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                    </div>
                    <div class="dropdown-menu" role="menu">
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
        <div class="responsive">
        <table class="table is-bordered is-fullwidth" :id="uuid+'main-table'">
            <thead>
            <tr>
                <th v-bind:id="getThId('a',key)" v-on:click="sort(key)" v-for="(value, key) in data[0]"
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
        <table class="table is-bordered is-fullwidth header-fixed" :id="uuid+'header-fixed'" v-show="isShow">
            <thead>
            <tr>
                <th v-bind:id="getThId('b',key)" v-on:click="sort(key)" v-for="(value, key) in data[0]"
                    v-if="checkedColumn.indexOf(key) != -1">{{key}} <i v-bind:class="icon"
                                                                       v-if="sort_by == key"></i>
                </th>
            </tr>
            </thead>
        </table>
        </div>
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
                isActive: false,
                isShow: false,
                uuid: this.guid()
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
            s4: function(){
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            },
            guid: function(){
                return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
                    this.s4() + '-' + this.s4() + this.s4() + this.s4();
            },
            getWidth: function(key){
                console.log('col-'+key);
                let a = document.getElementById(this.uuid+'col-'+key);
                console.log(a);
                return 'width: '+a.offsetWidth+'px';
            },
            getThId: function(a,key){
                return (a == 'a')?this.uuid+'col-'+key:this.uuid+'cl-'+key;
            },
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
            },
            tableHeader: function () {
                let mainTable = document.getElementById(this.uuid+'main-table');
                let secondTable = document.getElementById(this.uuid+'header-fixed');
                secondTable.style.width=mainTable.offsetWidth+'px';
                if(mainTable.getBoundingClientRect().y <= 0 && mainTable.getBoundingClientRect().y >= (-1*mainTable.offsetHeight) ){
                    this.isShow = true;
                }else {
                    this.isShow = false;
                }
                for (let key in this.data[0]) {
                    if (this.checkedColumn.indexOf(key) != -1) {
                        let a = document.getElementById(this.uuid+'cl-' + key);
                        let b = document.getElementById(this.uuid+'col-' + key);
                        a.width = b.offsetWidth;
                    }
                }

            }
        },
        created() {
            window.addEventListener('scroll', this.tableHeader);
        }
    }
</script>

<style>
    /*.responsive{*/
        /*display: block;*/
        /*overflow-x: auto;*/
        /*white-space: nowrap;*/
    /*}*/
    .header-fixed {
        position: fixed;
        top: 0px;
        background-color:white;
    }
</style>
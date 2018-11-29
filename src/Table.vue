<template>
    <div>
        <div class="columns">
            <div class="column">
                <input v-model="search" @keypress="page = 1" class="input" type="search"
                       placeholder="Search"
                       aria-label="Search">
            </div>
            <div class="column">
                <div class="select">
                    <select v-model="perPage" @change="page=1">
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                        <option>25</option>
                    </select>
                </div>
            </div>
            <div class="column" v-if="!customHeaders">
                <div @click="dropdown" :class="{'dropdown': true, 'is-active': isActive }">
                    <div class="dropdown-trigger">
                        <button class="button" aria-haspopup="true">
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
                                    <input type="checkbox" :value="key"
                                           :disabled="checkedColumn.length == 1 && checkedColumn[0] == key"
                                           v-model="checkedColumn">
                                    {{key}}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column" v-if="!customHeaders">
                <div class="select">
                    <select v-model="fixedColumnChange">
                        <option v-for="(value, key) in data[0]"
                                v-if="checkedColumn.indexOf(key) != -1">{{key}}
                        </option>
                    </select>
                </div>
            </div>
        </div>
        <div :id="uuid+'hor-scroll'" style="overflow-x:auto;" @scroll="horizontalScroll">
            <table class="table is-bordered is-fullwidth" :id="uuid+'main-table'">
                <thead>
                <tr v-if="!!customHeaders" v-for="(head,index) in customHeaders">
                    <th :id="uuid+'-maintable-custom-header-'+index+'-'+i" v-for="(field,i) in head.fields"
                        :colspan="field.colSpan">{{field.caption}}
                    </th>
                </tr>
                <tr>
                    <th :id="getThId('a',fixedColumnChange)" @click="sort(fixedColumnChange)" class="first">
                        {{headers[fixedColumnChange]}} <i :class="icon"
                                                          v-if="sortBy == fixedColumnChange"></i>
                    </th>
                    <th :id="getThId('a',key)" @click="sort(key)" v-for="(value, key) in data[0]"
                        v-if="checkedColumn.indexOf(key) != -1 && key != fixedColumnChange"
                        :class="{'first' : checkedColumn.indexOf(key) == 0}">
                        {{headers[key]}} <i :class="icon"
                                            v-if="sortBy == key"></i>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(datum,index) in filtered">
                    <td :id="getTdId('a',index, fixedColumnChange)">{{datum[fixedColumnChange]}}</td>
                    <td :id="getTdId('a',index, key)" v-for="(value, key) in datum"
                        v-if="checkedColumn.indexOf(key) != -1 && key != fixedColumnChange">{{value}}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <table class="table is-bordered col-fixed" :id="uuid+'table-col'">
            <thead>
            <tr v-if="!!customHeaders" v-for="(head,index) in customHeaders">
                <th :id="uuid+'-col-table-custom-header-'+index">{{head.fields[0].caption}}</th>
            </tr>
            <tr>
                <th :id="uuid+'col-fix-th'" @click="sort(fixedColumnChange)">{{headers[fixedColumnChange]}} <i
                        :class="icon"
                        v-if="sortBy == fixedColumnChange"></i>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(datum, index) in filtered">
                <td :id="getTdId('b',index, fixedColumnChange)">{{datum[fixedColumnChange]}}</td>
            </tr>
            </tbody>
        </table>
        <table class="table is-bordered is-fullwidth header-fixed" :id="uuid+'header-fixed'" v-show="isShow">
            <thead>
            <tr v-if="!!customHeaders" v-for="(head,index) in customHeaders">
                <th :id="uuid+'-header-table-custom-header-'+index+'-'+i" v-for="(field,i) in head.fields"
                    :colspan="field.colSpan">{{field.caption}}
                </th>
            </tr>
            <tr>
                <th :id="getThId('b',fixedColumnChange)" @click="sort(fixedColumnChange)">{{headers[fixedColumnChange]}}
                    <i
                            :class="icon"
                            v-if="sortBy == fixedColumnChange"></i>
                </th>
                <th :id="getThId('b',key)" @click="sort(key)" v-for="(value, key) in data[0]"
                    v-if="checkedColumn.indexOf(key) != -1 && key != fixedColumnChange">{{headers[key]}} <i
                        :class="icon"
                        v-if="sortBy == key"></i>
                </th>
            </tr>
            </thead>
        </table>

        <table class="table is-bordered header-fixed" v-show="isShow">
            <thead>
            <tr v-if="!!customHeaders" v-for="(head,index) in customHeaders">
                <th :id="uuid+'-first-left-table-custom-header-'+index">{{head.fields[0].caption}}</th>
            </tr>
            <tr>
                <th :id="uuid+'top-left-col'" @click="sort(fixedColumnChange)">{{headers[fixedColumnChange]}}
                    <i :class="icon" v-if="sortBy == fixedColumnChange"></i>
                </th>
            </tr>
            </thead>
        </table>

        <nav class="pagination is-centered" role="navigation" aria-label="pagination">
            <a class="pagination-previous" @click="page -= 1">Previous</a>
            <a class="pagination-next" @click="page += 1">Next page</a>
            <ul class="pagination-list">
                <li v-for="n in pageCount"><a @click="page = n" :class="classListPage(n)">{{n}}</a></li>

            </ul>
        </nav>
    </div>
</template>
<script>
    export default {
        name: "Table",
        props: ['data', 'headers', 'customHeaders'],
        data: function () {
            return {
                search: '',
                sortBy: '',
                sortMethod: 'asc',
                perPage: 10,
                page: 1,
                checkedColumn: Object.keys(this.data[0]),
                isActive: false,
                isShow: false,
                fixedColumn: Object.keys(this.data[0])[0],
                uuid: this.guid()
            }
        },
        computed: {
            fixedColumnChange: {
                get: function () {
                    if (this.checkedColumn.indexOf(this.fixedColumn) < 0) {
                        this.fixedColumn = this.getFirstColumn();
                    }
                    return this.fixedColumn;
                },
                set: function (newValue) {
                    this.fixedColumn = newValue;
                }
            },
            // filter data with search keyword
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
                if (this.sortBy != '') {
                    let k = this.sortBy;
                    let m = this.sortMethod;
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
                if (this.sortMethod == 'asc') {
                    return "fas fa-sort-up";
                } else {
                    return "fas fa-sort-down";
                }
            },
            // get page count to generate pagination
            pageCount: function () {
                let count = Math.ceil(this.filterSearch.length / this.perPage);
                return count;
            }
        },
        methods: {
            s4: function () {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            },
            guid: function () {
                return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
                    this.s4() + '-' + this.s4() + this.s4() + this.s4();
            },
            getThId: function (a, key) {
                return (a == 'a') ? this.uuid + 'col-' + key : this.uuid + 'cl-' + key;
            },
            getTdId: function (a, index, key) {
                if (key != this.fixedColumnChange)
                    return '';
                return (a == 'a') ? this.uuid + 'left-' + index : this.uuid + 'lft-' + index;
            },
            // toggle dropdown for show/hide column
            dropdown: function () {
                this.isActive = !this.isActive;
            },
            sort: function (s) {
                this.sortBy = s;
                this.sortMethod = (this.sortMethod == 'asc') ? 'desc' : 'asc';
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
            horizontalScroll: function () {
                let elmnt = document.getElementById(this.uuid + 'hor-scroll');
                let mainTable = document.getElementById(this.uuid + 'main-table');
                let secondTable = document.getElementById(this.uuid + 'header-fixed');
                let thirdTable = document.getElementById(this.uuid + 'table-col');
                let dv = document.getElementById(this.uuid + 'hor-scroll');
                secondTable.style.left = mainTable.getBoundingClientRect().x + 'px';
                for (let key in this.data[0]) {
                    if (this.checkedColumn.indexOf(key) != -1) {
                        let a = document.getElementById(this.uuid + 'cl-' + key);
                        if (a.getBoundingClientRect().x < thirdTable.getBoundingClientRect().x || a.getBoundingClientRect().x > (thirdTable.getBoundingClientRect().x + dv.getBoundingClientRect().width)) {
                            a.classList.add('hide');
                        } else {
                            a.classList.remove('hide');
                        }
                    }
                }
                if (!!this.customHeaders) {
                    for (let index = 0; index < this.customHeaders.length; index++) {
                        for (let i = 0; i < this.customHeaders[index].fields.length; i++) {
                            let a = document.getElementById(this.uuid + '-header-table-custom-header-' + index + '-' + i);
                            if (a.getBoundingClientRect().x < thirdTable.getBoundingClientRect().x || a.getBoundingClientRect().x > (thirdTable.getBoundingClientRect().x + dv.getBoundingClientRect().width)) {
                                a.classList.add('hide');
                            } else {
                                a.classList.remove('hide');
                            }
                        }
                    }
                }
            },
            tableHeader: function () {
                let mainTable = document.getElementById(this.uuid + 'main-table');
                let secondTable = document.getElementById(this.uuid + 'header-fixed');
                secondTable.style.width = mainTable.offsetWidth + 'px';
                if (mainTable.getBoundingClientRect().y <= 0 && mainTable.getBoundingClientRect().y >= (-1 * mainTable.offsetHeight)) {
                    this.isShow = true;
                } else {
                    this.isShow = false;
                }
                let x = document.getElementById(this.uuid + 'top-left-col');
                let y = document.getElementById(this.uuid + 'col-' + this.fixedColumnChange);
                x.width = y.offsetWidth;
                for (let key in this.data[0]) {
                    if (this.checkedColumn.indexOf(key) != -1) {
                        let a = document.getElementById(this.uuid + 'cl-' + key);
                        let b = document.getElementById(this.uuid + 'col-' + key);
                        a.width = b.offsetWidth;
                    }
                }
            },
            colHeight: function () {
                let x = document.getElementById(this.uuid + 'top-left-col');
                let z = document.getElementById(this.uuid + 'col-fix-th');
                let y = document.getElementById(this.uuid + 'col-' + this.fixedColumnChange);
                x.height = y.offsetHeight;
                z.height = y.offsetHeight;
                for (let i = 0; i < this.filtered.length; i++) {
                    let a = document.getElementById(this.uuid + 'left-' + i);
                    let b = document.getElementById(this.uuid + 'lft-' + i);
                    b.height = a.offsetHeight;
                }
                if (!!this.customHeaders) {
                    for (let i = 0; i < this.customHeaders.length; i++) {
                        let c = document.getElementById(this.uuid + '-maintable-custom-header-' + i + '-0');
                        let d = document.getElementById(this.uuid + '-col-table-custom-header-' + i);
                        let e = document.getElementById(this.uuid + '-first-left-table-custom-header-' + i);
                        d.height = c.offsetHeight;
                        e.height = c.offsetHeight;
                    }
                }
            },
            colWidth: function () {
                let x = document.getElementById(this.uuid + 'col-fix-th');
                let a = document.getElementById(this.uuid + 'col-' + this.fixedColumnChange);
                x.width = a.offsetWidth;
            },
            colFixed: function () {
                let mainTable = document.getElementById(this.uuid + 'main-table');
                let secondTable = document.getElementById(this.uuid + 'table-col');
                secondTable.style.top = mainTable.getBoundingClientRect().y + 'px';
            },
            getFirstColumn: function () {
                for (let key in this.data[0]) {
                    if (this.checkedColumn.indexOf(key) != -1)
                        return key;
                }
                return this.checkedColumn[0];
            }
        },
        mounted() {
            console.log(this.customHeaders);
            this.colHeight();
            this.colWidth();
            this.colFixed();
        }
        ,
        created() {
            window.addEventListener('scroll', this.tableHeader);
            window.addEventListener('scroll', this.colFixed);
            window.addEventListener('scroll', this.horizontalScroll);
        }
        ,
        updated() {
            this.colHeight();
            this.colWidth();
            this.tableHeader();
        }
    }
</script>

<style>
    .header-fixed {
        position: fixed;
        display: block;
        top: 0px;
        background-color: white;
        border: none;
    }

    .header-fixed thead {
        border: none;
    }

    .header-fixed tr {
        border: none;
    }

    .col-fixed {
        position: fixed;
        display: block;
        overflow-x: auto;
        top: 5px;
        background-color: white;
    }

    .col-fixed td {
        word-wrap: break-word;
        max-width: 100px;
    }

    .hide {
        visibility: hidden;
        border: none !important;
    }


</style>
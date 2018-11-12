const Datatable = {

    install(Vue, options) {

        Vue.component('datatable', {
            props: ['data'],
            data: function () {
                return {
                    search: '',
                    sort_by: '',
                    sort_method: 'asc',
                    perPage: 10,
                    page: 1,
                    checkedColumn: Object.keys(this.data[0])
                }
            },
            template: `
                <div>
                    <div class="row">
                        <div class="col-sm">
                            <input v-model="search" class="form-control" type="search" placeholder="Search" aria-label="Search">
                        </div>
                        <div class="col-sm">
                            <select v-model="perPage" class="custom-select" id="inputGroupSelect01">
                                <option>10</option>
                                <option>15</option>
                                <option>20</option>
                                <option>25</option>
                            </select>
                        </div>
                        <div class="col-sm">
                            <div class="dropdown">
                              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Show/hide column
                              </button>
                              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <div class="form-check" v-for="(value, key) in data[0]">
                                  <input class="form-check-input" type="checkbox" :value="key" v-model="checkedColumn">
                                  <label class="form-check-label" for="defaultCheck1">
                                    {{key}}
                                  </label>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <table class="table table-bordered" style="table-layout: fixed;">
                        <thead class="thead-dark">
                        <tr>
                            <th scope="col" v-on:click="sort(key)" v-for="(value, key) in data[0]" v-if="checkedColumn.indexOf(key) != -1">{{key}} <i v-bind:class="icon"
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
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li v-bind:class="classPrevNext('prev')">
                                <a class="page-link" v-on:click="page -= 1" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span class="sr-only">Previous</span>
                                </a>
                            </li>
                
                            <li v-bind:class="classListPage(n)" v-for="n in pageCount">
                                <a class="page-link" href="#" v-on:click="page = n">
                                    {{n}}
                                    <span class="sr-only" v-if="n == page">(current)</span>
                                </a>
                            </li>
                
                            <li v-bind:class="classPrevNext('next')">
                                <a class="page-link" v-on:click="page += 1" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            `,
            computed: {
                filterSearch: function(){
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

// names must be equal
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
                sort: function (s) {
                    this.sort_by = s;
                    this.sort_method = (this.sort_method == 'asc') ? 'desc' : 'asc';
                },
                classListPage: function (p) {
                    if (p == this.page) {
                        return 'page-item active'
                    } else {
                        return 'page-item'
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
            }
        });

        Vue.mixin({
            // Add component lifecycle hooks or properties.
            created() {

            }
        });

    }
};

export default Datatable
# vue-table-blegoh

A Vue component like JQuery Datatable.


## Installation

```js
npm i vue-table-blegoh
```

### Browser

Include the script file, then install the component with `Vue.use(VueTable);` e.g.:

```html
<script type="text/javascript" src="node_modules/vue/dist/vue.min.js"></script>
<script type="text/javascript" src="node_modules/vue-table-blegoh/dist/vue-table.min.js"></script>
<script type="text/javascript">
  Vue.use(VueTable);
</script>
```

### Module

```js
import VueTable from 'vue-table-blegoh';

new Vue({
  components: {
    VueTable
  }
});

```

## Usage

### Using props

```html
<div id="app">
    <vue-table v-bind:data="users"></vue-table>
</div>
```
```js
var app = new Vue({
  el: '#app',
  data: {
    users: [
        {
            "id": 0,
            "first_name": "Lorraine",
            "last_name": "Fields",
            "gender": "female",
            "age": 20,
            "eyeColor": "green",
            "email": "lorrainefields@grok.com",
            "balance": "$1,189.15",
            "phone": "+1 (901) 442-3257",
            "address": "617 Quentin Street, Vivian, Alabama, 4745",
            "company": "HOPELI",
            "latitude": -45.537617,
            "longitude": 54.224457,
            "registered": "2017-12-14T08:02:56 -07:00"
        },
        {
            "id": 1,
            "first_name": "Stanton",
            "last_name": "Hebert",
            "gender": "male",
            "age": 28,
            "eyeColor": "green",
            "email": "stantonhebert@hopeli.com",
            "balance": "$3,288.77",
            "phone": "+1 (841) 405-3690",
            "address": "563 Melba Court, Ernstville, Arizona, 4331",
            "company": "BRISTO",
            "latitude": 70.585429,
            "longitude": 94.545702,
            "registered": "2016-03-26T02:35:10 -07:00"
        },
        {
            "id": 2,
            "first_name": "Karyn",
            "last_name": "Barr",
            "gender": "female",
            "age": 33,
            "eyeColor": "brown",
            "email": "karynbarr@bristo.com",
            "balance": "$1,694.01",
            "phone": "+1 (885) 438-3758",
            "address": "981 Portal Street, Cotopaxi, Indiana, 5943",
            "company": "OCEANICA",
            "latitude": 18.869135,
            "longitude": -77.283556,
            "registered": "2014-10-10T10:53:15 -07:00"
        }
    ]
  }
})
```
### Using slot

```html
<div id="app">
    <vue-table>
    <template slot="p-head">
        <tr>
            <th colspan="2"></th>
            <th colspan="6">19 Nov</th>
        </tr>
        <tr>
            <th colspan="2"></th>
            <th colspan="3">Target</th>
            <th colspan="3">Actual</th>
        </tr>
    </template>
    <template slot="p-filter">
        <tr>
            <th>No</th>
            <th>Name</th>
            <th>Call</th>
            <th>Ec</th>
            <th>Value</th>
            <th>Call</th>
            <th>Ec</th>
            <th>Value</th>
        </tr>
    </template>
    <template slot="p-body">
        <tr>
            <td>1</td>
            <td>Adhi Tomara</td>
            <td>5</td>
            <td>3</td>
            <td>750000</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>1</td>
            <td>Adhi Tomara</td>
            <td>5</td>
            <td>3</td>
            <td>750000</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>1</td>
            <td>Adhi Tomara</td>
            <td>5</td>
            <td>3</td>
            <td>750000</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
    </template>
    </vue-table>
</div>
```

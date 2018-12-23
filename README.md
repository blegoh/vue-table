# vue-table-blegoh

A Vue component like JQuery Datatable.


## Installation

```
npm i vue-table-blegoh
```

Import globally in app:

```js
import VueTable from 'vue-table-blegoh';

Vue.use(VueTable);
```

Import into your component
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
        }
    ]
  }
})
```

#### Custom field name

```html
<div id="app">
    <vue-table v-bind:data="users" v-bind:headers="headers"></vue-table>
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
        },      
    ],
    headers: {
        "id": "ID",
        "first_name": "First Name",
        "last_name": "Last Name",
        "gender": "Gender",
        "age": "Age",
        "eyeColor": "Eye Color",
        "email": "Email",
        "balance": "Balance",
        "phone": "Phone",
    }
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
            <td>Adhi Lorraine</td>
            <td>5</td>
            <td>3</td>
            <td>750000</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>1</td>
            <td>Bagas Saputra</td>
            <td>5</td>
            <td>3</td>
            <td>750000</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>1</td>
            <td>Bagus</td>
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

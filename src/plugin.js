import Table from "./Table.vue"

const Datatable = {

    install(Vue, options) {

        Vue.component('datatable', Table);

        Vue.mixin({
            // Add component lifecycle hooks or properties.
            created() {

            }
        });

    }
};

export default Datatable
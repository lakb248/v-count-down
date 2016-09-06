import Vue from 'vue';
import vueCountDown from './src/vue-count-down.vue';

new Vue({
    el: '#container',
    components: {
        'vue-count-down': vueCountDown
    },
    data() {
        return {};
    }
});

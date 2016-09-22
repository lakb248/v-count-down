import Vue from 'vue';
import vueCountDown from './src/v-count-down.vue';

new Vue({
    el: '#container',
    components: {
        'vue-count-down': vueCountDown
    },
    data() {
        return {};
    }
});

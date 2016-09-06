/* global describe, it, expect */
import Vue from 'vue';
import vueCountDown from '../src/vue-count-down.vue';

describe('vue-count-down.vue', () => {
    it('should have correct text', () => {
        expect(vueCountDown.data().text).toBe('Hello vueCountDown');
    });

    it('should render correct text', () => {
        const vm = new Vue({
            template: '<div><vue-count-down></vue-count-down></div>',
            components: {
                'vue-count-down': vueCountDown
            }
        }).$mount();
        expect(vm.$el.querySelector('h2').textContent)
            .toBe('Hello vueCountDown');
    });
});

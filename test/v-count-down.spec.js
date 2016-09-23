/* global describe, it, expect */
import Vue from 'vue';
import vueCountDown from '../src/v-count-down.vue';

describe('vue-count-down.vue', () => {
    it('should call onTimeut on timeout(use duration props)', (done) => {
        var hasCallTimeout = false;
        var vm = new Vue({
            template: '<div><vue-count-down duration="2000" :on-timeout="onTimeout"></vue-count-down></div>',
            components: {
                'vue-count-down': vueCountDown
            },
            methods: {
                onTimeout() {
                    hasCallTimeout = true;
                }
            }
        }).$mount().$appendTo('body');
        setTimeout(() => {
            expect(hasCallTimeout).toBe(true);
            done();
        }, 2000);
    });
    it('should call onTimeut on timeout(use endTime props)', (done) => {
        var hasCallTimeout = false;
        var vm = new Vue({
            template: '<div><vue-count-down :end-time="endTime" :on-timeout="onTimeout"></vue-count-down></div>',
            components: {
                'vue-count-down': vueCountDown
            },
            data() {
                return {
                    endTime: new Date().getTime() + 2000
                }
            },
            methods: {
                onTimeout() {
                    hasCallTimeout = true;
                }
            }
        }).$mount().$appendTo('body');
        setTimeout(() => {
            expect(hasCallTimeout).toBe(true);
            done();
        }, 2000);
    });
    it('should set the duration to zero when endTime is invalid', () => {
        var hasCallTimeout = false;
        var vm = new Vue({
            template: '<div><vue-count-down v-ref:count-down :end-time="endTime" :on-timeout="onTimeout"></vue-count-down></div>',
            components: {
                'vue-count-down': vueCountDown
            },
            data() {
                return {
                    endTime: 'ee'
                }
            },
            methods: {
                onTimeout() {
                    hasCallTimeout = true;
                }
            }
        }).$mount().$appendTo('body');
        expect(vm.$refs.countDown.duration).toBe(0);
    });
});

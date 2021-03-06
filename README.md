# v-count-down
[![Build Status](https://travis-ci.org/lakb248/v-count-down.svg?branch=master)](https://travis-ci.org/lakb248/v-count-down)
[![codecov](https://codecov.io/gh/lakb248/v-count-down/branch/master/graph/badge.svg)](https://codecov.io/gh/lakb248/v-count-down)

> A count down component implement by vuejs

## Demo
[Demo](https://lakb248.github.io/v-count-down/)

## Usage

### Install

```bash
npm install v-count-down --save
```

And, if you are using vue 2.0

```bash
npm install v-count-down@next --save
```

### CommonJS

```javascript
var VueCountDown = require('v-count-down');

new Vue({
    components: {
        'vue-count-down': VueCountDown
    },
    template: '<vue-count-down duration="100000"></vue-count-down>'
});
```

### ES6
```javascript
import VueCountDown from 'v-count-down';

new Vue({
    components: {
        'vue-count-down': VueCountDown
    },
    template: '<vue-count-down duration="100000"></vue-count-down>'
})
```

### Props
| Property | Description |
|:--|:--|
| duration | the duration of the count down |
| endTime | the end time of the count down |
| onTimeOut | timeout handler of the count down |

## License

[MIT](http://opensource.org/licenses/MIT)

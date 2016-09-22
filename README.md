# v-count-down
> A count down component implement by vuejs

## Usage

### Install

```bash
npm install v-count-down --save
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

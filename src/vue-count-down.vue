<template>
    <div class="count-down-container">
        {{hours}}:{{minutes}}:{{seconds}}
    </div>
</template>

<script>
    var isValidDate = date => {
        if (typeof date === 'object') {
            if (isNaN(date.getTime())) {
                return false;
            }
            return true;
        }
        return false;
    };
    var formatMillisecond = milliseconds => {
        milliseconds = milliseconds || 0;
        // var days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
        var hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;
        var minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
        var seconds = Math.floor(milliseconds / 1000) % 60;
        return {
            // days: days,
            hours: hours >= 10 ? hours : ('0' + hours),
            minutes: minutes >= 10 ? minutes : ('0' + minutes),
            seconds: seconds >= 10 ? seconds : ('0' + seconds)
        };
    };
    export default {
        props: ['startTime', 'endTime', 'duration', 'onTimeout'],
        data() {
            return {
                hours: '00',
                minutes: '00',
                seconds: '00',
                startTimestamp: 0,
                endTimestamp: 0,
                timeout: -1,
                interval: 1000,
                count: 0,
                baseTimestamp: new Date().getTime()
            };
        },
        methods: {
            countDown(callback) {
                var nextTime = 0;
                if (this.count === 0) {
                    // ths startTime need to be calibrated on first count down
                    nextTime = 1000 - this.startTimestamp % 1000;
                    this.startTimestamp = this.startTimestamp + nextTime;
                    this.baseTimestamp = this.baseTimestamp + nextTime;
                    this.duration -= nextTime;
                } else {
                    var offset = this.startTimestamp + (new Date().getTime() -
                        this.baseTimestamp) - (this.startTimestamp +
                        (this.count - 1) * this.interval);
                    nextTime = this.interval - offset;
                    this.duration -= this.interval;
                }
                this.count ++;
                if (nextTime < 0) {
                    nextTime = 0;
                }

                if (callback && typeof callback === 'function') {
                    callback(this.duration);
                }
                if (this.duration <= 0) {
                    clearTimeout(this.timeout);
                } else {
                    this.timeout = setTimeout(() => {
                        this.countDown(duration => {
                            if (callback && typeof callback === 'function') {
                                callback(duration);
                            }
                        });
                    }, nextTime);
                }
            },
            updateCountDown(duration) {
                var formatedDuration = formatMillisecond(this.duration);
                this.hours = formatedDuration.hours;
                this.minutes = formatedDuration.minutes;
                this.seconds = formatedDuration.seconds;
            }
        },
        ready() {
            // if duration is not given, use endTime to calculate the duration
            if (!this.duration) {
                var startTime = new Date(this.startTime);
                var endTime = new Date(this.endTime);
                if (!isValidDate(startTime)) {
                    startTime = new Date();
                }
                if (!isValidDate(endTime)) {
                    endTime = new Date();
                }
                this.duration = endTime.getTime() - startTime.getTime();
                this.startTimestamp = startTime.getTime();
                this.endTimestamp = endTime.getTime();
            } else {
                // else calculate the endTime by duration
                this.startTimestamp = new Date().getTime();
                this.endTimestamp = this.startTimestamp + this.duration;
            }

            if (this.duration > 0) {
                clearTimeout(this.timeout);
                this.countDown(duration => {
                    if (duration <= 0) {
                        if (this.onTimeout &&
                            typeof this.onTimeout === 'function') {
                            this.onTimeout();
                        }
                        this.duration = 0;
                    }
                    this.updateCountDown(this.duration);
                });
            } else {
                this.duration = 0;
                this.updateCountDown(0);
            }
        }
    };
</script>

<style lang="sass">
    $count-down-height: 40px;
    $count-down-number-height: 40px;
    $count-down-unit-height: $count-down-height - $count-down-number-height;
    $count-down-width: 60px;
    $border-radius: 5px;
    .count-down-container {
        display: inline-block;
        height: $count-down-height;
        line-height: $count-down-number-height;
    }
    .count-down-item {
        float: left;
        min-width: $count-down-width;
        height: $count-down-height;
        line-height: $count-down-height;
        background-color: #2c3133;
        color: #fff;
        overflow: hidden;
        border-radius: $border-radius;
    }
    .count-down-split {
        float: left;
        width: 15px;
        text-align: center;
        color: #000;
        height: $count-down-height;
        line-height: $count-down-height;
    }

</style>

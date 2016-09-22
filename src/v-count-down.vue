<template>
    <div class="count-down-container" v-bind:class="{'finished': duration <= 0}">
        <div class="count-down-group">
            <div class="count-down-hour count-down-item">
                <div class="count-down-number">
                    <div class="card top">
                        <div class="top-half current-count">0</div>
                        <div class="back bottom-half">
                            <div class="next-count adjuct">0</div>
                        </div>
                    </div>
                    <div class="card middle">
                        <div class="top-half next-count">0</div>
                    </div>
                    <div class="card bottom current-count">0</div>
                </div>
            </div>
            <div class="count-down-hour count-down-item">
                <div class="count-down-number">
                    <div class="card top">
                        <div class="top-half current-count">0</div>
                        <div class="back bottom-half">
                            <div class="next-count adjuct">0</div>
                        </div>
                    </div>
                    <div class="card middle">
                        <div class="top-half next-count">0</div>
                    </div>
                    <div class="card bottom current-count">0</div>
                </div>
            </div>
        </div>
        <div class="count-down-group">
            <div class="count-down-minute count-down-item">
                <div class="count-down-number">
                    <div class="card top">
                        <div class="top-half current-count">0</div>
                        <div class="back bottom-half">
                            <div class="next-count adjuct">0</div>
                        </div>
                    </div>
                    <div class="card middle">
                        <div class="top-half next-count">0</div>
                    </div>
                    <div class="card bottom current-count">0</div>
                </div>
            </div>
            <div class="count-down-minute count-down-item">
                <div class="count-down-number">
                    <div class="card top">
                        <div class="top-half current-count">0</div>
                        <div class="back bottom-half">
                            <div class="next-count adjuct">0</div>
                        </div>
                    </div>
                    <div class="card middle">
                        <div class="top-half next-count">0</div>
                    </div>
                    <div class="card bottom current-count">0</div>
                </div>
            </div>
        </div>
        <div class="count-down-group">
            <div class="count-down-second count-down-item">
                <div class="count-down-number">
                    <div class="card top">
                        <div class="top-half current-count">0</div>
                        <div class="back bottom-half">
                            <div class="next-count adjuct">0</div>
                        </div>
                    </div>
                    <div class="card middle">
                        <div class="top-half next-count">0</div>
                    </div>
                    <div class="card bottom current-count">0</div>
                </div>
            </div>
            <div class="count-down-second count-down-item">
                <div class="count-down-number">
                    <div class="card top">
                        <div class="top-half current-count">0</div>
                        <div class="back bottom-half">
                            <div class="next-count adjuct">0</div>
                        </div>
                    </div>
                    <div class="card middle">
                        <div class="top-half next-count">0</div>
                    </div>
                    <div class="card bottom current-count">0</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // const OBJECT_TYPE = 'object';
    // const FUNCTION_TYPE = 'function';
    /**
     * whether the given date is a valid date object
     * @param  {Date}  date the given date
     * @return {Boolean} the result
     */
    var isValidDate = function (date) {
        if (date.getTime) {
            if (isNaN(date.getTime())) {
                return false;
            }
            return true;
        }
        return false;
    };

    /**
     * format the milliseconds to object
     * @param  {Integer} milliseconds the milliseconds
     * @return {Object} the object after being formatted
     */
    var formatMillisecond = milliseconds => {
        milliseconds = milliseconds || 0;
        // var days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
        var hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;
        var minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
        if (milliseconds % 1000 === 0) {
            var seconds = Math.floor(milliseconds / 1000) % 60 - 1;
        } else {
            var seconds = Math.floor(milliseconds / 1000) % 60;
        }
        return {
            // days: days,
            hour: hours >= 10 ? [Math.floor(hours/10), hours % 10] : [0, hours],
            minute: minutes >= 10 ? [Math.floor(minutes/10), minutes % 10] : [0, minutes],
            second: seconds >= 10 ? [Math.floor(seconds/10), seconds % 10] : [0, seconds]
        };
    };

    const SPEED = 400;

    export default {
        props: ['endTime', 'duration', 'onTimeout'],
        data() {
            return {
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
                    nextTime = this.duration % 1000;
                    this.baseTimestamp +=  nextTime;
                    this.duration -= nextTime;
                } else {
                    var offset = new Date().getTime() - this.baseTimestamp - (this.count - 1) * this.interval;
                    nextTime = this.interval - offset;
                    this.duration -= this.interval;
                }
                this.count ++;
                if (nextTime < 0) {
                    nextTime = 0;
                }
                if (this.duration <= 0) {
                    clearTimeout(this.timeout);
                    if (callback && typeof callback === 'function') {
                        callback(this.duration);
                    }
                } else {
                    this.timeout = setTimeout(() => {
                        this.updateCountDown(this.duration, true);
                        this.countDown(callback);
                    }, nextTime);
                }
            },
            updateCountDown(duration, withAnimation) {
                var formatedDuration = formatMillisecond(duration, withAnimation);
                for (var key in formatedDuration) {
                    if (formatedDuration.hasOwnProperty(key)) {
                        this.renderCountDown(key, 0, formatedDuration[key][0], withAnimation);
                        this.renderCountDown(key, 1, formatedDuration[key][1], withAnimation);
                    }
                }
            },
            renderCountDown(unit, bit, val, withAnimation) {
                var countDownUI = this.$el.querySelectorAll('.count-down-' + unit)[bit];
                var top = countDownUI.querySelector('.top');
                var nextCounts = countDownUI.querySelectorAll('.next-count');
                var currentCounts = countDownUI.querySelectorAll('.current-count');

                if (val !== +currentCounts[0].innerHTML) {
                    if (withAnimation) {
                        top.style.transition = 'transform ' + SPEED / 1000 + 's linear';
                        top.style.transform = 'rotateX(180deg)';
                        nextCounts[0].innerHTML = val;
                        nextCounts[1].innerHTML = val;
                        setTimeout(function () {
                            currentCounts[0].innerHTML = val;
                            currentCounts[1].innerHTML = val;
                            top.style.transition = 'none';
                            top.style.transform = 'rotateX(0deg)';
                        }, SPEED);
                    } else {
                        currentCounts[0].innerHTML = val;
                        currentCounts[1].innerHTML = val;
                    }
                }
            }
        },
        ready() {
            // if duration is not given, use endTime to calculate the duration
            if (!this.duration) {
                var endTime = new Date(this.endTime);
                if (!isValidDate(endTime)) {
                    endTime = new Date();
                }
                this.duration = endTime.getTime() - new Date().getTime();
                this.endTimestamp = endTime.getTime();
            } else {
                // else calculate the endTime by duration
                this.endTimestamp = new Date().getTime() + this.duration;
            }

            if (this.duration > 0) {
                // first update count down without animation to avoid initial flash
                this.updateCountDown(this.duration, false);
                this.countDown(() => {
                    if (this.onTimeout && typeof this.onTimeout === 'function') {
                        this.onTimeout();
                    }
                });
            } else {
                this.duration = 0;
            }
        }
    };
</script>

<style lang="sass" scoped>
    $count-down-height: 48px;
    $count-down-number-height: 48px;
    $count-down-line-height: 53px;
    $count-down-width: 30px;
    $border-radius: 5px;
    .count-down-container {
        height: $count-down-height;
        line-height: $count-down-line-height;
        font-family: "微软雅黑", "Microsoft Yahei", "STHeiti";
        color: #ffc600;
        &.finished {
            color: #ddd;
        }
    }
    .count-down-group {
        float: left;
        margin-right: 10px;
        &:nth-of-type(3) {
            margin-right: 0px;
        }
        .count-down-item:nth-of-type(2) {
            margin-right: 0px;
        }
    }
    .count-down-item {
        float: left;
        min-width: $count-down-width;
        height: $count-down-height;
        margin-right: 1px;
        overflow: hidden;
    }
    .count-down-number {
        width: 100%;
        height: $count-down-number-height;
        text-align: center;
        font-size: 40px;
        font-weight: bold;
        position: relative;
    }
    .card {
        position: absolute;
        left: 0px;
        top: 0px;
        right: 0px;
        bottom: 0px;
    }
    .top {
        z-index: 3;
        -moz-transform-style: preserve-3d;
        -webkit-transform-style: preserve-3d;
        transform-style:preserve-3d;
    }
    .middle {
        z-index: 2;
    }
    .bottom {
        z-index: 1;
        background: url(./asserts/count-down-bg.png) no-repeat center center;
        background-size: 30px 48px;
    }
    .bottom-half, .top-half {
        position: absolute;
        left: 0px;
        top: 0px;
        height: 50%;
        width: 100%;
        background-color: #2c3133;
        overflow: hidden;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        backface-visibility: hidden;
    }
    .bottom-half {
        background: url(./asserts/count-down-bg.png) no-repeat center -24px;
        background-size: 30px 48px;
    }
    .top-half {
        background: url(./asserts/count-down-half.png) no-repeat center center;
        background-size: 30px 24px;
    }
    .back {
        -webkit-transform: rotateX(180deg);
        -moz-transform: rotateX(180deg);
        -o-transform: rotateX(180deg);
        -ms-transform: rorateX(180deg);
        transform: rotateX(180deg);
        display: none\0;
    }
    .adjuct {
        height: 100%;
        line-height: $count-down-line-height - $count-down-number-height;
    }
</style>

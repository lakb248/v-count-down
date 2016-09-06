<template>
    <div class="count-down-container">
        <div class="count-down-hour count-down-item">
            <div class="count-down-number">
                <div class="card top">
                    <div class="top-half current-count"></div>
                    <div class="back bottom-half">
                        <div class="next-count adjuct"></div>
                    </div>
                </div>
                <div class="card middle">
                    <div class="top-half next-count"></div>
                </div>
                <div class="card bottom current-count"></div>
            </div>
        </div>
        <div class="count-down-split">:</div>
        <div class="count-down-minute count-down-item">
            <div class="count-down-number">
                <div class="card top">
                    <div class="top-half current-count"></div>
                    <div class="back bottom-half">
                        <div class="next-count adjuct"></div>
                    </div>
                </div>
                <div class="card middle">
                    <div class="top-half next-count"></div>
                </div>
                <div class="card bottom current-count"></div>
            </div>
        </div>
        <div class="count-down-split">:</div>
        <div class="count-down-second count-down-item">
            <div class="count-down-number">
                <div class="card top">
                    <div class="top-half current-count"></div>
                    <div class="back bottom-half">
                        <div class="next-count adjuct"></div>
                    </div>
                </div>
                <div class="card middle">
                    <div class="top-half next-count"></div>
                </div>
                <div class="card bottom current-count"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['startTime', 'endTime', 'onTimeout']
    };
</script>

<style lang="sass">
    $count-down-height: 40px;
    $count-down-number-height: 40px;
    $count-down-unit-height: $count-down-height - $count-down-number-height;
    $count-down-width: 60px;
    $border-radius: 5px;
    .count-down-container {
        height: $count-down-height;
        line-height: $count-down-number-height;
        font-family: "微软雅黑", "Microsoft Yahei";
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
        div {
            border-radius: $border-radius;
        }
    }
    .count-down-number {
        width: 100%;
        height: $count-down-number-height;
        line-height: $count-down-number-height;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        padding: 0px 10px;
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
    .count-down-unit {
        width: 100%;
        height: $count-down-unit-height;
        line-height: $count-down-unit-height;
        text-align: center;
        font-size: 12px;
        padding: 0px 10px;
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
        line-height: 0px;
    }
    .count-down-split {
        float: left;
        width: 15px;
        text-align: center;
        color: #fff;
        height: $count-down-height;
        line-height: $count-down-height;
    }

</style>

<template>
    <div id="state">
        <div class="container">
            <div class="top"><img src="/src/assets/iconfonts/userinfo/stats.svg">Stats</div>
            <div>
                <div class="publications">
                    <div></div>
                    <div></div>
                </div>
                <div class="citations">
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';

</script>

<style scoped>
#state {
    background-color: #fff;
    width: 40%;
    height: 25vh;
    border-radius: 20px;
    min-height: 250px;
    margin-bottom: 50px;
    margin-left: 40px;
}

.top{
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-left: 20px;
    font-size: 25px;
    font-weight: 700;
    img{
        width: 30px;
        height: 30px;
        margin: 0 8px;
    }
}
</style>
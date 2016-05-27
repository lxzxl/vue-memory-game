<template>
    <div class="logo">
        <h1>
            <a href="https://github.com/lxzxl/vue-memory-game" target="_blank">Memory</a>
        </h1>
        <span class="rank">
            <a href="#!" @click="toggleRank">RANK</a>
        </span>
    </div>
</template>

<script>
    import {toggleRank} from 'vuex/actions/controlCenter';

    export default {
        vuex: {
            actions: {
                toggleRank
            }
        }
    }
</script>

<style scoped>
    .logo {
        width: 160px;
        height: 100px;
        border-radius: 5px;
        background-color: #5979ac;
        color: #fff;
        text-align: center;
    }

    a {
        text-decoration: none;
        color: #fff;
    }

    h1 {
        height: 70px;
        line-height: 70px;
    }

    .rank {
        height: 30px;
        line-height: 30px;
    }

    .rank a {
        color: #2DFF00;
    }

    @media screen and (max-width: 450px) {
        .logo{
            width: 150px;
        }
    }

    @media screen and (max-width: 380px) {
        .logo{
            width: 140px;
        }
    }

    @media screen and (max-width: 360px) {
        .logo{
            width: 110px;
        }
        a{
            font-size: 18px;
        }
    }
</style>

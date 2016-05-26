<template>
    <Rankboard v-if="showRank" class="game-panel"></Rankboard>
    <div class="game-panel" v-else>
        <!-- 组装上、中、下三个部分组件 -->
        <Dashboard></Dashboard>
        <Chessboard></Chessboard>
        <Status></Status>
    </div>
</template>

<script>

    import Dashboard from './dashboard/Dashboard';
    import Chessboard from './card/Chessboard';
    import Status from './footer/PlayStatus';
    import Rankboard from './Rankboard';

    import {init, reset, updateStatus, toggleRank} from 'vuex/actions/controlCenter';
    import {STATUS} from 'vuex/store/statusEnum';
    import {showRank} from 'vuex/getters/stateHolder';

    export default {

        //vuex是一个特殊的属性，actions放在里面，
        //省却了我们手动传入this.$store的麻烦

        vuex: {
            getters: {
                showRank
            },
            actions: {
                init,
                reset,
                updateStatus,
                toggleRank
            }
        },

        created: function () {
            this.init();
            this.updateStatus(STATUS.READY);
            this.reset();
        },

        components: {Dashboard, Chessboard, Status, Rankboard}
    }
</script>

<style scoped>
    .game-panel {
        width: 450px;
        height: 670px;
        border: 4px solid #BDBDBD;
        border-radius: 2px;
        background-color: #faf8ef;
        padding: 10px;
        display: flex;
        flex-direction: column;
    }
</style>

<template>
    <component :is="curView" keep-alive
               transition="fade"
               transition-mode="out-in">
    </component>
</template>

<script>
    import Game from './Game';
    import Rankboard from './Rankboard';

    import {showRank} from 'vuex/getters/stateHolder';

    export default {
        vuex: {
            getters: {
                showRank
            }
        },
        computed: {
            curView(){
                return this.showRank ? 'Rankboard' : 'Game';
            }
        },
        components: {
            Game,
            Rankboard
        }
    };
</script>

<style scoped>
    .fade-transition {
        transition: opacity .3s ease;
    }

    .fade-enter, .fade-leave {
        opacity: 0;
    }
</style>
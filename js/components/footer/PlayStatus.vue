<template>
    <div class="status-footer">
        <span class="user-info">{{ user.me.name }}
            <button @click="toggleModal">Change</button>
            <button @click="updateScore">Submit</button>
        </span>
        <span v-if="status === READY">Ready</span>
        <span v-if="status === PLAYING">Playing</span>
        <a v-if="status === PASS" v-on:click.prevent.stop="reset" href>Play again</a>
        <span class="elapsed">{{ elapsedMs }} s</span>
    </div>
    <modal :onconfirm="onconfirm">
        <h3 slot="header">Please input your name</h3>
        <div slot="body"><input type="text" name="username" :value="user.me.name"></div>
    </modal>
</template>

<script>
    import Modal from './Modal';

    import {reset, toggleModal, updateUsername, updateScore} from 'vuex/actions/controlCenter';
    import {status, elapsedMs, user} from 'vuex/getters/stateHolder';

    import {STATUS} from 'vuex/store/statusEnum';

    export default {

        data: function () {
            return STATUS;
        },

        vuex: {
            actions: {
                reset,
                toggleModal,
                updateUsername,
                updateScore
            },
            getters: {
                status,
                elapsedMs,
                user
            }
        },
        components: {
            Modal
        },
        methods: {
            onconfirm(){
                this.updateUsername(document.querySelector('input[name=username]').value);
            }
        }

    }
</script>

<style scoped>
    .status-footer {
        position: relative;
        margin-top: 10px;
        width: 100%;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
    }

    a {
        text-decoration: none;
    }

    .elapsed {
        position: absolute;
        right: 10px;
        font-size: 15px;
        font-weight: normal;
    }

    .user-info {
        position: absolute;
        left: 10px;
        font-size: 15px;
    }

    input[name=username] {
        width: 100%;
    }
</style>

<template>
    <div class="rank">
        <div class="header">
            <span class="back">
                <a href="#!" @click="toggleRank">Back</a>
            </span>
            <h1>RANK</h1>
        </div>

        <ul>
            <li v-for="user in allUsers| orderBy 'highestSpeed' | limitBy 10">
                <span class="name">{{ user.name }}</span> - {{ user.highestSpeed }}
            </li>
        </ul>
    </div>
</template>

<script type="text/babel">
    import {toggleRank} from 'vuex/actions/controlCenter';
    import {user} from 'vuex/getters/stateHolder';

    export default{
        vuex: {
            getters: {
                user
            },
            actions: {
                toggleRank
            }
        },
        computed: {
            allUsers(){
                return Object.keys(this.user.all).map((name) => ({
                    name,
                    highestSpeed: this.user.all[name].highestSpeed
                }));
            }
        }
    };
</script>

<style scoped>
    .rank {
        width: 450px;
        height: 670px;
        border: 4px solid #BDBDBD;
        border-radius: 2px;
        background-color: #faf8ef;
        padding: 10px;
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    .header {
        position: relative;
        height: 100px;
        line-height: 100px;
        background-color: #5979ac;
        border-radius: 5px;
        color: white;
    }

    .back {
        position: absolute;
        left: 20px;
    }

    .back a {
        text-decoration: none;
        color: #2DFF00;
    }

    ul {
        color: #eae0d1;
        height: 530px;
        border-radius: 4px;
        background-color: #bbada0;
        font-size: 24px;
        list-style: none;
        line-height: 42px;
        margin-top: 20px;
        padding: 40px 0;
    }

    li {
        height: 42px;
        white-space: nowrap;
        overflow: hidden;
    }

    .name {
        color: #0019FB;
    }

    .back {
        float: left;
    }


</style>
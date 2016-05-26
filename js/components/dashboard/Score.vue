<template>
    <div class="score">
        <span>Highest Speed</span>
        <strong>{{ name }}</strong>
        <h3>{{ highestSpeed }}</h3>
    </div>
</template>

<script>
    export default {
        vuex: {
            getters: {
                name({user}){
                    return user.winner.name
                },
                highestSpeed({user}){
                    return user.winner.highestSpeed
                }
            }
        }
    }
</script>

<style scoped>
    .score {
        width: 120px;
        height: 100px;
        padding: 10px;
        background-color: #bbada0;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        color: #eae0d1;
    }

    .score span {
        font-size: 19px;
        font-weight: bold;
        display: block;
        width: 100%;
        text-align: center;
    }

    h2 {
        color: #fff;
    }
    strong {
        color: #0019FB;
    }
</style>

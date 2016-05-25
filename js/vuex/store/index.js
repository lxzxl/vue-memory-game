import Vue from "vue";
import Vuex from "vuex";
import {TYPES} from "vuex/actions/types";

//have vuex involved
Vue.use(Vuex);

const state = {
    leftMatched: 0,
    highestSpeed: 0,
    status: '',
    cards: [],
    elapsedMs: 0,
    username: null
};

const mutations = {
    [TYPES.RESET](st, newState) {
        st.leftMatched = newState.leftMatched;
        st.highestSpeed = newState.highestSpeed;
        st.status = newState.status;
        st.cards = newState.cards;
        st.elapsedMs = newState.elapsedMs;
    },

    [TYPES.UPDATE_STATUS](st, newStatus) {
        st.status = newStatus;
    },

    [TYPES.DECREASE_MATCH](st) {
        st.leftMatched--;
    },

    [TYPES.FLIP](st, card) {
        var c = st.cards.find(cc => cc === card);
        c.flipped = !c.flipped;
    },

    [TYPES.FLIPS](st, cards) {
        st.cards
            .filter(cc => cards.indexOf(cc) >= 0)
            .forEach(cc => {
                cc.flipped = !cc.flipped;
            });
    },

    [TYPES.COUNTING](st) {
        st.elapsedMs++;
    },

    [TYPES.UPDATE_HIGHESTSPEED](st) {
        if (!localStorage.getItem('highestSpeed')) {
            return localStorage.setItem('highestSpeed', st.elapsedMs);
        }
        if (localStorage.getItem('highestSpeed') > st.elapsedMs) {
            return localStorage.setItem('highestSpeed', st.elapsedMs);
        }
    },

    [TYPES.GET_USERNAME](st, username){
        st.username = username;
    },

    [TYPES.SET_USERNAME](st, username){
        st.username = username;
    }
};

export default new Vuex.Store({
    state,
    mutations,
    strict: process.env.NODE_ENV !== 'production'
});

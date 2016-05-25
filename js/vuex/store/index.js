import Vue from "vue";
import Vuex from "vuex";
import {TYPES} from "vuex/actions/types";
import user from "../modules/user";

//have vuex involved
Vue.use(Vuex);

const state = {
    leftMatched: 0,
    status: '',
    cards: [],
    elapsedMs: 0,
    showModal: false
};

const mutations = {
    [TYPES.RESET](st, newState) {
        st.leftMatched = newState.leftMatched;
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

    [TYPES.TOGGLE_MODAL](state){
        state.showModal = !state.showModal;
    }
};

export default new Vuex.Store({
    state,
    mutations,
    modules: {
        user
    },
    strict: process.env.NODE_ENV !== 'production'
});

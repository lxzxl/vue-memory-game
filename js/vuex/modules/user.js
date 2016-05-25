/**
 * Created by steven on 16/5/25.
 */
'use strict';

import {USER} from "../actions/types";

// initial state
const state = {
    name: localStorage.getItem('username') || 'Anonymous',
    score: 9999
};

// mutations
const mutations = {
    [USER.NAME_CHANGE] (state, name) {
        state.name = name;
        localStorage.setItem('username', name);
    },

    [USER.INIT] (state, ds) {
        let users = ds.val();
        if (users) {
            debugger;
            state.score = users[username].score;
        }
    }

};

export default {
    state,
    mutations
};
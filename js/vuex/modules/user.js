/**
 * Created by steven on 16/5/25.
 */
'use strict';

import {USER} from "../actions/types";

// initial state
const state = {
    all: {},
    me: {
        name: null,
        score: 9999
    }
};

// mutations
const mutations = {
    [USER.NAME_CHANGE] (state, name) {
        state.me.name = name;
        localStorage.setItem('username', name);
    },

    [USER.INIT] (state, ds) {
        let users = ds.val();
        if (users) {
            state.all = users;
            if (users[state.me.name]) state.me = users[state.me.name];
        }
    }
};

export default {
    state,
    mutations
};
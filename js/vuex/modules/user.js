/**
 * Created by steven on 16/5/25.
 */
'use strict';

import {USERS, USER} from "../actions/types";

// initial state
const state = {
    all: {},
    me: {
        name: null,
        highestSpeed: null
    }
};

// mutations
const mutations = {
    [USERS.INIT] (state, ds) {
        let users = ds.val();
        if (users) {
            state.all = users;
            if (users[state.me.name]) {
                state.me.highestSpeed = users[state.me.name].highestSpeed;
            }
        }
    },

    [USER.INIT] (state, name, score) {
        state.me.name = name;
        state.me.highestSpeed = score;
    },

    [USER.NAME_CHANGE] (state, name) {
        state.me.name = name;
        localStorage.setItem('username', name);
    },


    [USER.UPDATED](state, ds){
        state.me = ds.val();
    }
};

export default {
    state,
    mutations
};
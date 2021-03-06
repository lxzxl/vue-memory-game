/**
 * Created by steven on 16/5/25.
 */
'use strict';

import Vue from "vue";
import {USERS, USER} from "../actions/types";

// initial state
const state = {
    all: {},
    me: {
        name: null,
        highestSpeed: null
    },
    winner: {
        name: null,
        highestSpeed: 9999
    }
};

const calWinner = function (state) {
    let name = null;
    let highestSpeed = 9999;
    Object.keys(state.all).forEach(_name => {
        let user = state.all[_name];
        if (_name === state.me.name) {
            state.me.highestSpeed = user.highestSpeed;
        }
        if (user.highestSpeed < highestSpeed) {
            highestSpeed = user.highestSpeed;
            name = _name;
        }
    });
    state.winner.name = name;
    state.winner.highestSpeed = highestSpeed;
};

// mutations
const mutations = {
    [USERS.INIT] (state, ds) {
        let users = ds.val();
        debugger;
        if (users) {
            state.all = users;
            calWinner(state);
        }
    },

    [USERS.ADDED] (state, ds) {
        let name = ds.key();
        let user = ds.val();
        Vue.set(state.all, name, user);
        if (name === state.me.name) {
            state.me.highestSpeed = user.highestSpeed;
        }
        if (user.highestSpeed < state.winner.highestSpeed) {
            state.winner.name = name;
            state.winner.highestSpeed = user.highestSpeed;
        }
    },

    [USERS.REMOVED] (state, ds) {
        let name = ds.key();
        if (state.all[name]) {
            Vue.delete(state.all, name);
            if (name <= state.winner.name) {
                calWinner(state);
            }
        }
    },

    [USERS.UPDATED] (state, ds) {
        let name = ds.key();
        let user = ds.val();
        if (name === state.winner.name && user.highestSpeed > state.winner.highestSpeed) {
            calWinner(state);
        } else {
            if (name === state.me.name) {
                state.me.highestSpeed = user.highestSpeed;
            }
            if (user.highestSpeed < state.winner.highestSpeed) {
                state.winner.name = name;
                state.winner.highestSpeed = user.highestSpeed;
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
        if (state.all[name]) {
            state.me.highestSpeed = state.all[name].highestSpeed;
        } else {
            state.me.highestSpeed = 9999;
        }
    },


    [USER.UPDATED](state, ds){
        state.me = ds.val();
    }
};

export default {
    state,
    mutations
};
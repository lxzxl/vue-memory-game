/**
 * Created by steven on 16/5/25.
 */
'use strict';

import Vue from "vue";
import {USERS, USER} from "../actions/types";

var allUsers = {};

// initial state
const state = {
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
    Object.keys(allUsers).forEach(_name => {
        let user = allUsers[_name];
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
            allUsers = users;
            calWinner(state);
        }
    },

    [USERS.ADDED] (state, ds) {
        let name = ds.key();
        let user = ds.val();
        allUsers[name] = user;
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
        let user = ds.val();
        if (allUsers[name]) {
            delete allUsers[name];
            if (user.highestSpeed < state.winner.highestSpeed) {
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
    },


    [USER.UPDATED](state, ds){
        state.me = ds.val();
    }
};

export default {
    state,
    mutations
};
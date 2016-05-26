/**
 * Created by steven on 16/5/25.
 */
'use strict';

import {USERS, USER} from "../actions/types";

// initial state
const state = {
    all: null,
    me: {
        name: null,
        highestSpeed: null
    },
    winner: {
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
            // search winner.
            let winnerName = null;
            let winnerScore = 9999;
            Object.keys(users).forEach(name => {
                let user = users[name];
                if (name === state.me.name) {
                    state.me.highestSpeed = user.highestSpeed;
                }
                if (user.highestSpeed < winnerScore) {
                    winnerScore = user.highestSpeed;
                    winnerName = name;
                }
            });
            state.winner.name = winnerName;
            state.winner.highestSpeed = winnerScore;
        }
    },

    [USERS.ADDED] (state, ds) {
        //TODO:need a function to check winner.
        let name = ds.key();
        let user = ds.val();
        if (user.highestSpeed < state.winner.highestSpeed) {
            if (name === state.me.name) {
                state.me.highestSpeed = user.highestSpeed;
            }
            state.winner.highestSpeed = user.highestSpeed;
            state.winner.name = name;
        }
    },

    [USERS.REMOVED] (state, ds) {
        //TODO
    },

    [USERS.UPDATED] (state, ds) {
        let name = ds.key();
        let user = ds.val();
        if (user.highestSpeed < state.winner.highestSpeed) {
            if (name === state.me.name) {
                state.me.highestSpeed = user.highestSpeed;
            }
            state.winner.highestSpeed = user.highestSpeed;
            state.winner.name = name;
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
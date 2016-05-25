/**
 * Created by steven on 16/5/25.
 */
'use strict';

import {USER} from "../actions/types";

// initial state
const state = {
    name: 'Anonymous',
    score: 9999
};

// mutations
const mutations = {
    [USER.NAME_CHANGE] (state, name) {
        state.name = name;
    },

    [USER.INIT] (state, ds) {
        state.username = ds.val();
    }

};

export default {
    state,
    mutations
};
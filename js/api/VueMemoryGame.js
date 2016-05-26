/**
 * Created by steven on 5/25/16.
 */
'use strict';

import {USERS, USER} from "vuex/actions/types";


export default class VueMemoryGame {
    constructor(wilddog) {
        this.wilddog = wilddog;
        this.ref = this.wilddog.child('VueMemoryGame');
        this.username = localStorage.getItem('username') || 'Anonymous';
        this.highestSpeed = localStorage.getItem('highestSpeed') || 9999;
    }

    init(dispatch) {
        let refQuery = this.ref.orderByChild('highestSpeed');
        // remove registered events.
        refQuery.off('value');
        refQuery.off('child_added');
        refQuery.off('child_changed');
        refQuery.off('child_removed');
        // add events.
        refQuery.on('value', datasnapshot => {
            debugger;
            dispatch(USERS.INIT, datasnapshot);
        });
        // listen on value change.
        refQuery.on('child_added', datasnapshot => {
            dispatch(USERS.ADDED, datasnapshot);
        });
        refQuery.on('child_changed', datasnapshot => {
            dispatch(USERS.UPDATED, datasnapshot);
        });
        refQuery.on('child_removed', datasnapshot => {
            dispatch(USERS.REMOVED, datasnapshot);
        });

        dispatch(USER.INIT, this.username, this.highestSpeed);
    }

    setUsername(dispatch, name) {
        this.username = name;
        dispatch(USER.NAME_CHANGE, this.username);
    }

    updateScore(dispatch, highestSpeed) {
        if (!this.username) {
            dispatch(USER.NAME_REQUIRED);
        }
        this.ref.child(this.username).set({
            highestSpeed
        }, (err) => err && dispatch(USER.ERROR));
    }
}
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

    init(dispatch, username) {
        // remove registered events.
        this.ref.off('value');
        this.ref.off('child_added');
        this.ref.off('child_changed');
        this.ref.off('child_removed');
        // add events.
        this.ref.once('value', datasnapshot => {
            dispatch(USERS.INIT, datasnapshot);
        });
        // listen on value change.
        this.ref.on('child_added', datasnapshot => {
            // TODO: update one user.
            dispatch(USER.INIT, datasnapshot);
        });
        this.ref.on('child_changed', datasnapshot => {
            // TODO: update one user.
            dispatch(USER.INIT, datasnapshot);
        });
        this.ref.on('child_removed', datasnapshot => {
            // TODO: update one user.
            dispatch(USER.INIT, datasnapshot);
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
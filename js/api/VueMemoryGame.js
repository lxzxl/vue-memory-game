/**
 * Created by steven on 5/25/16.
 */
'use strict';

import {TYPES} from "vuex/actions/types";

export default class VueMemoryGame {
    constructor(wilddog) {
        this.wilddog = wilddog;
        this.ref = this.wilddog.child('VueMemoryGame');
        this.username = localStorage.getItem('username');
    }

    init(dispatch){
        // remove registered events.
        this.ref.off('value');
        this.ref.off('child_added');
        this.ref.off('child_changed');
        this.ref.off('child_removed');
        // add events.
        this.ref.once('value', datasnapshot => {
            dispatch('PANELS_INIT', datasnapshot);
        });
        // listen on value change.
        this.ref.on('child_added', datasnapshot => {
            dispatch('PANELS_ADD', datasnapshot);
        });
        this.ref.on('child_changed', datasnapshot => {
            dispatch('PANELS_UPDATED', datasnapshot);
        });
        this.ref.on('child_removed', datasnapshot => {
            dispatch('PANELS_REMOVE', datasnapshot);
        });
    }

    isUserExists(dispatch, username) {
        return this.ref.hasChild(username);
    }

    updateRecord(dispatch, username) {
        if (!this.username) {
            dispatch()
        }
        this.ref.authWithPassword({
            email,
            password
        }, (error, data) => {// login success handler.
            if (error) {
                reject('Login Failed!');
            } else {
                resolve(data);
            }
        });
    }
}
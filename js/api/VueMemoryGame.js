/**
 * Created by steven on 5/25/16.
 */
'use strict';

import {USER} from "vuex/actions/types";


export default class VueMemoryGame {
    constructor(wilddog) {
        this.wilddog = wilddog;
        this.ref = this.wilddog.child('VueMemoryGame');
        this.username = localStorage.getItem('username') || 'Anonymous';
    }

    init(dispatch, username) {
        // remove registered events.
        this.ref.off('value');
        this.ref.off('child_added');
        this.ref.off('child_changed');
        this.ref.off('child_removed');
        // add events.
        this.ref.once('value', datasnapshot => {
            dispatch(USER.INIT, datasnapshot);
        });
        // listen on value change.
        this.ref.on('child_added', datasnapshot => {
            dispatch(USER.INIT, datasnapshot);
        });
        this.ref.on('child_changed', datasnapshot => {
            dispatch(USER.INIT, datasnapshot);
        });
        this.ref.on('child_removed', datasnapshot => {
            dispatch(USER.INIT, datasnapshot);
        });

        dispatch(USER.NAME_CHANGE, this.username);
    }

    setUsername(name) {
        this.username = name;
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
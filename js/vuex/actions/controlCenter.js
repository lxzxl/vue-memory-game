import {shuffle} from "lib/shuffle";
import {STATUS} from "vuex/store/statusEnum";
import {TYPES} from "./types";

const cardNames = ['8-ball', 'kronos', 'baked-potato', 'dinosaur', 'rocket', 'skinny-unicorn',
    'that-guy', 'zeppelin'];

export const reset = function ({dispatch}) {
    // TODO: get result from API and dispatch in callback or promise.
    gameApi.init(dispatch);
    dispatch(TYPES.RESET, {
        leftMatched: 8,
        highestSpeed: localStorage.getItem('highestSpeed') || 9999,
        status: STATUS.READY,
        cards: shuffle(cardNames.concat(cardNames))
            .map(name => ({flipped: false, cardName: name})),
        elapsedMs: 0
    });
};

let timerId;

let statusHandler = {
    PLAYING: function (dispatch) {
        timerId = setInterval(function () {
            dispatch(TYPES.COUNTING);
        }, 1000);
    },

    PASS: function (dispatch) {
        clearInterval(timerId);
        dispatch(TYPES.UPDATE_HIGHESTSPEED);
    }
};

export const updateStatus = function ({dispatch}, status) {
    dispatch(TYPES.UPDATE_STATUS, status);
    statusHandler[status] && statusHandler[status](dispatch);
};

export const flipCard = function ({dispatch}, card) {
    dispatch(TYPES.FLIP, card);
};

export const flipCards = function ({dispatch}, cards) {
    dispatch(TYPES.FLIPS, cards);
};

export const match = function ({dispatch}) {
    dispatch(TYPES.DECREASE_MATCH);
};

export const setUsername = function ({dispatch}, username) {
    dispatch(TYPES.SET_USERNAME, username);
}

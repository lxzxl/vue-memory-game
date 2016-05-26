import {shuffle} from "lib/shuffle";
import {STATUS} from "vuex/store/statusEnum";
import {TYPES, USER} from "./types";
import {gameApi} from "api";

const cardNames = ['8-ball', 'kronos', 'baked-potato', 'dinosaur', 'rocket', 'skinny-unicorn',
    'that-guy', 'zeppelin'];

export const init = function ({dispatch}) {
    gameApi.init(dispatch);
};

export const reset = function ({dispatch}) {
    dispatch(TYPES.RESET, {
        leftMatched: 8,
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

    PASS: function (dispatch, elapsedMs) {
        clearInterval(timerId);
        gameApi.updateScore(dispatch, elapsedMs);
    }
};

export const updateStatus = function ({dispatch}, status, ...args) {
    dispatch(TYPES.UPDATE_STATUS, status);
    statusHandler[status] && statusHandler[status](dispatch, ...args);
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

export const toggleModal = function ({dispatch}) {
    dispatch(TYPES.TOGGLE_MODAL);
};

export const updateUsername = function ({dispatch}, username) {
    gameApi.setUsername(dispatch, username);
    dispatch(TYPES.TOGGLE_MODAL);
};

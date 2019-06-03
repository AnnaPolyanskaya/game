import * as C from './actionTypes';

export const getAllWinners = (payload) => ({
    type: C.GET_ALL_WINNERS,
    payload
})

export const setWinner = (payload) => ({
    type: C.SET_WINNER,
    payload
})

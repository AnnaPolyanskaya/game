import * as C from '../actions/actionTypes';


export const winnerReducer = ( state=[], action) => {
    switch (action.type){
        case C.GET_ALL_WINNERS:
            return state = action.payload
        case C.SET_WINNER:
            return state = [...state, action.payload]
        default:
            return state;
    }
}
export const setWinnerReducer = ( state="", action) => {
    switch (action.type){
        case C.SET_WINNER:
            return state = action.payload
        default:
            return state;
    }
}

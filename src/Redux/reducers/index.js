import { combineReducers } from 'redux';
import { 
    winnerReducer, 
    setWinnerReducer
} from './reducers';

const reducers = combineReducers({
    winners: winnerReducer,
    winner: setWinnerReducer
})

export default reducers;
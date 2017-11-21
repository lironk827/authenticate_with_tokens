import { SAVE_DAYS_RESULTS, UPDATE_DAYS_RESULTS } from '../actions/types';

export default (state=[], action) => {
    switch(action.type) {
        case SAVE_DAYS_RESULTS:
            return [action.payload, ...state] 
        case UPDATE_DAYS_RESULTS:
            return [...action.payload]
        default:
            return state;
    }
}
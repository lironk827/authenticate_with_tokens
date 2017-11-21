import { CALC_RATE } from '../actions/types';

export default (state = '', action) => {
    switch (action.type) {
        case CALC_RATE: 
            return action.payload
        default :
            return state
    }
}
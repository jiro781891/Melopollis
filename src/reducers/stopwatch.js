import { TIMER_CONNECTION_BEGIN, TIMER_CONNECTION_SUCCESS, TIMER_SOCKET_RECEIVE, TIMER_CONNECTION_ERROR, WatchAction, Time } from '../actions/stopwatch.js';

export interface ConnectionState {
    time: Time;
    loading: boolean;
    error: boolean;
}

const initialState: ConnectionState = {
    stopwatch: '',
    socketLoading: false,
    socketError: false,
    socketConneced: false
};

const stopwatch = (state = initialState, action: WatchAction): ConnectionState => {
    switch (action.type) {
        case  TIMER_CONNECTION_BEGIN:
            return {...initialState, socketLoading: true};
        case TIMER_CONNECTION_SUCCESS:
            return {...initialState, socketConneced: true};
        case TIMER_SOCKET_RECEIVE:
            return {...initialState, stopwatch: action.time};
        case TIMER_CONNECTION_ERROR:
            return {...initialState, socketError: true};
        default:
            return state;
        }
    };

export default stopwatch

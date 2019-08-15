import axios from 'axios';
import { socketUrl } from './constants';
import { Action, Dispatch } from 'redux';

export const TIMER_CONNECTION_BEGIN = 'TIMER_CONNECTION_BEGIN';
export const TIMER_CONNECTION_SUCCESS = 'TIMER_CONNECTION_SUCCESS';
export const TIMER_SOCKET_RECEIVE = 'TIMER_SOCKET_RECEIVE';
export const TIMER_CONNECTION_ERROR = 'TIMER_CONNECTION_ERROR';

  export interface Time {
      name: string;
  }

export interface WatchAction extends Action {
    time: Time;
}

// Internal action creators
const timerConnectionBegin = () => {
    return {
        type: TIMER_CONNECTION_BEGIN
    };
};

const timerConnectionSuccess = () => {
    return {
        type: TIMER_CONNECTION_SUCCESS,
    };
};

const timerSocketReceive = (time) => {
    return {
        type: TIMER_SOCKET_RECEIVE,
        time: time
    };
};

const timerConnectionError = () => {
    return {
        type: TIMER_CONNECTION_ERROR
    };
};



// Action creator that returns function (thunk) instead of an action
// Will be processed by `redux-thunk` middleware
var socketRef
export const stopWatchSocketConnect = () => (dispatch: Dispatch<WatchAction>) => {

    const path = socketUrl + '/watch/'
    socketRef = new WebSocket(path);
      socketRef.onopen = (e) => {
        socketRef.onmessage = e => {
          // dispatch(playListFetchSuccess(JSON.parse(e.data).songs))
          console.log(e.data)
          dispatch(timerSocketReceive(JSON.parse(e.data).time))
        };
      };

    return dispatch(timerConnectionSuccess())
};

export const stopWatchSocketSend = (time) => () => {
    var data = {'time':time}
    socketRef.send(JSON.stringify(data))
};

export const stopSend = () => (dispatch: Dispatch<WatchAction>) => {
    return dispatch(timerConnectionError())
};


// export {default} from './current'

import axios from 'axios';
import { apiUrl, socketUrl } from './constants';
import { Action, Dispatch } from 'redux';

export const CONNECTION_BEGIN = 'CONNECTION_BEGIN';
export const CONNECTION_SUCCESS = 'CONNECTION_SUCCESS';
export const SOCKET_RECEIVE = 'SOCKET_RECEIVE';
export const CONNECTION_ERROR = 'CONNECTION_ERROR';

export const PLAYLIST_CONNECTION_BEGIN = 'PLAYLIST_CONNECTION_BEGIN'
export const PLAYLIST_FETCH_SUCCES = 'PLAYLIST_FETCH_SUCCES'
export const PLAYLIST_FETCH_ERROR = 'PLAYLIST_FETCH_ERROR'


export interface Vote {
    name: string;
    action: string;
}

export interface Song {
    name: string;
}

export type SongsList = Song[];

export interface ConnectionAction extends Action {
    vote: Vote;
}

export interface FetchAction extends Action {
    songs: SongList;
}

// Internal action creators
const connectionBegin = () => {
    return {
        type: CONNECTION_BEGIN
    };
};

const connectionSuccess = () => {
    return {
        type: CONNECTION_SUCCESS,
    };
};

const socketReceive = (vote) => {
    return {
        type: SOCKET_RECEIVE,
        vote: vote
    };
};

const ConnectionError = () => {
    return {
        type: CONNECTION_ERROR
    };
};


const playListFetchBegin = () => {
    return {
        type: PLAYLIST_CONNECTION_BEGIN,
    };
};

const playListFetchSuccess = (songs) => {
  return {
      type: PLAYLIST_FETCH_SUCCES,
      songs: songs
  };
};

const playListFetchError = () => {
  return {
      type: PLAYLIST_FETCH_ERROR,
  };
};


// Action creator that returns function (thunk) instead of an action
// Will be processed by `redux-thunk` middleware
var socketRef
export const socketConnect = () => (dispatch: Dispatch<ConnectionAction>) => {

    const path = socketUrl + '/votes?' + localStorage.getItem('session')
    socketRef = new WebSocket(path);
      socketRef.onopen = (e) => {
        socketRef.onmessage = e => {
          console.log(JSON.parse(e.data))
          dispatch(playListFetchSuccess(JSON.parse(e.data).songs))
        };
      };

    return dispatch(connectionSuccess())
};

export const socketSend = (song, action) => () => {
    var data = {'yt_id':song, 'action':action}
    socketRef.send(JSON.stringify(data))
};

export const playListFetch = () => (dispatch: Dispatch<FetchAction>) => {

    // API request will be executed...

      // dispatch(playListFetchBegin());

    // ...now
    return axios.get(apiUrl + '/songs-list/' + localStorage.getItem('session'))
        .then((response: { data: SongList }) => {
            var session = JSON.parse(response.data).session
            dispatch(playListFetchSuccess(JSON.parse(response.data).data));
            if(session){
              localStorage.setItem('session', session)
            }
        })
        .catch(() => {

            dispatch(playListFetchError());
        });
};

// export {default} from './current'

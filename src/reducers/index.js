// import { CONNECTION_BEGIN, CONNECTION_ERROR, CONNECTION_SUCCESS, SOCKET_RECEIVE,
//           PLAYLIST_FETCH_SUCCES, PLAYLIST_CONNECTION_BEGIN, PLAYLIST_FETCH_ERROR,
//           ConnectionAction, Vote, songsList, FetchAction } from '../actions/index.js';
//
// export interface ConnectionState {
//     vote: Vote;
//     loading: boolean;
//     error: boolean;
//     songsList: songsList
// }
//
// const initialState: ConnectionState = {
//     vote: {},
//     songsList: [],
//     socketLoading: false,
//     socketError: false,
//     socketConneced: true
// };
//
// export const votes = (state = initialState, action: ConnectionAction): ConnectionState => {
//     switch (action.type) {
//         case  CONNECTION_BEGIN:
//             return {...initialState, socketLoading: true};
//         case CONNECTION_SUCCESS:
//             return {...initialState, socketConneced: true};
//         case SOCKET_RECEIVE:
//             return {...initialState, vote: action.vote};
//         case CONNECTION_ERROR:
//             return {...initialState, socketError: true};
//         case  PLAYLIST_CONNECTION_BEGIN:
//             return {...initialState, songsLoading: true};
//         case PLAYLIST_FETCH_SUCCES:
//             return {...initialState, songsList: action.songs};
//         case PLAYLIST_FETCH_ERROR:
//             return {...initialState, SongsError: true};
//         default:
//             return state;
//     }
// };
//
// // export const songs = (state = initialState, action: FetchAction): ConnectionState => {
// //     switch (action.type) {
// //
// //     }
// // };

import { combineReducers } from 'redux'
import votes from './votes'
import songs from './songs'
import song from './song'
import stopwatch from './stopwatch'
import search from './search'
import suggest from './suggest'

export default combineReducers({
  votes,
  songs,
  song,
  stopwatch,
  search,
  suggest
})

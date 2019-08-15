import { PLAYLIST_FETCH_SUCCES, PLAYLIST_CONNECTION_BEGIN, PLAYLIST_FETCH_ERROR, songsList, FetchAction } from '../actions/index.js';

export interface PlayListState {
    songsList: songsList;
    songsLoading: boolean;
    songsError: boolean;
}

const initialState: PlayListState = {
    songsList: [],
    songsLoading: false,
    songsError: false,
};

const songs = (state = initialState, action: FetchAction): PlayList => {
    switch (action.type) {
        case  PLAYLIST_CONNECTION_BEGIN:
            return {...initialState, songsLoading: true};
        case PLAYLIST_FETCH_SUCCES:
            return {...initialState, songsList: action.songs};
        case PLAYLIST_FETCH_ERROR:
            return {...initialState, SongsError: true};
        default:
            return state;
    }
};

export default songs

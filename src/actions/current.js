import axios from 'axios';
import { apiUrl } from './constants';
import { Action, Dispatch } from 'redux';

export const CURRENT_SONG_FETCH_BEGIN = 'CURRENT_SONG_FETCH_BEGIN';
export const CURRENT_SONG_FETCH_SUCCES = 'CURRENT_SONG_FETCH_SUCCES';
export const CURRENT_SONG_FETCH_ERROR = 'CURRENT_SONG_FETCH_ERROR';


export interface Song {
    name: string;
    action: string;
}

export interface SongFetchAction extends Action {
    song: Song;
}

// Internal action creators
const currentSongFetchBegin = () => {
    return {
        type: CURRENT_SONG_FETCH_BEGIN,
    };
};

const currentSongFetchSuccess = (song) => {
    return {
        type: CURRENT_SONG_FETCH_SUCCES,
        song: song
    };
};

const currentSongFetchError = () => {
    return {
        type: CURRENT_SONG_FETCH_ERROR
    };
};

export const currentSongFetch = () => (dispatch: Dispatch<SongFetchAction>) => {

    // API request will be executed...

      // dispatch(playListFetchBegin());

    // ...now
    return axios.get( apiUrl + '/next-song')
        .then((response: { data: Song }) => {
          console.log(response.data)
            dispatch(currentSongFetchSuccess(response.data));
        })
        .catch(() => {

            dispatch(currentSongFetchError());
        });
};

// export default currentSongFetch

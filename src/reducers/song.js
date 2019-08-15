import { CURRENT_SONG_FETCH_BEGIN, CURRENT_SONG_FETCH_SUCCES , CURRENT_SONG_FETCH_ERROR, Song, SongFetchAction } from '../actions/current';

export interface PlayListState {
    song: Song;
    songLoading: boolean;
    songError: boolean;
}

const initialState: SongState = {
    song: {},
    songsLoading: false,
    songsError: false,
    socketConneced: true
};

const song = (state = initialState, action: SongFetchAction): Song => {
    switch (action.type) {
        case  CURRENT_SONG_FETCH_BEGIN:
            return {...initialState, songsLoading: true};
        case CURRENT_SONG_FETCH_SUCCES:
            console.log(action)
            return {...initialState, song: action.song};
        case CURRENT_SONG_FETCH_ERROR:
            return {...initialState, SongsError: true};
        default:
            return state;
    }
};

export default song

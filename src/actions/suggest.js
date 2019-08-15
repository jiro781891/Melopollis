import axios from 'axios';
import { apiUrl } from './constants';
import { Action, Dispatch } from 'redux';

export const SUGGEST_POST_BEGIN = 'SUGGEST_POST_BEGIN';
export const SUGGEST_POST_SUCCESS = 'SUGGEST_POST_SUCCESS';
export const SUGGEST_POST_ERROR = 'SUGGEST_POST_ERROR';

export interface SuggestSong {
  name: string;
}

export interface SuggestAction extends Action {
    suggest: SuggestSong;
}

// Internal action creators
const suggestFetchBegin = (suggestSong) => {
    return {
        type: SUGGEST_POST_BEGIN,
        suggesion: suggestSong
    };
};

const suggestFetchSuccess = () => {
    return {
        type: SUGGEST_POST_SUCCESS,
    };
};

const suggestFetchError = () => {
    return {
        type: SUGGEST_POST_ERROR
    };
};



// Action creator that returns function (thunk) instead of an action
// Will be processed by `redux-thunk` middleware
export const suggestPost = (suggestedSong) => (dispatch: Dispatch<SuggestAction>) => {
  var suggest_url = apiUrl + '/suggest_song'
  // return axios.get(youtube_suggest_url)
  //     .then((response: { data: SuggestSongList }) => {
  //         console.log(response.data)
  //         dispatch(suggestFetchSuccess(response.data));
  //     })
  //     .catch(() => {
  //
  //         dispatch(suggestFetchError());
  //     });

  return axios.post(suggest_url, {
          song: suggestedSong,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
  });

};

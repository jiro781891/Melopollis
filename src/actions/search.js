import axios from 'axios';
import { Action, Dispatch } from 'redux';

export const SEARCH_FETCH_BEGIN = 'SEARCH_FETCH_BEGIN';
export const SEARCH_FETCH_SUCCESS = 'SEARCH_FETCH_SUCCESS';
export const SEARCH_FETCH_ERROR = 'SEARCH_FETCH_ERROR';

export interface SearchSong {
  name: string;
}


export type SearchSongList = SearchSong[];

export interface SearchAction extends Action {
    search: SearchSongList;
}

// Internal action creators
const searchFetchBegin = () => {
    return {
        type: SEARCH_FETCH_BEGIN
    };
};

const searchFetchSuccess = (searchSongList) => {
    return {
        type: SEARCH_FETCH_SUCCESS,
        searchResult: searchSongList
    };
};

const searchFetchError = () => {
    return {
        type: SEARCH_FETCH_ERROR
    };
};



// Action creator that returns function (thunk) instead of an action
// Will be processed by `redux-thunk` middleware
export const searchFetch = (query) => (dispatch: Dispatch<SearchAction>) => {
  query = query.replace(' ', '+')
  console.log(query)
  var youtube_search_url = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=${query}&type=video&maxResults=10&key=AIzaSyD_nKQDpjyLWy9I7tLFzQj0S9Tj4SaeY8o`
  return axios.get(youtube_search_url)
      .then((response: { data: SearchSongList }) => {
          console.log(response.data)
          dispatch(searchFetchSuccess(response.data));
      })
      .catch(() => {

          dispatch(searchFetchError());
      });

};

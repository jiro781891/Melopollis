import { SEARCH_FETCH_BEGIN, SEARCH_FETCH_SUCCESS, SEARCH_FETCH_ERROR, SearchSongList, SearchAction } from '../actions/search.js';

export interface SearchListState {
    searchList: SearchSongList;
    searchLoading: boolean;
    searchError: boolean;
}

const initialState: SearchListState = {
    searchList: [],
    searchLoading: false,
    searchError: false,
};

const search = (state = initialState, action: SearchAction): SearchList => {
    switch (action.type) {
        case  SEARCH_FETCH_BEGIN:
            return {...initialState, searchLoading: true};
        case SEARCH_FETCH_SUCCESS:
            return {...initialState, searchList: action.searchResult};
        case SEARCH_FETCH_ERROR:
            return {...initialState, searchError: true};
        default:
            return state;
    }
};

export default search

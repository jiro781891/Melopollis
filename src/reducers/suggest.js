import { SUGGEST_POST_BEGIN, SUGGEST_POST_SUCCESS, SUGGEST_POST_ERROR, SuggestSongList, SuggestAction } from '../actions/suggest.js';

export interface SuggestState {
    suggestSucces: boolean;
    suggestLoading: boolean;
    suggestError: boolean;
}

const initialState: SuggestState = {
    suggestSucces: false,
    suggestLoading: false,
    suggestError: false,
};

const suggest = (state = initialState, action: SuggestAction): SuggestList => {
    switch (action.type) {
        case  SUGGEST_POST_BEGIN:
            return {...initialState, suggestLoading: true};
        case SUGGEST_POST_SUCCESS:
            return {...initialState, suggestSucces: true};
        case SUGGEST_POST_ERROR:
            return {...initialState, suggestError: true};
        default:
            return state;
    }
};

export default suggest

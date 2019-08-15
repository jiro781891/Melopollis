import { CONNECTION_BEGIN, CONNECTION_ERROR, CONNECTION_SUCCESS, SOCKET_RECEIVE, ConnectionAction, Vote } from '../actions/index.js';

export interface ConnectionState {
    vote: Vote;
    loading: boolean;
    error: boolean;
}

const initialState: ConnectionState = {
    vote: {},
    socketLoading: false,
    socketError: false,
    socketConneced: false
};

const votes = (state = initialState, action: ConnectionAction): ConnectionState => {
    switch (action.type) {
        case  CONNECTION_BEGIN:
            return {...initialState, socketLoading: true};
        case CONNECTION_SUCCESS:
            return {...initialState, socketConneced: true};
        case SOCKET_RECEIVE:
            return {...initialState, vote: action.vote};
        case CONNECTION_ERROR:
            return {...initialState, socketError: true};
        default:
            return state;
        }
    };

export default votes

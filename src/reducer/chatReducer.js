import * as ACTION from '../const/action/chat';

const initialState = {}

export default function chatReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION.CHAT_CHANGE: {
            return {
                ...state,
                respondent: action.payload
            }
        }
        default:
            return state;
    }
}
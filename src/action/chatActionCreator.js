import * as ACTION from '../const/action/chat';

export function createChatChangeAction(uid) {
    return {
        type: ACTION.CHAT_CHANGE,
        payload: {
            'respondent': uid
        }
    }
}
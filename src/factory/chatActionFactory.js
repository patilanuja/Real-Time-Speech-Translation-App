import * as ACTION from '../const/action/chat';

export function createChatChangeAction(respondentUid, respondentName) {
    return {
        type: ACTION.CHAT_CHANGE,
        payload: {
            respondent: {
                uid: respondentUid,
                name: respondentName
            }
        }
    }
}
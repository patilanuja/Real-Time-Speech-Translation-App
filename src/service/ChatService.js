import { get, send, getMessageUrl, getMessage, deleteMessage} from '../connector/chatConnector';

class ChatService {

    get(requester, respondent) {
        return get(requester, respondent);
    }

    send(requester, respondent, filename, contentType) {
        return send(requester, respondent, filename, contentType);
    }

    async getMessage(filename) {
        let url = await getMessageUrl(filename);
        return await getMessage(url.url);
    }

    async delete(id) {
        await deleteMessage(id);
    }

}

export const chatService = new ChatService();
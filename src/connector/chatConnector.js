import axios from 'axios';
import { post } from './baseConnector';

export async function get(requester, respondent) {
    return await post('https://davebiplp4tiol4bizjmjhzemm0wpmyx.lambda-url.us-east-1.on.aws', {
        requester: requester,
        respondent: respondent
    });
}

export async function send(requester, respondent, filename, contentType) {
    return await post('https://7ursov3s3slz64mhx7djniraca0icrjg.lambda-url.us-east-1.on.aws/', {
        from: requester,
        to: respondent,
        source: filename,
        contentType
    });
}

export async function getMessageUrl(filename) {
    return await post('https://5624f2i4u3vergb34e5xlixo5a0jyumc.lambda-url.us-east-1.on.aws', {
        filename: filename
    });
}

export async function getMessage(url) {
    let response = await axios.get(url, { responseType: 'blob' });
    return new Blob([response.data]);
}

export async function deleteMessage(id) {
    return await post('https://ienrwjz3pekmn35vhzsovv7kxy0irvhz.lambda-url.us-east-1.on.aws', {
        id: id
    });
}
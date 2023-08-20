import { post } from './baseConnector';

export async function getUser(uid) {
    return await post('https://7iwi6zogmg2cd2maymqp74mala0kadcc.lambda-url.us-east-1.on.aws/', {
        // return await post('/user/get', {
        uid: uid
    });
}

export async function userLogin(uid, name, language) {
    return await post('https://3yky4qlv7rk6mzkmbt4bt2r7di0nlmgg.lambda-url.us-east-1.on.aws', {
        // return await post('/user/login', {
        uid: uid,
        name: name,
        language: language
    });
}

export async function userList(uid) {
    return await post('https://e5m3p2ndzu6pwyyvtn3scsnzze0jktzq.lambda-url.us-east-1.on.aws/', {
        uid: uid
    });
}
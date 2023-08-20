import { post, put } from './baseConnector';

export async function uploadInit(contentType) {
    return await post('https://ipxb32k33reqf6i7gvhjs3scwe0szrwt.lambda-url.us-east-1.on.aws/', {
        contentType: contentType
    });
}

export async function uploadComplete(url, contentType, blob) {
    return await put(url, { 'Content-Type': contentType }, blob);
}

export async function uploadMetadata(filename, contentType, duration) {
    return await post('https://ipxb32k33reqf6i7gvhjs3scwe0szrwt.lambda-url.us-east-1.on.aws/', {
        filename: filename,
        contentType: contentType,
        duration: duration
    });
}
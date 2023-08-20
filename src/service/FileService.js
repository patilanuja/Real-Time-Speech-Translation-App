import { uploadInit, uploadComplete } from '../connector/fileConnector';

class FileService {

    async upload(blob, contentType) {
        let resultInit = await uploadInit(contentType);
        let resultComplete = await uploadComplete(resultInit.uploadURL, contentType, blob);
        return resultInit.filename;
    }

}

export const fileService = new FileService();